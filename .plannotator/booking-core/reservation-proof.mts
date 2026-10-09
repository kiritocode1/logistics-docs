import assert from 'node:assert/strict';

// Isolated decision proof. This does not implement persistence or provider calls.
const minute = 60_000;
const holdDuration = 40 * minute;

type OfferStatus =
  | 'waiting'
  | 'reserved'
  | 'payment_processing'
  | 'payment_review'
  | 'confirmed'
  | 'expired';

type Offer = {
  status: OfferStatus;
  transporterAccepted: boolean;
  reuseApproved: boolean;
  expiresAt: number | null;
  processingUntil: number | null;
  resourcesHeld: boolean;
  paymentReference: string | null;
};

function createOffer(): Offer {
  return {
    status: 'waiting',
    transporterAccepted: false,
    reuseApproved: false,
    expiresAt: null,
    processingUntil: null,
    resourcesHeld: false,
    paymentReference: null,
  };
}

function reserve(offer: Offer, now: number): void {
  if (offer.status !== 'waiting') throw new Error('Offer is not waiting');
  if (!offer.transporterAccepted || !offer.reuseApproved) {
    throw new Error('Transporter acceptance and reuse approval are required');
  }
  offer.status = 'reserved';
  offer.expiresAt = now + holdDuration;
  offer.resourcesHeld = true;
}

function startPayment(offer: Offer, now: number, processingWindow: number): void {
  if (offer.status !== 'reserved' || offer.expiresAt === null || now >= offer.expiresAt) {
    throw new Error('No payable reservation');
  }
  offer.status = 'payment_processing';
  offer.processingUntil = now + processingWindow;
}

function advanceTime(offer: Offer, now: number): void {
  if (offer.status === 'reserved' && offer.expiresAt !== null && now >= offer.expiresAt) {
    offer.status = 'expired';
    offer.resourcesHeld = false;
  }
  if (
    offer.status === 'payment_processing' &&
    offer.processingUntil !== null &&
    now >= offer.processingUntil
  ) {
    // A timeout is not evidence of payment failure. Keep resources until reconciled.
    offer.status = 'payment_review';
  }
}

function confirmPayment(offer: Offer, paymentReference: string): void {
  if (offer.status === 'confirmed' && offer.paymentReference === paymentReference) return;
  if (offer.status !== 'payment_processing' && offer.status !== 'payment_review') {
    throw new Error('Payment needs an active processing or reconciliation record');
  }
  offer.status = 'confirmed';
  offer.paymentReference = paymentReference;
}

const guarded = createOffer();
assert.throws(() => reserve(guarded, 0), /acceptance and reuse approval/);
guarded.transporterAccepted = true;
assert.throws(() => reserve(guarded, 0), /acceptance and reuse approval/);
guarded.reuseApproved = true;
reserve(guarded, 0);
assert.equal(guarded.expiresAt, 40 * minute);
console.log('PASS: checkout waits for acceptance and required reuse approval');

// Five minutes is a fixture input, not a proposed production timeout.
startPayment(guarded, 39 * minute, 5 * minute);
advanceTime(guarded, 40 * minute);
assert.equal(guarded.status, 'payment_processing');
assert.equal(guarded.resourcesHeld, true);
confirmPayment(guarded, 'simulation-payment-1');
confirmPayment(guarded, 'simulation-payment-1');
assert.equal(guarded.status, 'confirmed');
assert.equal(guarded.paymentReference, 'simulation-payment-1');
console.log('PASS: payment begun at minute 39 survives original expiry; confirmation is repeatable');

const unpaid = createOffer();
unpaid.transporterAccepted = true;
unpaid.reuseApproved = true;
reserve(unpaid, 0);
advanceTime(unpaid, 40 * minute);
assert.equal(unpaid.status, 'expired');
assert.equal(unpaid.resourcesHeld, false);
assert.throws(() => startPayment(unpaid, 41 * minute, 5 * minute), /No payable reservation/);
assert.throws(() => confirmPayment(unpaid, 'unrecognized-payment'), /active processing/);
console.log('PASS: an unpaid expired offer releases resources and cannot accept checkout');

const unresolved = createOffer();
unresolved.transporterAccepted = true;
unresolved.reuseApproved = true;
reserve(unresolved, 0);
startPayment(unresolved, 39 * minute, 5 * minute);
advanceTime(unresolved, 44 * minute);
assert.equal(unresolved.status, 'payment_review');
assert.equal(unresolved.resourcesHeld, true);
assert.throws(() => startPayment(unresolved, 45 * minute, 5 * minute), /No payable reservation/);
console.log('PASS: unknown payment goes to reconciliation without releasing resources or allowing retry');

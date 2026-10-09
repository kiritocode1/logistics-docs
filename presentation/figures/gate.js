/**
 * Gate: seven containers on their trailers, queued unevenly at a port gate on
 * one quay. The container under the pointer lifts off its trailer, picked for
 * its next job, and the row parts around it, staggered outwards from it on the
 * 700ms lift curve. Each container's number is a dot on its lid, counted from
 * the door end. At rest one container sits a little high and bright: the next
 * one out. The slider is the stagger, in ms.
 *
 * Every part is drawn once at its rest place and moved as a whole: the camera
 * is linear, so a world step is the same screen step everywhere.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, seg, tween, tset, tval, tdone, unproj,
  disposer, flatDot, mk, place, pointer, put, register, solid,
} = HL;

const N = 7, G = 17, LEN = 58, WD = 11, Z0 = 4.5, Z1 = 18, LIFT = 15, PART = 6, PB = 5;
const RESTX = [10, 3, 14, 0, 7, 16, 5]; // the queue at rest: trailers pulled up unevenly
const LIT = 3, NUDGE = 4;               // the next one out sits a little high at rest
const Y1 = (N - 1) * G + WD;

/** A rounded solid from z0 to z1 on a footprint, appended to g. */
function block(g, P, front, x0, y0, x1, y1, z0, z1, r, b) {
  const [ring, inner] = rings(x0, y0, x1, y1, r, b);
  const s = solid(g);
  put(s, prism(P, front, ring, inner, z0, z1));
  return s;
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let stag = value;

  const C = Cam(45, 0.5, 1.72);
  fit(C, [[-8, -10, -PB], [LEN + 26, Y1 + 10, -PB], [LEN + 26, -10, 0], [-8, Y1 + 10, 0], [-2, -PART, Z1 + LIFT], [LEN + 18, -PART, Z1 + LIFT]], 200, 166);
  const P = proj(C), front = facing(C);
  const o = P(0, 0, 0), step = (p) => [p[0] - o[0], p[1] - o[1]];
  const ex = step(P(1, 0, 0)), ey = step(P(0, 1, 0)), ez = step(P(0, 0, 1));
  const move = (el, v) => el.setAttribute("transform", `translate(${v[0].toFixed(2)} ${v[1].toFixed(2)})`);

  const g = mk("g", {}, svg);
  block(g, P, front, -8, -10, LEN + 26, Y1 + 10, -PB, 0, 8, 2.2); // the quay

  // back to front: slot 0 is farthest, so appending in order paints correctly
  const slots = [];
  for (let i = 0; i < N; i++) {
    const y0 = i * G, y1 = y0 + WD, sg = mk("g", {}, g);
    block(sg, P, front, -1, y0 + 0.5, LEN + 1, y1 - 0.5, 2, Z0, 1.4, 0.6); // the trailer
    for (const x of [5, 11, LEN - 9, LEN - 3]) place(flatDot(sg, C, 1.1, "dot off"), P(x, y1, 0));
    const cg = mk("g", {}, sg), box = block(cg, P, front, 0, y0, LEN, y1, Z0, Z1, 1.6, 0.8);
    let ribs = "";
    for (let x = 3.5; x < LEN - 2; x += 3.2) ribs += seg(P(x, y1, Z0 + 1.5), P(x, y1, Z1 - 1.5));
    // the door end: a seam down the middle and two lock bars
    for (const f of [0.27, 0.5, 0.73]) ribs += seg(P(LEN, y0 + WD * f, Z0 + 1.5), P(LEN, y0 + WD * f, Z1 - 1.5));
    mk("path", { d: ribs, class: "nf lo" }, cg);
    // its number: one dot of seven on the lid, counted from the door end
    const dots = [];
    for (let k = 0; k < N; k++) {
      const el = flatDot(cg, C, 0.85, k === i ? "dot m" : "dot off");
      place(el, P(LEN - 6 - k * 2.6, y0 + WD / 2, Z1));
      dots.push(el);
    }
    const z0 = i === LIT ? NUDGE : 0;
    slots.push({ sg, cg, box, num: dots[i], dy: tween(0), dz: tween(z0), y: NaN, z: NaN });
    box.sil.classList.toggle("hi", i === LIT);
  }

  function draw(s, i, now) {
    const y = tval(s.dy, now), z = tval(s.dz, now);
    if (y !== s.y) { s.y = y; move(s.sg, [RESTX[i] * ex[0] + y * ey[0], RESTX[i] * ex[1] + y * ey[1]]); }
    if (z !== s.z) { s.z = z; move(s.cg, [z * ez[0], z * ez[1]]); }
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    slots.forEach((s, i) => { draw(s, i, now); if (!tdone(s.dy, now) || !tdone(s.dz, now)) moving = true; });
    return moving;
  });
  bag.add(B.unregister);

  /** The slot under a point, tested on the plane of the resting lids, which never moves; -1 off the row. */
  function hit(p) {
    const [wx, wy] = unproj(C, p[0], p[1], Z1);
    if (wx < -8 || wx > LEN + 24 || wy < -G / 2 || wy > Y1 + G / 2) return -1;
    return clamp(Math.round((wy - WD / 2) / G), 0, N - 1);
  }

  let act = -1;
  /** Picks container a (-1 puts the row back). The stagger spreads out from the one picked, or the one let go. */
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act;
    act = a;
    slots.forEach((s, i) => {
      const delay = Math.abs(i - from) * stag;
      tset(s.dy, a < 0 ? 0 : i < a ? -PART : i > a ? PART : 0, now, delay);
      tset(s.dz, a < 0 ? (i === LIT ? NUDGE : 0) : i === a ? LIFT : 0, now, delay);
      s.box.sil.classList.toggle("hi", a < 0 ? i === LIT : i === a);
      s.num.classList.toggle("m", i !== a);
    });
    read.textContent = a < 0 ? "rest" : "box " + String(a + 1).padStart(2, "0");
    B.wake();
  }

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { stag = v; },
    destroy: bag.dispose,
  };
}

hairline({
  name: "gate",
  means: "Seven containers on trailers at the gate: the one under the pointer lifts off for its next job, and the row parts around it.",
  rules: [1, 2, 4, 10],
  range: [0, 40, 90],
  mount,
});

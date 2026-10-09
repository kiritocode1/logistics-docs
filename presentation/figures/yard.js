/**
 * Yard: a container yard of twenty bays on a rounded slab, each bay a stack
 * of containers with a seam at every tier. The pointer lands on the ground,
 * and each stack rises toward it on its own spring, falling off with
 * distance. At rest the stacks step down toward the front, and one lone empty
 * container waits there, bright, with a 3 × 3 dot mark on its lid. The slider
 * is the reach, in bays.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, seg, unproj, spring, stepS,
  flatDot, mk, place, pointer, put, register, disposer, solid,
} = HL;

const NX = 4, NY = 5, CX = 32, CY = 14, FX = 27, FY = 10.5, TIER = 8.5, HMAX = 7 * TIER, PB = 5;
const EXTX = NX * CX, EXTY = NY * CY;
// the yard at rest, in tiers: tall at the back, stepping down to one lone box at the front
const TIERS = [
  [3, 3, 2, 2, 1],
  [3, 2, 2, 1, 2],
  [2, 3, 1, 2, 1],
  [2, 1, 2, 1, 1],
];
const LONE = [3, 3];

/** The share of full height at u reaches from the pointer: 1 → .31 at 42% → .09 at the edge and beyond. */
const falloff = (u) =>
  u <= 0 ? 1 : u <= 0.417 ? 1 - (u / 0.417) * 0.6875 : u <= 1 ? 0.3125 - ((u - 0.417) / 0.583) * 0.2185 : 0.094;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.72);
  fit(C, [[-6, -6, -PB], [EXTX + 6, EXTY + 6, -PB], [EXTX + 6, -6, -PB], [-6, EXTY + 6, -PB], [0, 0, HMAX], [EXTX, 0, HMAX], [0, EXTY, HMAX]], 200, 166);
  const P = proj(C), front = facing(C);
  let R = value * 22, over = null;

  const g = mk("g", {}, svg), bays = [];
  const [pr, pi] = rings(-6, -6, EXTX + 6, EXTY + 6, 9, 2.2);
  put(solid(g), prism(P, front, pr, pi, -PB, 0));
  // Diagonal by diagonal from the back corner, so appending is painting back to front.
  for (let s = 0; s <= NX + NY - 2; s++) for (let i = 0; i < NX; i++) {
    const j = s - i;
    if (j < 0 || j >= NY) continue;
    const x0 = i * CX + (CX - FX) / 2, y0 = j * CY + (CY - FY) / 2, x1 = x0 + FX, y1 = y0 + FY;
    const [ring, inner] = rings(x0, y0, x1, y1, 1.8, 0.8);
    const el = solid(g), seams = mk("path", { class: "nf lo" }, el.g);
    const h0 = TIERS[i][j] * TIER;
    bays.push({ i, j, x0, y0, x1, y1, h0, ring, inner, el, seams, sp: spring(h0, { eps: 0.04 }), drawn: NaN });
  }

  // The mark: a 3 × 3 of dots on one lid, moved in the paint order to just
  // after its stack, so the stacks in front still cover it.
  const mark = mk("g", {}, g), md = [];
  for (let k = 0; k < 9; k++) md.push(flatDot(mark, C, 0.55, k === 4 ? "dot" : "dot m"));
  const byCell = new Map();
  bays.forEach((b) => byCell.set(b.i + "," + b.j, b));
  const lone = byCell.get(LONE.join(","));
  let mc = null, want = lone;
  lone.el.sil.classList.add("hi");

  function drawMark() {
    if (want !== mc) { mc = want; mc.el.g.after(mark); }
    const cx = (mc.x0 + mc.x1) / 2, cy = (mc.y0 + mc.y1) / 2, h = Math.max(0.6, mc.sp.x);
    md.forEach((el, k) => place(el, P(cx + ((k % 3) - 1) * 2.6, cy + (Math.floor(k / 3) - 1) * 2.6, h)));
  }
  // A stack whose spring hasn't moved keeps its paths: most of the twenty are still on most frames.
  function drawBay(b) {
    const h = Math.max(0.6, b.sp.x);
    if (h === b.drawn) return;
    b.drawn = h;
    put(b.el, prism(P, front, b.ring, b.inner, 0, h));
    let d = "";
    for (let z = TIER; z < h - 0.8; z += TIER) d += seg(P(b.x0 + 1.4, b.y1, z), P(b.x1 - 1.4, b.y1, z)) + seg(P(b.x1, b.y0 + 1.4, z), P(b.x1, b.y1 - 1.4, z));
    b.seams.setAttribute("d", d);
  }

  const B = register(stage, (dt) => {
    let m = false;
    for (const b of bays) { if (stepS(b.sp, dt)) m = true; drawBay(b); }
    drawMark();
    return m;
  });
  bag.add(B.unregister);

  function retarget() {
    for (const b of bays) {
      if (!over) b.sp.t = b.h0;
      else {
        const dx = (b.x0 + b.x1) / 2 - over[0], dy = (b.y0 + b.y1) / 2 - over[1];
        b.sp.t = Math.max(b.h0, HMAX * falloff(Math.hypot(dx, dy) / R));
      }
      // the accent reads where each stack is headed, never where it is on screen
      b.el.sil.classList.toggle("hi", over ? b.sp.t > HMAX * 0.86 : b === lone);
    }
    if (over) {
      const i = clamp(Math.floor(over[0] / CX), 0, NX - 1), j = clamp(Math.floor(over[1] / CY), 0, NY - 1);
      want = byCell.get(i + "," + j);
      read.textContent = `bay ${i + 1}·${j + 1}`;
    } else { want = lone; read.textContent = "rest"; }
    B.wake();
  }

  bag.add(pointer(stage, {
    move: (p) => { over = unproj(C, p[0], p[1], 0); retarget(); },
    leave: () => { over = null; retarget(); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { R = v * 22; if (over) retarget(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "yard",
  means: "A yard of stacked containers: stacks near the pointer rise and fall off with distance, while one lone empty box waits at rest.",
  rules: [1, 3, 5, 9],
  range: [1.2, 2.4, 3.6],
  mount,
});

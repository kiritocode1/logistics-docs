/**
 * Hand-off: an importer's factory and an exporter's warehouse on one plinth,
 * a road between them, and one truck carrying one container. Where the
 * pointer sits along the road is where the truck drives, on a spring. At rest
 * the truck is halfway and the container is bright: the empty box on its way
 * to its next job. Near either end the bright goes to that building. The
 * slider is the road's length in km.
 *
 * The truck is drawn once and moved as a whole: the camera is linear, so a
 * step along x is the same screen step everywhere.
 */
const {
  Cam, clamp, facing, fit, open, poly, prism, proj, rings, seg, spring, stepS, unproj,
  disposer, flatDot, mk, place, pointer, put, register, solid,
} = HL;

const BY0 = -44, BY1 = -8, RY0 = 0, RY1 = 14, PB = 5, TRUCK = 50;
const reach = (km) => 50 + km * 5; // where the exporter stands, in world units

/** A rounded solid from z0 to z1 on a footprint, appended to g. */
function block(g, P, front, [x0, y0, x1, y1], z0, z1, r, b) {
  const [ring, inner] = rings(x0, y0, x1, y1, r, b);
  const s = solid(g);
  put(s, prism(P, front, ring, inner, z0, z1));
  return s;
}

/** A door outline on a face that looks along +y, at y. */
const door = (P, y, x0, x1, h) => open([P(x0, y, 0), P(x0, y, h), P(x1, y, h), P(x1, y, 0)]);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let km = value, E = reach(km), over = false;
  let C, P, front, ex, truck, box, imp, exp, drawn = NaN;
  const sp = spring((E - 8) / 2, { eps: 0.05 });

  function layout() {
    svg.replaceChildren();
    E = reach(km);
    C = Cam(45, 0.5, 1.6);
    fit(C, [[-10, BY0 - 6, -PB], [E + 48, RY1 + 6, -PB], [E + 48, BY0 - 6, 0], [-10, RY1 + 6, 0], [0, BY0, 31], [E, BY0, 24]], 200, 166);
    P = proj(C);
    front = facing(C);
    const o = P(0, 0, 0), x1 = P(1, 0, 0);
    ex = [x1[0] - o[0], x1[1] - o[1]];
    const g = mk("g", {}, svg);

    // the plinth, then the road painted on it, behind everything that stands on it
    block(g, P, front, [-10, BY0 - 6, E + 48, RY1 + 6], -PB, 0, 9, 2.2);
    mk("path", { d: seg(P(-6, RY0, 0), P(E + 44, RY0, 0)) + seg(P(-6, RY1, 0), P(E + 44, RY1, 0)), class: "nf lo" }, g);
    mk("path", { d: seg(P(-2, (RY0 + RY1) / 2, 0), P(E + 40, (RY0 + RY1) / 2, 0)), class: "nf dash" }, g);

    // the importer: a factory with roof lights in a row, and its door on the road side
    imp = block(g, P, front, [0, BY0, 36, BY1], 0, 24, 3, 1.2);
    mk("path", { d: door(P, BY1, 13, 25, 12), class: "nf lo" }, g);
    for (let k = 0; k < 3; k++) block(g, P, front, [5 + k * 10, BY0 + 5, 11 + k * 10, BY1 - 5], 24, 30, 1.6, 0.6);

    // the exporter: a warehouse with two dock doors under a canopy
    exp = block(g, P, front, [E, BY0, E + 38, BY1], 0, 20, 3, 1.2);
    mk("path", { d: door(P, BY1, E + 6, E + 16, 10) + door(P, BY1, E + 22, E + 32, 10), class: "nf lo" }, g);
    block(g, P, front, [E + 3, BY1, E + 35, BY1 + 6], 12, 14, 1.4, 0.5);

    // the truck, drawn once at x = 0: chassis, container, cab, wheels
    truck = mk("g", {}, g);
    block(truck, P, front, [0, 2, 46, 12], 2.5, 4.5, 1.5, 0.6);
    box = block(truck, P, front, [1, 2, 38, 12], 4.5, 19, 1.6, 0.8);
    let ribs = "";
    for (let x = 4.5; x < 36; x += 3.1) ribs += seg(P(x, 12, 6.5), P(x, 12, 17));
    mk("path", { d: ribs, class: "nf lo" }, truck);
    block(truck, P, front, [39.5, 2.5, TRUCK, 11.5], 2.5, 16, 2.4, 0.9);
    mk("path", { d: poly([P(TRUCK, 3.8, 10.5), P(TRUCK, 10.2, 10.5), P(TRUCK, 10.2, 14.5), P(TRUCK, 3.8, 14.5)]), class: "nf lo" }, truck);
    for (const x of [6, 13, 31, 45]) place(flatDot(truck, C, 1.3, "dot off"), P(x, 12.6, 0));

    sp.t = clamp(sp.t, 2, E - 8);
    sp.x = clamp(sp.x, 2, E - 8);
    drawn = NaN;
    accent();
  }

  /** Where the truck is headed, from 0 at the importer to 1 at the exporter: a target, never the pose on screen. */
  const share = () => (sp.t - 2) / (E - 10);

  function accent() {
    const f = share();
    imp.sil.classList.toggle("hi", over && f < 0.15);
    exp.sil.classList.toggle("hi", over && f > 0.85);
    box.sil.classList.toggle("hi", !over || (f >= 0.15 && f <= 0.85));
    read.textContent = !over ? "rest" : f < 0.15 ? "importer" : f > 0.85 ? "exporter" : `km ${Math.round(f * km)}`;
  }

  layout();

  const B = register(stage, (dt) => {
    const moving = stepS(sp, dt);
    if (sp.x !== drawn) {
      drawn = sp.x;
      truck.setAttribute("transform", `translate(${(sp.x * ex[0]).toFixed(2)} ${(sp.x * ex[1]).toFixed(2)})`);
    }
    return moving;
  });
  bag.add(B.unregister);

  bag.add(pointer(stage, {
    // the pointer lands on the ground plane, which never moves; the truck's middle goes under it
    move: (p) => { over = true; sp.t = clamp(unproj(C, p[0], p[1], 0)[0] - TRUCK / 2, 2, E - 8); accent(); B.wake(); },
    leave: () => { over = false; sp.t = (E - 8) / 2; accent(); B.wake(); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { km = v; layout(); B.wake(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "handoff",
  means: "One emptied container on a truck between an importer and an exporter: the pointer drives it down the road to its next job.",
  rules: [1, 4, 5, 8],
  range: [6, 12, 20],
  mount,
});

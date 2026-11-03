import type { StepKind, SynthId } from "./synth-ids";

type Wave = OscillatorType;

type ToneOpts = {
  f: number;
  f2?: number;
  type?: Wave;
  at?: number;
  a?: number;
  d?: number;
  v?: number;
  vibrato?: number;
};

type NoiseOpts = {
  at?: number;
  a?: number;
  d?: number;
  v?: number;
  filter?: BiquadFilterType;
  f?: number;
  f2?: number;
  q?: number;
};

const noiseBuffers = new WeakMap<BaseAudioContext, AudioBuffer>();

function noiseBuffer(ctx: BaseAudioContext) {
  let buf = noiseBuffers.get(ctx);
  if (!buf) {
    buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    noiseBuffers.set(ctx, buf);
  }
  return buf;
}

class Voice {
  end = 0;
  constructor(
    readonly ctx: BaseAudioContext,
    readonly out: AudioNode,
    readonly t0: number,
  ) {}

  private envelope(at: number, a: number, d: number, v: number) {
    const g = this.ctx.createGain();
    const t = this.t0 + at;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(v, 0.0002), t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
    g.connect(this.out);
    this.end = Math.max(this.end, at + a + d);
    return { g, t, stop: t + a + d + 0.05 };
  }

  tone({ f, f2, type = "sine", at = 0, a = 0.005, d = 0.3, v = 0.3, vibrato }: ToneOpts) {
    const { g, t, stop } = this.envelope(at, a, d, v);
    const o = this.ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + a + d);
    if (vibrato) {
      const lfo = this.ctx.createOscillator();
      const depth = this.ctx.createGain();
      lfo.frequency.value = vibrato;
      depth.gain.value = f * 0.04;
      lfo.connect(depth).connect(o.frequency);
      lfo.start(t);
      lfo.stop(stop);
    }
    o.connect(g);
    o.start(t);
    o.stop(stop);
    return this;
  }

  noise({ at = 0, a = 0.003, d = 0.2, v = 0.3, filter = "bandpass", f = 1000, f2, q = 1 }: NoiseOpts) {
    const { g, t, stop } = this.envelope(at, a, d, v);
    const src = this.ctx.createBufferSource();
    src.buffer = noiseBuffer(this.ctx);
    src.loop = true;
    const bq = this.ctx.createBiquadFilter();
    bq.type = filter;
    bq.Q.value = q;
    bq.frequency.setValueAtTime(f, t);
    if (f2) bq.frequency.exponentialRampToValueAtTime(f2, t + a + d);
    src.connect(bq).connect(g);
    src.start(t, Math.random());
    src.stop(stop);
    return this;
  }

  notes(freqs: number[], step: number, opts: Omit<ToneOpts, "f"> = {}) {
    freqs.forEach((f, i) => this.tone({ ...opts, f, at: (opts.at ?? 0) + i * step }));
    return this;
  }
}

const N = (semis: number) => 440 * Math.pow(2, (semis - 9) / 12); // semis from C4
const rand = (min: number, max: number) => min + Math.random() * (max - min);

const slash = (v: Voice, at = 0, pitch = 1) =>
  v
    .noise({ at, a: 0.01, d: 0.16, v: 0.5, filter: "bandpass", f: 900 * pitch, f2: 4500 * pitch, q: 2 })
    .tone({ at: at + 0.02, f: 2200 * pitch, f2: 1400 * pitch, type: "triangle", d: 0.12, v: 0.06 });

const thump = (v: Voice, at = 0, f = 110, vol = 0.6) =>
  v.tone({ at, f, f2: f * 0.4, d: 0.25, v: vol }).noise({ at, d: 0.08, v: 0.35, filter: "lowpass", f: 900 });

const whoosh = (v: Voice, at = 0, vol = 0.35) =>
  v.noise({ at, a: 0.04, d: 0.22, v: vol, filter: "bandpass", f: 600, f2: 3200, q: 3 });

const arrowShot = (v: Voice, at = 0) =>
  v
    .tone({ at, f: 180, f2: 90, type: "triangle", d: 0.08, v: 0.25 })
    .noise({ at: at + 0.02, a: 0.02, d: 0.18, v: 0.3, filter: "highpass", f: 2500, f2: 6000 })
    .noise({ at: at + 0.24, d: 0.06, v: 0.3, filter: "lowpass", f: 1200 });

const sparkle = (v: Voice, at = 0, count = 6, base = 72) => {
  for (let i = 0; i < count; i++)
    v.tone({ at: at + i * 0.05 + rand(0, 0.03), f: N(base + Math.floor(rand(0, 12))), type: "sine", d: 0.25, v: 0.08 });
  return v;
};

const coin = (v: Voice, at = 0) =>
  v.tone({ at, f: rand(2600, 3400), type: "square", d: 0.12, v: 0.05 }).tone({ at: at + 0.05, f: rand(3800, 4400), type: "sine", d: 0.25, v: 0.08 });

const fanfare = (v: Voice, seq: [number, number][], step: number, wave: Wave = "square", vol = 0.12) => {
  let t = 0;
  for (const [semi, len] of seq) {
    v.tone({ at: t, f: N(semi), type: wave, d: len * step * 1.4, v: vol });
    v.tone({ at: t, f: N(semi + 12), type: "triangle", d: len * step * 1.2, v: vol * 0.5 });
    t += len * step;
  }
  return v;
};

const RECIPES: Record<SynthId, (v: Voice) => void> = {
  slash: (v) => slash(v),
  "double-slash": (v) => slash(slash(v), 0.14, 1.15),
  "multi-slash": (v) => {
    for (let i = 0; i < 5; i++) slash(v, i * 0.08, 0.9 + i * 0.08);
  },
  bash: (v) => thump(slash(v, 0, 0.8), 0.04, 90, 0.8),
  "heavy-hit": (v) => thump(whoosh(v), 0.18, 70, 0.9).noise({ at: 0.2, d: 0.4, v: 0.25, filter: "lowpass", f: 400 }),
  explosion: (v) =>
    v
      .noise({ a: 0.01, d: 0.9, v: 0.7, filter: "lowpass", f: 2400, f2: 120 })
      .tone({ f: 120, f2: 35, d: 0.7, v: 0.7 })
      .noise({ at: 0.05, d: 0.5, v: 0.2, filter: "highpass", f: 3000, f2: 800 }),
  provoke: (v) =>
    v.tone({ f: 140, f2: 220, type: "sawtooth", a: 0.05, d: 0.3, v: 0.15, vibrato: 30 }).tone({ at: 0.25, f: 220, f2: 110, type: "sawtooth", d: 0.25, v: 0.12 }),
  endure: (v) =>
    v.notes([N(55), N(62), N(67)], 0, { type: "triangle", d: 1.2, v: 0.1 }).tone({ f: N(79), type: "sine", a: 0.01, d: 1.5, v: 0.08, vibrato: 6 }),
  holy: (v) => {
    v.notes([N(60), N(64), N(67), N(72)], 0, { type: "sine", a: 0.2, d: 1.4, v: 0.08 });
    sparkle(v, 0.1, 10, 79);
    v.noise({ a: 0.3, d: 1.2, v: 0.08, filter: "highpass", f: 6000 });
  },
  stealth: (v) => v.noise({ a: 0.05, d: 0.6, v: 0.3, filter: "bandpass", f: 3000, f2: 300, q: 2 }).tone({ f: 600, f2: 150, d: 0.5, v: 0.08 }),
  coins: (v) => {
    for (let i = 0; i < 7; i++) coin(v, i * 0.06 + rand(0, 0.03));
  },
  poison: (v) => {
    for (let i = 0; i < 6; i++) v.tone({ at: i * 0.09 + rand(0, 0.04), f: rand(300, 700), f2: rand(900, 1400), d: 0.08, v: 0.15 });
    v.tone({ f: 90, type: "sawtooth", a: 0.05, d: 0.5, v: 0.05, vibrato: 8 });
  },
  fire: (v) =>
    v
      .noise({ a: 0.05, d: 0.5, v: 0.5, filter: "lowpass", f: 600, f2: 3000 })
      .noise({ at: 0.15, d: 0.5, v: 0.3, filter: "bandpass", f: 1500, q: 0.5 })
      .tone({ at: 0.3, f: 100, f2: 40, d: 0.4, v: 0.4 }),
  cold: (v) => {
    v.tone({ f: N(84), f2: N(96), type: "sine", a: 0.02, d: 0.6, v: 0.12 });
    sparkle(v, 0.05, 8, 84);
    v.noise({ at: 0.3, d: 0.2, v: 0.25, filter: "highpass", f: 5000 });
  },
  lightning: (v) => {
    for (let i = 0; i < 4; i++)
      v.noise({ at: i * 0.07, a: 0.002, d: 0.1, v: 0.6, filter: "highpass", f: rand(1500, 4000) }).tone({ at: i * 0.07, f: rand(60, 120), type: "square", d: 0.08, v: 0.15 });
    v.noise({ at: 0.3, d: 0.8, v: 0.3, filter: "lowpass", f: 500, f2: 80 });
  },
  ghost: (v) => v.tone({ f: 300, f2: 900, type: "sine", a: 0.1, d: 0.4, v: 0.15, vibrato: 12 }).tone({ at: 0.35, f: 120, f2: 60, d: 0.3, v: 0.4 }),
  soul: (v) => {
    for (let i = 0; i < 5; i++) v.tone({ at: i * 0.1, f: 700 + i * 120, f2: 300, type: "triangle", d: 0.15, v: 0.12 });
  },
  wall: (v) => v.noise({ a: 0.3, d: 1.2, v: 0.45, filter: "lowpass", f: 400, f2: 2000 }).noise({ at: 0.2, a: 0.2, d: 1.0, v: 0.2, filter: "bandpass", f: 2500, q: 0.4 }),
  storm: (v) => {
    v.noise({ a: 0.4, d: 1.8, v: 0.45, filter: "bandpass", f: 400, f2: 2500, q: 1.5 });
    sparkle(v, 0.2, 14, 86);
  },
  meteor: (v) => {
    for (let i = 0; i < 3; i++) {
      v.tone({ at: i * 0.45, f: 1600, f2: 200, type: "sine", d: 0.35, v: 0.1 });
      v.noise({ at: i * 0.45 + 0.35, a: 0.01, d: 0.6, v: 0.6, filter: "lowpass", f: 1800, f2: 100 }).tone({ at: i * 0.45 + 0.35, f: 90, f2: 30, d: 0.5, v: 0.6 });
    }
  },
  "chime-up": (v) => {
    v.notes([N(72), N(76), N(79), N(84)], 0.07, { type: "sine", d: 0.6, v: 0.12 });
    sparkle(v, 0.2, 5, 84);
  },
  wind: (v) => v.noise({ a: 0.3, d: 0.8, v: 0.35, filter: "bandpass", f: 300, f2: 1800, q: 4 }),
  warp: (v) => {
    v.tone({ f: 200, f2: 2400, type: "sine", a: 0.05, d: 0.6, v: 0.12, vibrato: 18 });
    sparkle(v, 0.3, 6, 88);
  },
  arrow: (v) => arrowShot(v),
  "double-arrow": (v) => arrowShot(arrowShot(v), 0.15),
  "arrow-rain": (v) => {
    for (let i = 0; i < 8; i++) v.noise({ at: i * 0.06 + rand(0, 0.05), a: 0.02, d: 0.15, v: 0.2, filter: "highpass", f: rand(2500, 4500), f2: 7000 });
    for (let i = 0; i < 6; i++) v.noise({ at: 0.5 + i * 0.05 + rand(0, 0.04), d: 0.05, v: 0.25, filter: "lowpass", f: 1000 });
  },
  focus: (v) => v.tone({ f: N(67), type: "sine", a: 0.3, d: 0.8, v: 0.1, vibrato: 5 }).tone({ f: N(74), type: "sine", a: 0.4, d: 0.8, v: 0.08 }),
  falcon: (v) =>
    v
      .tone({ f: 2400, f2: 1600, type: "sawtooth", a: 0.02, d: 0.25, v: 0.05, vibrato: 25 })
      .noise({ at: 0.2, a: 0.05, d: 0.25, v: 0.35, filter: "bandpass", f: 500, f2: 2500, q: 2 })
      .noise({ at: 0.45, d: 0.08, v: 0.4, filter: "lowpass", f: 1500 }),
  trap: (v) => v.tone({ f: 1800, type: "square", d: 0.04, v: 0.12 }).tone({ at: 0.06, f: 900, type: "square", d: 0.06, v: 0.15 }).noise({ at: 0.06, d: 0.15, v: 0.3, filter: "bandpass", f: 2500, q: 4 }),
  shout: (v) => v.notes([N(55), N(59), N(62)], 0, { type: "sawtooth", a: 0.03, d: 0.5, v: 0.08 }).noise({ d: 0.3, v: 0.15, filter: "bandpass", f: 900 }),
  cart: (v) => {
    for (let i = 0; i < 6; i++) v.noise({ at: i * 0.05, d: 0.06, v: 0.25, filter: "bandpass", f: rand(300, 600), q: 3 });
    thump(v, 0.35, 70, 0.8);
  },
  hammer: (v) => thump(v, 0, 60, 1).noise({ d: 0.8, v: 0.3, filter: "lowpass", f: 300, f2: 60 }).tone({ at: 0.02, f: 1200, type: "triangle", d: 0.6, v: 0.05 }),
  hit: (v) => thump(v, 0, 140, 0.6).noise({ d: 0.05, v: 0.25, filter: "highpass", f: 2000 }),
  crit: (v) => {
    slash(v, 0, 1.2);
    thump(v, 0.05, 100, 0.8);
    v.tone({ at: 0.05, f: N(84), type: "square", d: 0.15, v: 0.06 }).tone({ at: 0.12, f: N(91), type: "square", d: 0.2, v: 0.06 });
  },
  miss: (v) => whoosh(v, 0, 0.3).tone({ at: 0.2, f: 500, f2: 250, type: "triangle", d: 0.15, v: 0.06 }),
  footsteps: (v) => {
    for (let i = 0; i < 2; i++) v.noise({ at: i * 0.32, d: 0.09, v: 0.35, filter: "lowpass", f: 700 }).tone({ at: i * 0.32, f: 90, f2: 60, d: 0.08, v: 0.25 });
  },
  levelup: (v) => {
    fanfare(v, [[60, 1], [64, 1], [67, 1], [72, 3]], 0.09, "triangle", 0.18);
    v.notes([N(72), N(76), N(79)], 0, { at: 0.27, type: "sine", a: 0.02, d: 1.4, v: 0.1 });
    sparkle(v, 0.3, 14, 84);
  },
  skillup: (v) => {
    v.notes([N(67), N(72), N(79)], 0.07, { type: "triangle", d: 0.4, v: 0.14 });
    sparkle(v, 0.15, 5, 84);
  },
  jobchange: (v) => {
    fanfare(v, [[55, 1], [60, 1], [64, 1], [67, 2], [64, 1], [67, 1], [72, 4]], 0.11, "square", 0.08);
    sparkle(v, 0.6, 18, 84);
  },
  potion: (v) => {
    for (let i = 0; i < 3; i++) v.tone({ at: i * 0.12, f: 260, f2: 520, type: "sine", d: 0.1, v: 0.25 });
    v.notes([N(76), N(83)], 0.06, { at: 0.4, type: "sine", d: 0.3, v: 0.08 });
  },
  drop: (v) => v.tone({ f: 900, f2: 1400, type: "sine", d: 0.08, v: 0.15 }).noise({ at: 0.1, d: 0.05, v: 0.25, filter: "lowpass", f: 2000 }).tone({ at: 0.12, f: N(84), type: "sine", d: 0.3, v: 0.08 }),
  "rare-drop": (v) => {
    v.notes([N(79), N(84), N(88), N(91), N(96)], 0.06, { type: "sine", d: 0.6, v: 0.1 });
    sparkle(v, 0.3, 16, 88);
    v.tone({ at: 0.3, f: N(48), type: "triangle", d: 1.2, v: 0.12 });
  },
  dice: (v) => {
    for (let i = 0; i < 9; i++) {
      const t = i * 0.055 + (i > 5 ? (i - 5) * 0.05 : 0) + rand(0, 0.02);
      v.noise({ at: t, d: 0.03, v: 0.35 - i * 0.025, filter: "bandpass", f: rand(1800, 3500), q: 6 });
    }
  },
  card: (v) => v.noise({ a: 0.01, d: 0.12, v: 0.35, filter: "bandpass", f: 2500, f2: 5000, q: 1.5 }).noise({ at: 0.11, d: 0.03, v: 0.15, filter: "highpass", f: 3000 }),
  tick: (v) => v.tone({ f: 1800, type: "square", d: 0.025, v: 0.08 }).tone({ at: 0.08, f: 1300, type: "square", d: 0.03, v: 0.08 }),
  pop: (v) => {
    v.tone({ f: 400, f2: 1600, type: "sine", d: 0.08, v: 0.3 }).noise({ at: 0.06, d: 0.2, v: 0.2, filter: "highpass", f: 3000 });
    sparkle(v, 0.1, 4, 84);
  },
  mvp: (v) => {
    v.notes([N(36), N(43), N(46)], 0, { type: "sawtooth", a: 0.3, d: 2.2, v: 0.08 });
    v.tone({ f: N(24), type: "sine", a: 0.2, d: 2.5, v: 0.4 });
    v.noise({ a: 0.6, d: 1.8, v: 0.15, filter: "lowpass", f: 200, f2: 800 });
    fanfare(v, [[63, 1], [62, 1], [58, 3]], 0.25, "square", 0.05);
  },
  death: (v) => v.notes([N(67), N(63), N(60), N(55)], 0.22, { type: "triangle", d: 0.5, v: 0.14 }).tone({ at: 0.9, f: N(43), type: "sine", d: 1.4, v: 0.2 }),
  respawn: (v) => {
    v.tone({ f: 150, f2: 1200, type: "sine", a: 0.4, d: 0.8, v: 0.12 });
    v.notes([N(72), N(79), N(84)], 0.12, { at: 0.5, type: "sine", d: 0.8, v: 0.1 });
    sparkle(v, 0.6, 8, 84);
  },
  victory: (v) => fanfare(v, [[60, 1], [60, 1], [60, 1], [60, 3], [56, 3], [58, 3], [60, 2], [58, 1], [60, 6]], 0.1, "square", 0.1),
  defeat: (v) => fanfare(v, [[67, 2], [66, 2], [65, 2], [64, 6]], 0.18, "triangle", 0.14).tone({ at: 1.0, f: N(40), type: "sine", d: 1.6, v: 0.2 }),
  blind: (v) => v.tone({ f: 800, f2: 200, type: "sine", d: 0.6, v: 0.1 }).noise({ a: 0.1, d: 0.5, v: 0.15, filter: "lowpass", f: 3000, f2: 200 }),
  curse: (v) => v.notes([N(48), N(49), N(54)], 0, { type: "sawtooth", a: 0.1, d: 1.0, v: 0.06, vibrato: 4 }).tone({ f: N(36), type: "sine", d: 1.2, v: 0.25 }),
  freeze: (v) => {
    v.noise({ a: 0.01, d: 0.4, v: 0.35, filter: "highpass", f: 4000, f2: 9000 });
    v.notes([N(96), N(91), N(98)], 0.05, { type: "sine", d: 0.5, v: 0.08 });
    v.tone({ at: 0.05, f: 300, f2: 120, type: "triangle", d: 0.3, v: 0.12 });
  },
  immobilize: (v) => {
    for (let i = 0; i < 3; i++) v.noise({ at: i * 0.1, d: 0.08, v: 0.3, filter: "bandpass", f: 3200, q: 8 }).tone({ at: i * 0.1, f: 2400, type: "square", d: 0.04, v: 0.05 });
  },
  sleep: (v) => v.notes([N(72), N(67), N(64), N(60)], 0.25, { type: "sine", a: 0.05, d: 0.5, v: 0.1 }),
  stun: (v) => {
    for (let i = 0; i < 6; i++) v.tone({ at: i * 0.08, f: N(84 + ((i * 5) % 12)), type: "square", d: 0.07, v: 0.05 });
    thump(v, 0, 120, 0.5);
  },
  spawn: (v) => v.noise({ a: 0.2, d: 0.3, v: 0.25, filter: "bandpass", f: 200, f2: 2000, q: 2 }).tone({ at: 0.35, f: 200, f2: 400, type: "triangle", d: 0.15, v: 0.15 }),
  "monster-bite": (v) => v.noise({ d: 0.12, v: 0.45, filter: "bandpass", f: 1500, q: 2 }).tone({ f: 260, f2: 120, type: "sawtooth", d: 0.15, v: 0.15 }),
  "monster-heavy": (v) => thump(whoosh(v, 0, 0.25), 0.15, 70, 1).noise({ at: 0.15, d: 0.5, v: 0.3, filter: "lowpass", f: 500, f2: 80 }),
};

const STEPS: Record<StepKind, (v: Voice, at: number, p: number) => void> = {
  bounce: (v, at, p) =>
    v.tone({ at, f: 180 * p, f2: 480 * p, type: "sine", d: 0.12, v: 0.35 }).noise({ at: at + 0.1, d: 0.06, v: 0.2, filter: "lowpass", f: 600 * p }),
  hop: (v, at, p) => v.tone({ at, f: 500 * p, f2: 900 * p, type: "triangle", d: 0.06, v: 0.12 }).noise({ at: at + 0.12, d: 0.05, v: 0.3, filter: "lowpass", f: 900 * p }),
  skitter: (v, at, p) => {
    for (let i = 0; i < 4; i++) v.noise({ at: at + i * 0.035, d: 0.015, v: 0.25, filter: "bandpass", f: rand(3000, 5000) * p, q: 5 });
  },
  paw: (v, at, p) => {
    v.noise({ at, d: 0.07, v: 0.35, filter: "lowpass", f: 450 * p });
    v.noise({ at: at + 0.11, d: 0.07, v: 0.3, filter: "lowpass", f: 400 * p });
  },
  stomp: (v, at, p) => thump(v, at, 70 * p, 0.8).noise({ at: at + 0.02, d: 0.06, v: 0.12, filter: "bandpass", f: 2500, q: 6 }),
  flap: (v, at, p) => v.noise({ at, a: 0.03, d: 0.1, v: 0.35, filter: "bandpass", f: 700 * p, f2: 1600 * p, q: 2 }),
  ghost: (v, at, p) => v.tone({ at, f: 520 * p, f2: 380 * p, type: "sine", a: 0.08, d: 0.25, v: 0.1, vibrato: 9 }).noise({ at, a: 0.08, d: 0.25, v: 0.08, filter: "highpass", f: 4000 }),
  rattle: (v, at, p) => {
    for (let i = 0; i < 3; i++) v.noise({ at: at + i * 0.03, d: 0.025, v: 0.3, filter: "bandpass", f: rand(1200, 2200) * p, q: 10 });
  },
  drag: (v, at, p) => v.noise({ at, a: 0.08, d: 0.22, v: 0.3, filter: "lowpass", f: 300 * p, f2: 900 * p }),
  creak: (v, at, p) =>
    v.tone({ at, f: 140 * p, f2: 110 * p, type: "sawtooth", a: 0.05, d: 0.2, v: 0.06, vibrato: 20 }).noise({ at, d: 0.12, v: 0.2, filter: "bandpass", f: 2000, q: 1 }),
};

export function renderSynth(ctx: BaseAudioContext, out: AudioNode, id: SynthId, when = ctx.currentTime) {
  const v = new Voice(ctx, out, when);
  RECIPES[id](v);
  return v.end;
}

export function renderSteps(
  ctx: BaseAudioContext,
  out: AudioNode,
  kind: StepKind,
  count: number,
  heavy = false,
  when = ctx.currentTime,
) {
  const v = new Voice(ctx, out, when);
  const gap = kind === "skitter" ? 0.22 : kind === "flap" ? 0.2 : 0.38;
  const pitch = heavy ? 0.6 : 1;
  for (let i = 0; i < count; i++) STEPS[kind](v, i * gap * (heavy ? 1.3 : 1), pitch * rand(0.92, 1.08));
  return v.end;
}

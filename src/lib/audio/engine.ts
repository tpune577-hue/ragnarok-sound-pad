import { SCENES, bgmUrl, type SceneId } from "@/data/bgm";
import { sfxUrl, type SoundDef } from "@/data/sounds";
import { getOverride, listOverrides } from "./overrides";
import { renderSteps, renderSynth } from "./synth";
import type { StepKind } from "./synth-ids";

export type Settings = { master: number; bgm: number; sfx: number; duck: boolean };

export type EngineState = {
  ready: boolean;
  scene?: SceneId;
  trackId?: string;
  bgmPlaying: boolean;
  /** Sound id → duration in seconds, for pad progress bars. */
  playing: ReadonlyMap<string, number>;
  overrides: ReadonlySet<string>;
  pack: Readonly<Record<string, string>>;
  settings: Settings;
};

const SETTINGS_KEY = "ragnarok-companion:settings";
const DEFAULT_SETTINGS: Settings = { master: 0.9, bgm: 0.55, sfx: 0.9, duck: true };
const FADE = 1.2;
const DUCK_LEVEL = 0.3;
/** Sounds longer than this toggle off when tapped again instead of overlapping. */
const LONG_SOUND = 5;

type Playing = { stop: () => void; long: boolean };

class AudioEngine {
  private ctx?: AudioContext;
  private master!: GainNode;
  private bgmBus!: GainNode;
  private duckNode!: GainNode;
  private sfxBus!: GainNode;
  private bgm?: { el: HTMLAudioElement; gain: GainNode; source: MediaElementAudioSourceNode };
  private sceneIndex = new Map<SceneId, number>();
  private buffers = new Map<string, Promise<AudioBuffer | null>>();
  private active = new Map<string, Playing>();
  private duckCount = 0;
  private listeners = new Set<() => void>();

  state: EngineState = {
    ready: false,
    bgmPlaying: false,
    playing: new Map(),
    overrides: new Set(),
    pack: {},
    settings: DEFAULT_SETTINGS,
  };

  constructor() {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) this.state.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch {}
  }

  subscribe = (fn: () => void) => {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  };

  getSnapshot = () => this.state;

  private set(patch: Partial<EngineState>) {
    this.state = { ...this.state, ...patch };
    this.listeners.forEach((fn) => fn());
  }

  async unlock() {
    if (!this.ctx) {
      const ctx = new AudioContext({ latencyHint: "interactive" });
      this.master = ctx.createGain();
      this.bgmBus = ctx.createGain();
      this.duckNode = ctx.createGain();
      this.sfxBus = ctx.createGain();
      this.bgmBus.connect(this.duckNode).connect(this.master);
      this.sfxBus.connect(this.master);
      this.master.connect(ctx.destination);
      this.ctx = ctx;
      this.applySettings(this.state.settings);
      listOverrides()
        .then((all) => this.set({ overrides: new Set(all.map((o) => o.id)) }))
        .catch(() => {});
      fetch("audio/pack/index.json")
        .then((r) => (r.ok ? r.json() : {}))
        .then((pack) => this.set({ pack }))
        .catch(() => {});
    }
    await this.ctx.resume();
    this.set({ ready: true });
  }

  updateSettings(patch: Partial<Settings>) {
    const settings = { ...this.state.settings, ...patch };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    this.applySettings(settings);
    this.set({ settings });
  }

  private applySettings(s: Settings) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(s.master, t, 0.05);
    this.bgmBus.gain.setTargetAtTime(s.bgm, t, 0.05);
    this.sfxBus.gain.setTargetAtTime(s.sfx, t, 0.05);
  }

  // ---------- BGM ----------

  playScene(scene: SceneId, advance = false) {
    const def = SCENES.find((s) => s.id === scene);
    if (!def) return;
    let idx = this.sceneIndex.get(scene) ?? 0;
    if (advance) idx = (idx + 1) % def.tracks.length;
    this.sceneIndex.set(scene, idx);
    this.playTrack(def.tracks[idx], scene);
  }

  nextInScene() {
    if (this.state.scene) this.playScene(this.state.scene, true);
  }

  playTrack(trackId: string, scene?: SceneId) {
    const ctx = this.ctx;
    if (!ctx) return;
    const t = ctx.currentTime;
    this.fadeOutBgm();

    const el = new Audio(bgmUrl(trackId));
    el.preload = "auto";
    const source = ctx.createMediaElementSource(el);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(1, t + FADE);
    source.connect(gain).connect(this.bgmBus);
    el.addEventListener("ended", () => {
      if (this.bgm?.el !== el) return;
      if (this.state.scene) this.playScene(this.state.scene, true);
      else el.play();
    });
    el.play().catch(() => this.set({ bgmPlaying: false }));
    this.bgm = { el, gain, source };
    this.set({ trackId, scene, bgmPlaying: true });
  }

  private fadeOutBgm() {
    const old = this.bgm;
    if (!old || !this.ctx) return;
    const t = this.ctx.currentTime;
    old.gain.gain.cancelScheduledValues(t);
    old.gain.gain.setValueAtTime(old.gain.gain.value, t);
    old.gain.gain.linearRampToValueAtTime(0, t + FADE);
    setTimeout(() => {
      old.el.pause();
      old.source.disconnect();
      old.gain.disconnect();
    }, FADE * 1000 + 100);
    this.bgm = undefined;
  }

  toggleBgm() {
    const cur = this.bgm;
    if (!cur || !this.ctx) {
      this.playScene(this.state.scene ?? "title");
      return;
    }
    const t = this.ctx.currentTime;
    const g = cur.gain.gain;
    g.cancelScheduledValues(t);
    g.setValueAtTime(g.value, t);
    if (this.state.bgmPlaying) {
      g.linearRampToValueAtTime(0, t + 0.4);
      setTimeout(() => this.bgm === cur && !this.state.bgmPlaying && cur.el.pause(), 450);
      this.set({ bgmPlaying: false });
    } else {
      cur.el.play();
      g.linearRampToValueAtTime(1, t + 0.6);
      this.set({ bgmPlaying: true });
    }
  }

  stopBgm() {
    this.fadeOutBgm();
    this.set({ bgmPlaying: false, trackId: undefined, scene: undefined });
  }

  // ---------- SFX ----------

  private duck(on: boolean) {
    if (!this.ctx) return;
    this.duckCount = Math.max(0, this.duckCount + (on ? 1 : -1));
    const target = this.duckCount > 0 && this.state.settings.duck ? DUCK_LEVEL : 1;
    this.duckNode.gain.setTargetAtTime(target, this.ctx.currentTime, target < 1 ? 0.06 : 0.35);
  }

  private loadBuffer(key: string, load: () => Promise<ArrayBuffer | null>) {
    let p = this.buffers.get(key);
    if (!p) {
      p = load()
        .then((data) => (data ? this.ctx!.decodeAudioData(data) : null))
        .catch(() => null);
      this.buffers.set(key, p);
    }
    return p;
  }

  private async bufferFor(def: SoundDef) {
    if (this.state.overrides.has(def.id)) {
      const buf = await this.loadBuffer(`override:${def.id}`, async () => {
        const o = await getOverride(def.id);
        return o ? o.blob.arrayBuffer() : null;
      });
      if (buf) return buf;
    }
    const packUrl = this.state.pack[def.id] ?? `audio/pack/${encodeURIComponent(def.id)}.wav`;
    const candidates = def.file ? [packUrl, sfxUrl(def.file)] : [packUrl];
    for (const url of candidates) {
      const buf = await this.loadBuffer(url, async () => {
        const res = await fetch(url);
        return res.ok ? res.arrayBuffer() : null;
      });
      if (buf) return buf;
    }
    return null;
  }

  /** Warm the decode cache so the first tap on a file-backed sound has no delay. */
  preload(defs: SoundDef[]) {
    if (!this.ctx) return;
    defs.forEach((d) => void this.bufferFor(d));
  }

  async playSound(def: SoundDef) {
    const ctx = this.ctx;
    if (!ctx) return;
    const existing = this.active.get(def.id);
    if (existing?.long) {
      existing.stop();
      return;
    }

    const buffer = await this.bufferFor(def);
    const out = ctx.createGain();
    out.connect(this.sfxBus);

    let duration: number;
    let src: AudioBufferSourceNode | undefined;
    if (buffer) {
      src = ctx.createBufferSource();
      src.buffer = buffer;
      src.connect(out);
      src.start();
      duration = buffer.duration;
    } else {
      duration = renderSynth(ctx, out, def.synth);
    }
    this.track(def.id, out, duration, src);
  }

  async playSteps(key: string, mobId: string, kind: StepKind, count: number, heavy = false) {
    const ctx = this.ctx;
    if (!ctx) return;
    const stepId = `step-${mobId}`;
    const stepUrl = this.state.pack[stepId] ?? `audio/pack/${encodeURIComponent(stepId)}.wav`;
    const stepBuf = await this.loadBuffer(stepUrl, async () => {
      const res = await fetch(stepUrl);
      return res.ok ? res.arrayBuffer() : null;
    });
    const out = ctx.createGain();
    out.connect(this.sfxBus);
    if (stepBuf) {
      const gap = Math.min(Math.max(stepBuf.duration * 0.72, 0.22), 0.45);
      const t0 = ctx.currentTime;
      for (let i = 0; i < count; i++) {
        const src = ctx.createBufferSource();
        src.buffer = stepBuf;
        src.playbackRate.value = 0.96 + Math.random() * 0.08;
        src.connect(out);
        src.start(t0 + i * gap);
      }
      this.track(key, out, (count - 1) * gap + stepBuf.duration);
    } else {
      this.track(key, out, renderSteps(ctx, out, kind, count, heavy));
    }
  }

  private track(id: string, out: GainNode, duration: number, src?: AudioBufferSourceNode) {
    const ctx = this.ctx!;
    this.duck(true);
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      if (this.active.get(id) === entry) {
        this.active.delete(id);
        const playing = new Map(this.state.playing);
        playing.delete(id);
        this.set({ playing });
      }
      this.duck(false);
    };
    const stop = () => {
      out.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
      setTimeout(() => {
        src?.stop();
        out.disconnect();
      }, 250);
      finish();
    };
    const timer = setTimeout(() => {
      out.disconnect();
      finish();
    }, duration * 1000 + 150);
    const entry: Playing = { stop, long: duration > LONG_SOUND };
    this.active.set(id, entry);
    this.set({ playing: new Map(this.state.playing).set(id, duration) });
  }

  stopAllSfx() {
    [...this.active.values()].forEach((p) => p.stop());
  }

  overrideChanged(id: string, present: boolean) {
    this.buffers.delete(`override:${id}`);
    const overrides = new Set(this.state.overrides);
    if (present) overrides.add(id);
    else overrides.delete(id);
    this.set({ overrides });
  }

  overridesCleared() {
    for (const key of [...this.buffers.keys()]) if (key.startsWith("override:")) this.buffers.delete(key);
    this.set({ overrides: new Set() });
  }
}

let engine: AudioEngine | undefined;
export function getEngine() {
  engine ??= new AudioEngine();
  return engine;
}
export type { AudioEngine };

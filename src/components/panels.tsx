"use client";

import { useState } from "react";
import { BGM_TRACKS, SCENES } from "@/data/bgm";
import { MONSTERS, STEP_KIND_LABEL, type Monster } from "@/data/monsters";
import { CLASSES, EVENT_GROUPS, type ClassId, type SoundDef } from "@/data/sounds";
import { clearOverrides } from "@/lib/audio/overrides";
import { useEngine } from "@/lib/audio/use-engine";
import { SoundTile } from "./sound-tile";

function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="flex items-baseline gap-2">
        <span className="font-display text-lg font-semibold text-gold-soft">{title}</span>
        {sub && <span className="text-sm text-mist">{sub}</span>}
      </h3>
      {children}
    </section>
  );
}

function Grid({ sounds, accent, editMode }: { sounds: SoundDef[]; accent?: string; editMode: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {sounds.map((s) => (
        <SoundTile key={s.id} sound={s} accent={accent} editMode={editMode} />
      ))}
    </div>
  );
}

export function ClassPanel({ editMode }: { editMode: boolean }) {
  const [active, setActive] = useState<ClassId>("swordsman");
  const cls = CLASSES.find((c) => c.id === active)!;
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {CLASSES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(c.id)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              c.id === active ? "text-ink" : "border-line text-mist hover:text-white"
            }`}
            style={c.id === active ? { background: c.accent, borderColor: c.accent } : undefined}
          >
            <span className="font-display font-semibold">{c.name}</span>
            <span className="ml-1.5 opacity-80">{c.th}</span>
          </button>
        ))}
      </div>
      <Section title="Class 1" sub={cls.name}>
        <Grid sounds={cls.class1} accent={cls.accent} editMode={editMode} />
      </Section>
      <Section title="Class 2" sub={cls.class2}>
        <Grid sounds={cls.class2Skills} accent={cls.accent} editMode={editMode} />
      </Section>
    </div>
  );
}

export function EventsPanel({ editMode }: { editMode: boolean }) {
  return (
    <div className="space-y-6">
      {EVENT_GROUPS.map((g) => (
        <Section key={g.id} title={g.name} sub={g.th}>
          <Grid sounds={g.sounds} editMode={editMode} />
        </Section>
      ))}
    </div>
  );
}

export function MonsterPanel() {
  const [hexes, setHexes] = useState(2);
  const groups = [
    { title: "Monsters", sub: "มอนสเตอร์", list: MONSTERS.filter((m) => !m.mvp) },
    { title: "MVP", sub: "บอส", list: MONSTERS.filter((m) => m.mvp) },
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-panel/70 p-3">
        <span className="text-sm text-mist">ระยะเดิน (ช่อง Hex)</span>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setHexes(n)}
              className={`size-10 rounded-lg border font-display text-lg font-semibold ${
                n === hexes ? "border-gold bg-gold text-ink" : "border-line text-mist"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <span className="text-xs text-mist">แตะมอนสเตอร์เพื่อเล่นเสียงเดินตามจำนวนช่อง</span>
      </div>
      {groups.map((g) => (
        <Section key={g.title} title={g.title} sub={g.sub}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {g.list.map((m) => (
              <MonsterCard key={m.id} monster={m} hexes={hexes} />
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}

function MonsterCard({ monster: m, hexes }: { monster: Monster; hexes: number }) {
  const [state, engine] = useEngine();
  const walkKey = `walk:${m.id}`;
  const walking = state.playing.has(walkKey);
  return (
    <div
      className={`overflow-hidden rounded-xl border bg-panel-2/80 ${walking ? "is-playing" : ""}`}
      style={{ borderColor: walking ? m.color : undefined, "--accent": m.color } as React.CSSProperties}
    >
      <button
        type="button"
        onPointerDown={() => engine.playSteps(walkKey, m.step, hexes, m.mvp)}
        className="flex w-full items-center gap-3 px-3 py-3 text-left active:bg-white/5"
      >
        <span
          className="grid size-10 shrink-0 place-items-center rounded-full font-display text-sm font-bold text-ink"
          style={{ background: m.color }}
        >
          {m.name.slice(0, 2)}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-display text-[15px] font-semibold">{m.name}</span>
          <span className="block text-xs text-mist">
            เดิน {hexes} ช่อง · {STEP_KIND_LABEL[m.step]}
          </span>
        </span>
      </button>
      <div className="grid grid-cols-2 border-t border-line text-xs">
        <button
          type="button"
          onPointerDown={() =>
            void engine.playSound({ id: `atk:${m.id}`, label: "", synth: m.mvp ? "monster-heavy" : "monster-bite" })
          }
          className="py-2 text-mist hover:text-white active:bg-white/5"
        >
          โจมตี
        </button>
        <button
          type="button"
          onPointerDown={() => void engine.playSound({ id: `kill:${m.id}`, label: "", synth: m.mvp ? "victory" : "pop" })}
          className="border-l border-line py-2 text-mist hover:text-white active:bg-white/5"
        >
          ถูกกำจัด
        </button>
      </div>
    </div>
  );
}

export function MusicPanel() {
  const [state, engine] = useEngine();
  const sceneOf = (id: string) => SCENES.find((s) => s.tracks.includes(id));
  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
      {BGM_TRACKS.map((t) => {
        const current = state.trackId === t.id;
        const scene = sceneOf(t.id);
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => engine.playTrack(t.id, scene?.id)}
            className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
              current ? "border-gold bg-gold/10" : "border-line bg-panel-2/60 hover:border-gold/50"
            }`}
          >
            <span className="w-8 font-mono text-sm text-mist">{t.id}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-display font-semibold">{t.title}</span>
              <span className="block truncate text-xs text-mist">
                {t.location}
                {scene && ` · ${scene.th}`}
              </span>
            </span>
            {current && <span className="text-gold">{state.bgmPlaying ? "♪" : "❚❚"}</span>}
          </button>
        );
      })}
    </div>
  );
}

export function SettingsPanel({
  editMode,
  setEditMode,
}: {
  editMode: boolean;
  setEditMode: (v: boolean) => void;
}) {
  const [state, engine] = useEngine();
  const s = state.settings;
  const sliders = [
    { key: "master", label: "เสียงรวม" },
    { key: "bgm", label: "เพลง BGM" },
    { key: "sfx", label: "เสียงเอฟเฟกต์" },
  ] as const;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Section title="Volume" sub="ระดับเสียง">
        <div className="space-y-4 rounded-xl border border-line bg-panel/70 p-4">
          {sliders.map((sl) => (
            <label key={sl.key} className="flex items-center gap-4">
              <span className="w-28 text-sm text-mist">{sl.label}</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={s[sl.key]}
                onChange={(e) => engine.updateSettings({ [sl.key]: Number(e.target.value) })}
                className="flex-1"
              />
              <span className="w-10 text-right font-mono text-sm">{Math.round(s[sl.key] * 100)}</span>
            </label>
          ))}
          <Toggle
            label="ลดเสียงเพลงอัตโนมัติขณะเล่นเอฟเฟกต์"
            checked={s.duck}
            onChange={(v) => engine.updateSettings({ duck: v })}
          />
        </div>
      </Section>

      <Section title="Custom Sounds" sub="เปลี่ยนเสียงเอง">
        <div className="space-y-4 rounded-xl border border-line bg-panel/70 p-4 text-sm">
          <Toggle label="โหมดแก้ไขเสียง (แตะปุ่มเสียงเพื่ออัปโหลดไฟล์)" checked={editMode} onChange={setEditMode} />
          <p className="text-mist">
            ไฟล์ที่อัปโหลดเก็บไว้ในเครื่องนี้เท่านั้น (IndexedDB) ตอนนี้มีเสียงที่เปลี่ยนเอง {state.overrides.size} รายการ
          </p>
          <button
            type="button"
            disabled={state.overrides.size === 0}
            onClick={async () => {
              await clearOverrides();
              engine.overridesCleared();
            }}
            className="rounded-lg border border-line px-3 py-1.5 text-mist enabled:hover:text-white disabled:opacity-40"
          >
            ล้างเสียงที่อัปโหลดทั้งหมด
          </button>
          <ul className="space-y-1.5 border-t border-line pt-3 text-xs text-mist">
            <li>
              <Dot c="#7ee08a" /> เสียงจากเกมจริง (iRO Wiki)
            </li>
            <li>
              <Dot c="#6b7399" /> เสียงสังเคราะห์ชั่วคราว รอเปลี่ยนเป็นไฟล์จริง
            </li>
            <li>
              <Dot c="#f0c04a" /> เสียงที่อัปโหลดเอง
            </li>
          </ul>
        </div>
      </Section>

      <p className="text-xs leading-relaxed text-mist lg:col-span-2">
        เพลงและเสียงจาก Ragnarok Online เป็นลิขสิทธิ์ของ Gravity Co., Ltd. ดึงมาจาก{" "}
        <a className="underline" href="https://irowiki.org/wiki/BGM_Files" target="_blank" rel="noreferrer">
          iRO Wiki
        </a>{" "}
        เพื่อใช้ทำต้นแบบเท่านั้น ก่อนเผยแพร่ต้องได้รับอนุญาตใช้ไฟล์เสียงจากเจ้าของลิขสิทธิ์
      </p>
    </div>
  );
}

function Dot({ c }: { c: string }) {
  return <span className="mr-2 inline-block size-2 rounded-full" style={{ background: c }} />;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="flex w-full items-center justify-between gap-4 text-left">
      <span className="text-sm">{label}</span>
      <span className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? "bg-gold" : "bg-line"}`}>
        <span className={`absolute top-0.5 size-5 rounded-full bg-white transition-all ${checked ? "left-5.5" : "left-0.5"}`} />
      </span>
    </button>
  );
}

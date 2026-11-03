"use client";

import { useState } from "react";
import { BGM_TRACKS, SCENES } from "@/data/bgm";
import { MONSTERS, STEP_KIND_LABEL, type Monster } from "@/data/monsters";
import { ALL_SOUNDS, CLASSES, COMMON_GROUPS, type ClassId } from "@/data/sounds";
import { clearOverrides } from "@/lib/audio/overrides";
import { useEngine } from "@/lib/audio/use-engine";
import { PadGrid, SoundPad, haptic } from "./pad";

function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string; icon?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex rounded-2xl border border-line bg-panel p-1">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-xl text-[14px] font-semibold transition ${
            o.id === value ? "bg-gold text-ink" : "text-mist"
          }`}
        >
          {o.icon && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={o.icon} alt="" className="size-5 object-contain [image-rendering:pixelated]" />
          )}
          <span>{o.label}</span>
        </button>
      ))}
    </div>
  );
}

function StickyBar({ children }: { children: React.ReactNode }) {
  return <div className="sticky top-14 z-10 -mx-4 space-y-3 bg-ink/95 px-4 pt-1 pb-3 backdrop-blur">{children}</div>;
}

export function CommonScreen({ editMode }: { editMode: boolean }) {
  const [group, setGroup] = useState(COMMON_GROUPS[0].id);
  const current = COMMON_GROUPS.find((g) => g.id === group)!;
  return (
    <>
      <StickyBar>
        <Segmented options={COMMON_GROUPS.map((g) => ({ id: g.id, label: g.th }))} value={group} onChange={setGroup} />
      </StickyBar>
      <PadGrid>
        {current.sounds.map((s) => (
          <SoundPad key={s.id} sound={s} editMode={editMode} />
        ))}
      </PadGrid>
    </>
  );
}

export function ClassScreen({ editMode }: { editMode: boolean }) {
  const [active, setActive] = useState<ClassId>("swordsman");
  const [tier, setTier] = useState<"1" | "2">("1");
  const cls = CLASSES.find((c) => c.id === active)!;
  const sounds = tier === "1" ? cls.class1 : cls.class2Skills;
  return (
    <>
      <StickyBar>
        <div className="grid grid-cols-6 gap-1.5">
          {CLASSES.map((c) => {
            const on = c.id === active;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                className={`flex h-16 flex-col items-center justify-center rounded-2xl border-2 transition ${
                  on ? "text-white" : "border-transparent bg-panel text-mist opacity-65"
                }`}
                style={on ? { borderColor: c.accent, background: `${c.accent}2b` } : undefined}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.icon}
                  alt={c.name}
                  draggable={false}
                  className="size-7 object-contain [image-rendering:pixelated]"
                />
                <span className="mt-1 text-[10px] leading-none font-medium">{c.th}</span>
              </button>
            );
          })}
        </div>
        <Segmented
          options={[
            { id: "1", label: `Class 1 · ${cls.name}`, icon: cls.icon },
            { id: "2", label: `Class 2 · ${cls.class2.split(" / ")[0]}`, icon: cls.class2Icon },
          ]}
          value={tier}
          onChange={setTier}
        />
      </StickyBar>
      <PadGrid>
        {sounds.map((s) => (
          <SoundPad key={s.id} sound={s} accent={cls.accent} editMode={editMode} />
        ))}
      </PadGrid>
    </>
  );
}

export function MusicScreen() {
  const [state, engine] = useEngine();
  return (
    <div className="space-y-6">
      <PadGrid>
        {SCENES.map((s) => {
          const on = state.scene === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                haptic();
                if (on) engine.nextInScene();
                else engine.playScene(s.id);
              }}
              className={`pad relative flex aspect-square w-full flex-col items-center justify-center gap-1.5 rounded-3xl border-2 transition active:scale-[0.94] ${
                on ? "border-gold" : "border-white/10"
              }`}
            >
              <span className="grid size-14 place-items-center rounded-2xl border border-white/15 bg-[#0c1022]/85">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.icon} alt="" draggable={false} className="size-11 object-contain" />
              </span>
              <span className="mt-0.5 font-display text-base font-bold">{s.name}</span>
              <span className="text-xs text-mist">{s.th}</span>
              {on && (
                <span className="absolute top-3 right-3">
                  <Equalizer playing={state.bgmPlaying} />
                </span>
              )}
              {on && s.tracks.length > 1 && (
                <span className="absolute bottom-2 text-[10px] text-gold/80">แตะซ้ำ = เพลงถัดไป</span>
              )}
            </button>
          );
        })}
      </PadGrid>
      <details className="rounded-2xl border border-line bg-panel/70">
        <summary className="cursor-pointer px-4 py-3 text-sm text-mist">เพลงทั้งหมด ({BGM_TRACKS.length})</summary>
        <ul className="divide-y divide-line border-t border-line">
          {BGM_TRACKS.map((t) => {
            const scene = SCENES.find((s) => s.tracks.includes(t.id));
            const on = state.trackId === t.id;
            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => engine.playTrack(t.id, scene?.id)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left ${on ? "bg-gold/10" : ""}`}
                >
                  <span className="w-7 font-mono text-xs text-mist">{t.id}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-sm font-semibold">{t.title}</span>
                    <span className="block truncate text-xs text-mist">{t.location}</span>
                  </span>
                  {on && <Equalizer playing={state.bgmPlaying} />}
                </button>
              </li>
            );
          })}
        </ul>
      </details>
    </div>
  );
}

export function Equalizer({ playing }: { playing: boolean }) {
  return (
    <span className="flex h-4 items-end gap-0.5" aria-hidden>
      {[0, 0.2, 0.4].map((d) => (
        <span
          key={d}
          className={`w-1 rounded-sm bg-gold ${playing ? "eq-bar" : "h-1"}`}
          style={playing ? { height: "100%", animationDelay: `${d}s` } : undefined}
        />
      ))}
    </span>
  );
}

export function MonsterScreen() {
  const [hexes, setHexes] = useState(2);
  const [bosses, setBosses] = useState<"mob" | "mvp">("mob");
  const list = MONSTERS.filter((m) => (bosses === "mvp" ? m.mvp : !m.mvp));
  return (
    <>
      <StickyBar>
        <Segmented
          options={[
            { id: "mob", label: "มอนสเตอร์ (26)", icon: "/icons/monsters/poring.png" },
            { id: "mvp", label: "MVP Boss (16)", icon: "/icons/boardgame/mvp.gif" },
          ]}
          value={bosses}
          onChange={setBosses}
        />
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-xs text-mist">เดิน</span>
          <div className="grid flex-1 grid-cols-6 gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setHexes(n)}
                className={`h-11 rounded-xl font-display text-lg font-bold ${
                  n === hexes ? "bg-gold text-ink" : "bg-panel text-mist"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <span className="shrink-0 text-xs text-mist">ช่อง</span>
        </div>
      </StickyBar>
      <PadGrid>
        {list.map((m) => (
          <MonsterPad key={m.id} monster={m} hexes={hexes} />
        ))}
      </PadGrid>
    </>
  );
}

function MonsterPad({ monster: m, hexes }: { monster: Monster; hexes: number }) {
  const [state, engine] = useEngine();
  const walkKey = `walk:${m.id}`;
  const atkKey = `atk-${m.id}`;
  const killKey = `kill-${m.id}`;
  const active =
    state.playing.has(walkKey) || state.playing.has(atkKey) || state.playing.has(killKey);
  const tap = (fn: () => void) => () => {
    haptic();
    fn();
  };
  return (
    <div
      className={`pad relative flex aspect-square flex-col overflow-hidden rounded-3xl border-2 ${
        active ? "is-playing" : "border-white/10"
      }`}
      style={{ "--accent": m.color, borderColor: active ? m.color : undefined } as React.CSSProperties}
    >
      {m.mvp && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/icons/boardgame/mvp.gif"
          alt="MVP"
          draggable={false}
          className="pointer-events-none absolute top-2 left-2.5 z-10 h-6 w-auto drop-shadow"
        />
      )}
      <span className="pointer-events-none absolute top-3 right-3 size-2 rounded-full bg-[#7ee08a]" />
      <button
        type="button"
        onPointerDown={tap(() => void engine.playSteps(walkKey, m.id, m.step, hexes, m.mvp))}
        className="flex flex-1 touch-manipulation flex-col items-center justify-center gap-1 px-2 pt-2 active:bg-white/5"
      >
        <span className="grid h-18 w-full place-items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={m.sprite}
            alt={m.name}
            draggable={false}
            className="h-16 w-auto max-w-24 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] select-none [image-rendering:pixelated]"
          />
        </span>
        <span className="line-clamp-1 font-display text-[14px] leading-tight font-bold text-white">{m.name}</span>
        <span className="line-clamp-1 text-[11px] text-mist">
          {m.th} · เดิน {hexes} ช่อง ({STEP_KIND_LABEL[m.step]})
        </span>
      </button>
      <div className="grid h-11 grid-cols-2 border-t border-white/10 text-xs font-medium">
        <button
          type="button"
          onPointerDown={tap(
            () =>
              void engine.playSound({
                id: atkKey,
                label: m.name,
                icon: m.sprite,
                synth: m.mvp ? "monster-heavy" : "monster-bite",
              }),
          )}
          className="flex touch-manipulation items-center justify-center gap-1.5 text-white/90 active:bg-white/10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/items/sword.png" alt="" className="size-4 [image-rendering:pixelated]" />
          <span>โจมตี</span>
        </button>
        <button
          type="button"
          onPointerDown={tap(
            () =>
              void engine.playSound({
                id: killKey,
                label: m.name,
                icon: m.sprite,
                synth: m.mvp ? "victory" : "pop",
              }),
          )}
          className="flex touch-manipulation items-center justify-center gap-1.5 border-l border-white/10 text-white/90 active:bg-white/10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/items/skull.png" alt="" className="size-4 [image-rendering:pixelated]" />
          <span>ตาย</span>
        </button>
      </div>
    </div>
  );
}

export function SettingsScreen({ editMode, setEditMode }: { editMode: boolean; setEditMode: (v: boolean) => void }) {
  const [state, engine] = useEngine();
  const s = state.settings;
  const packCount = Object.keys(state.pack).length;
  const sliders = [
    { key: "master", label: "เสียงรวม" },
    { key: "bgm", label: "เพลง" },
    { key: "sfx", label: "เอฟเฟกต์" },
  ] as const;

  return (
    <div className="space-y-4">
      <Card title="ระดับเสียง">
        {sliders.map((sl) => (
          <label key={sl.key} className="flex items-center gap-3 py-2">
            <span className="w-20 text-sm text-mist">{sl.label}</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={s[sl.key]}
              onChange={(e) => engine.updateSettings({ [sl.key]: Number(e.target.value) })}
              className="h-8 flex-1"
            />
            <span className="w-9 text-right font-mono text-sm">{Math.round(s[sl.key] * 100)}</span>
          </label>
        ))}
        <Toggle label="ลดเพลงลงขณะเล่นเอฟเฟกต์" checked={s.duck} onChange={(v) => engine.updateSettings({ duck: v })} />
      </Card>

      <Card title="คลังเสียงและโหมดแก้ไข">
        <Toggle label="โหมดแก้ไข: แตะปุ่มเพื่ออัปโหลดไฟล์เสียงแทน" checked={editMode} onChange={setEditMode} />
        <p className="text-xs text-mist">
          ติดตั้งเสียงจาก Playlist แล้ว {packCount} ไฟล์ (ครบทั้ง {ALL_SOUNDS.length} ปุ่ม + เสียงมอนสเตอร์เดิน/โจมตี/ตาย) · อัปโหลดแทนที่เอง{" "}
          {state.overrides.size} ปุ่ม
        </p>
        <button
          type="button"
          disabled={state.overrides.size === 0}
          onClick={async () => {
            await clearOverrides();
            engine.overridesCleared();
          }}
          className="h-11 w-full rounded-xl border border-line text-sm text-mist disabled:opacity-40"
        >
          ล้างเสียงที่อัปโหลดทั้งหมด
        </button>
      </Card>

      <Card title="สีจุดมุมปุ่ม">
        <ul className="space-y-1.5 text-sm text-mist">
          <li>
            <Dot c="#7ee08a" /> เสียงจริงจากเกม Ragnarok Online (Playlist + iRO Wiki)
          </li>
          <li>
            <Dot c="#f0c04a" /> เสียงที่อัปโหลดเองในเครื่องนี้
          </li>
          <li>
            <Dot c="#59607f" /> เสียงสังเคราะห์สำรอง
          </li>
        </ul>
      </Card>

      <p className="px-1 text-xs leading-relaxed text-mist">
        เพลง เสียงเอฟเฟกต์ และไอคอนจาก Ragnarok Online เป็นลิขสิทธิ์ของ Gravity Co., Ltd. ใช้เพื่อทำต้นแบบสำหรับบอร์ดเกมเท่านั้น
      </p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3 rounded-2xl border border-line bg-panel/70 p-4">
      <h3 className="font-display font-semibold text-gold-soft">{title}</h3>
      {children}
    </section>
  );
}

function Dot({ c }: { c: string }) {
  return <span className="mr-2 inline-block size-2.5 rounded-full" style={{ background: c }} />;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="flex min-h-11 w-full items-center justify-between gap-4 text-left">
      <span className="text-sm">{label}</span>
      <span className={`relative h-7 w-12 shrink-0 rounded-full transition ${checked ? "bg-gold" : "bg-line"}`}>
        <span className={`absolute top-1 size-5 rounded-full bg-white transition-all ${checked ? "left-6" : "left-1"}`} />
      </span>
    </button>
  );
}

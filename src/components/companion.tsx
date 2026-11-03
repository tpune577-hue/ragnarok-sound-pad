"use client";

import { useState } from "react";
import { BGM_TRACKS, SCENES } from "@/data/bgm";
import { CLASSES, EVENT_GROUPS } from "@/data/sounds";
import { useEngine } from "@/lib/audio/use-engine";
import { ClassPanel, EventsPanel, MonsterPanel, MusicPanel, SettingsPanel } from "./panels";

const TABS = [
  { id: "classes", label: "สกิลอาชีพ", en: "Skills" },
  { id: "events", label: "เหตุการณ์", en: "Events" },
  { id: "monsters", label: "มอนสเตอร์", en: "Monsters" },
  { id: "music", label: "เพลงทั้งหมด", en: "Music" },
  { id: "settings", label: "ตั้งค่า", en: "Settings" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function Companion() {
  const [state, engine] = useEngine();
  const [tab, setTab] = useState<TabId>("classes");
  const [editMode, setEditMode] = useState(false);

  if (!state.ready) {
    return (
      <button
        type="button"
        onClick={async () => {
          await engine.unlock();
          engine.playScene("title");
          engine.preload([
            ...CLASSES.flatMap((c) => [...c.class1, ...c.class2Skills]),
            ...EVENT_GROUPS.flatMap((g) => g.sounds),
          ]);
        }}
        className="flex min-h-dvh w-full flex-col items-center justify-center gap-6 px-6 text-center"
      >
        <p className="font-display text-sm tracking-[0.4em] text-gold/80">RAGNAROK THE BOARD GAME</p>
        <h1 className="font-display text-4xl font-extrabold text-gold-soft sm:text-6xl">Ceremony of Prontera</h1>
        <p className="text-mist">Sound Companion</p>
        <span className="mt-6 animate-pulse rounded-full border border-gold/60 px-8 py-3 text-lg text-gold-soft">
          แตะเพื่อเริ่มการผจญภัย
        </span>
      </button>
    );
  }

  const track = BGM_TRACKS.find((t) => t.id === state.trackId);

  return (
    <div className="mx-auto flex min-h-dvh max-w-7xl flex-col">
      <header className="sticky top-0 z-10 space-y-3 border-b border-line bg-ink/90 px-4 pt-[max(env(safe-area-inset-top),0.75rem)] pb-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => engine.toggleBgm()}
            aria-label={state.bgmPlaying ? "Pause BGM" : "Play BGM"}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-gold text-lg text-ink"
          >
            {state.bgmPlaying ? "❚❚" : "▶"}
          </button>
          <button
            type="button"
            onClick={() => engine.nextInScene()}
            aria-label="Next track"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-mist hover:text-white"
          >
            ⏭
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-base font-semibold text-gold-soft">
              {track ? track.title : "— ไม่มีเพลง —"}
            </p>
            <p className="truncate text-xs text-mist">{track?.location}</p>
          </div>
          <label className="hidden items-center gap-2 text-xs text-mist sm:flex">
            BGM
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={state.settings.bgm}
              onChange={(e) => engine.updateSettings({ bgm: Number(e.target.value) })}
              className="w-28"
            />
          </label>
          <button
            type="button"
            onClick={() => engine.stopAllSfx()}
            className="rounded-lg border border-line px-3 py-2 text-xs text-mist hover:text-white"
          >
            หยุดเอฟเฟกต์
          </button>
        </div>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-0.5 [scrollbar-width:none]">
          {SCENES.map((s) => {
            const active = state.scene === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => (active ? engine.nextInScene() : engine.playScene(s.id))}
                className={`shrink-0 rounded-lg border px-3 py-1.5 text-left transition ${
                  active ? "border-gold bg-gold/15" : "border-line bg-panel/60 hover:border-gold/50"
                }`}
              >
                <span className="block font-display text-sm font-semibold">{s.name}</span>
                <span className="block text-[11px] text-mist">
                  {s.th}
                  {s.tracks.length > 1 && ` · ${s.tracks.length} เพลง`}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      <nav className="flex gap-1 border-b border-line px-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`-mb-px border-b-2 px-3 py-3 text-sm transition ${
              tab === t.id ? "border-gold text-gold-soft" : "border-transparent text-mist hover:text-white"
            }`}
          >
            {t.label}
            <span className="ml-1 hidden font-display text-xs opacity-60 md:inline">{t.en}</span>
          </button>
        ))}
        {editMode && (
          <span className="ml-auto self-center rounded-full bg-gold/20 px-3 py-1 text-xs text-gold-soft">
            โหมดแก้ไขเสียง
          </span>
        )}
      </nav>

      <main className="flex-1 px-4 py-6 pb-[max(env(safe-area-inset-bottom),1.5rem)]">
        {tab === "classes" && <ClassPanel editMode={editMode} />}
        {tab === "events" && <EventsPanel editMode={editMode} />}
        {tab === "monsters" && <MonsterPanel />}
        {tab === "music" && <MusicPanel />}
        {tab === "settings" && <SettingsPanel editMode={editMode} setEditMode={setEditMode} />}
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import { BGM_TRACKS, SCENES } from "@/data/bgm";
import { ALL_SOUNDS } from "@/data/sounds";
import { useEngine } from "@/lib/audio/use-engine";
import { haptic } from "./pad";
import { ClassScreen, CommonScreen, Equalizer, MonsterScreen, MusicScreen, SettingsScreen } from "./screens";

const TABS = [
  { id: "common", icon: "⚡", label: "ทั่วไป" },
  { id: "classes", icon: "🗡️", label: "สกิล" },
  { id: "monsters", icon: "👾", label: "มอนสเตอร์" },
  { id: "music", icon: "🎵", label: "เพลง" },
  { id: "settings", icon: "⚙️", label: "ตั้งค่า" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function Companion() {
  const [state, engine] = useEngine();
  const [tab, setTab] = useState<TabId>("common");
  const [editMode, setEditMode] = useState(false);

  if (!state.ready) {
    return (
      <button
        type="button"
        onClick={async () => {
          await engine.unlock();
          engine.playScene("title");
          engine.preload(ALL_SOUNDS);
        }}
        className="flex min-h-dvh w-full flex-col items-center justify-center gap-5 px-6 text-center"
      >
        <span className="text-6xl">🏰</span>
        <p className="font-display text-xs tracking-[0.35em] text-gold/80">RAGNAROK THE BOARD GAME</p>
        <h1 className="font-display text-4xl leading-tight font-extrabold text-gold-soft">
          Ceremony
          <br />
          of Prontera
        </h1>
        <p className="text-mist">Sound Pad</p>
        <span className="mt-8 flex h-16 w-full max-w-xs items-center justify-center rounded-full bg-gold text-lg font-bold text-ink shadow-[0_0_40px_rgba(216,180,90,0.35)]">
          แตะเพื่อเริ่ม ▶
        </span>
      </button>
    );
  }

  const track = BGM_TRACKS.find((t) => t.id === state.trackId);
  const scene = SCENES.find((s) => s.id === state.scene);
  const current = TABS.find((t) => t.id === tab)!;

  return (
    <div className="mx-auto min-h-dvh max-w-3xl">
      <header className="sticky top-0 z-20 bg-ink/95 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="flex h-14 items-center gap-3 px-4">
          <h1 className="flex-1 font-display text-xl font-bold text-gold-soft">
            {current.icon} {current.label}
          </h1>
          {editMode && <span className="rounded-full bg-gold/20 px-3 py-1 text-xs text-gold-soft">โหมดแก้ไข</span>}
          {state.playing.size > 0 && (
            <button
              type="button"
              onClick={() => engine.stopAllSfx()}
              className="h-9 rounded-full border border-line px-4 text-sm text-mist"
            >
              ■ หยุดเสียง
            </button>
          )}
        </div>
      </header>

      <main className="px-4 pt-1 pb-[calc(env(safe-area-inset-bottom)+150px)]">
        {tab === "common" && <CommonScreen editMode={editMode} />}
        {tab === "classes" && <ClassScreen editMode={editMode} />}
        {tab === "monsters" && <MonsterScreen />}
        {tab === "music" && <MusicScreen />}
        {tab === "settings" && <SettingsScreen editMode={editMode} setEditMode={setEditMode} />}
      </main>

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-3xl border-t border-line bg-[#10142a]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <div className="flex items-center gap-3 border-b border-line/60 px-4 py-2">
          <button
            type="button"
            onClick={() => setTab("music")}
            className="flex min-w-0 flex-1 items-center gap-3 text-left"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-panel-2 text-xl">
              {scene?.icon ?? "🎵"}
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-2">
                <span className="truncate font-display text-sm font-semibold text-gold-soft">
                  {track?.title ?? "ไม่มีเพลง"}
                </span>
                {track && <Equalizer playing={state.bgmPlaying} />}
              </span>
              <span className="block truncate text-xs text-mist">{scene ? `${scene.th} · ${track?.location}` : "เลือกฉากในแท็บเพลง"}</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => engine.nextInScene()}
            aria-label="เพลงถัดไป"
            className="grid size-11 place-items-center rounded-full text-lg text-mist"
          >
            ⏭
          </button>
          <button
            type="button"
            onClick={() => engine.toggleBgm()}
            aria-label={state.bgmPlaying ? "หยุดเพลง" : "เล่นเพลง"}
            className="grid size-12 place-items-center rounded-full bg-gold text-lg text-ink"
          >
            {state.bgmPlaying ? "❚❚" : "▶"}
          </button>
        </div>
        <nav className="grid grid-cols-5">
          {TABS.map((t) => {
            const on = t.id === tab;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  haptic();
                  setTab(t.id);
                  window.scrollTo({ top: 0 });
                }}
                className={`flex h-16 flex-col items-center justify-center gap-1 ${on ? "text-gold-soft" : "text-mist"}`}
              >
                <span className={`text-2xl leading-none transition ${on ? "scale-110" : "opacity-60 grayscale"}`}>{t.icon}</span>
                <span className="text-[11px]">{t.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { BGM_TRACKS, SCENES } from "@/data/bgm";
import { ALL_SOUNDS } from "@/data/sounds";
import { useEngine } from "@/lib/audio/use-engine";
import { haptic } from "./pad";
import { ClassScreen, CommonScreen, Equalizer, MonsterScreen, MusicScreen, SettingsScreen } from "./screens";

const TABS = [
  { id: "common", icon: "icons/items/angel-wing.png", label: "ทั่วไป" },
  { id: "classes", icon: "icons/jobs/swordsman.png", label: "สกิล" },
  { id: "monsters", icon: "icons/monsters/poring.png", label: "มอนสเตอร์" },
  { id: "music", icon: "icons/items/emperium.png", label: "เพลง" },
  { id: "settings", icon: "icons/skills/weapon-repair.png", label: "ตั้งค่า" },
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
          engine.preload(ALL_SOUNDS.slice(0, 24));
        }}
        className="relative flex min-h-dvh w-full flex-col items-center justify-center gap-4 overflow-hidden px-6 text-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="icons/boardgame/prontera-bg.png"
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-0 size-full object-cover opacity-15"
        />
        <div className="relative flex flex-col items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="icons/boardgame/cover.png?v=2"
            alt="Ragnarok the Board Game: Ceremony of Prontera"
            draggable={false}
            className="w-full max-w-xs rounded-3xl border border-gold/40 object-cover shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
          />
          <p className="font-display text-xs tracking-[0.3em] text-gold-soft/90 uppercase">Official Sound Pad</p>
        </div>
        <span className="relative mt-4 flex h-16 w-full max-w-xs items-center justify-center rounded-full bg-gold text-lg font-bold text-ink shadow-[0_0_40px_rgba(216,180,90,0.4)]">
          แตะเพื่อเริ่มผจญภัย
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
        <div className="flex h-14 items-center gap-2.5 px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current.icon} alt="" className="size-6 object-contain [image-rendering:pixelated]" />
          <h1 className="flex-1 font-display text-lg font-bold text-gold-soft">{current.label}</h1>
          {editMode && <span className="rounded-full bg-gold/20 px-3 py-1 text-xs text-gold-soft">โหมดแก้ไข</span>}
          {state.playing.size > 0 && (
            <button
              type="button"
              onClick={() => engine.stopAllSfx()}
              className="flex h-9 items-center gap-1.5 rounded-full border border-line bg-panel px-3.5 text-xs font-medium text-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="icons/boardgame/status-blind.png" alt="" className="size-4 object-contain" />
              <span>หยุดเสียง</span>
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
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-panel-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={scene?.icon ?? "icons/items/emperium.png"}
                alt=""
                className="size-7 object-contain"
              />
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-2">
                <span className="truncate font-display text-sm font-semibold text-gold-soft">
                  {track?.title ?? "ไม่มีเพลง"}
                </span>
                {track && <Equalizer playing={state.bgmPlaying} />}
              </span>
              <span className="block truncate text-xs text-mist">
                {scene ? `${scene.th} · ${track?.location}` : "เลือกฉากในแท็บเพลง"}
              </span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => engine.nextInScene()}
            aria-label="เพลงถัดไป"
            className="grid size-11 place-items-center rounded-full border border-line bg-panel text-xs font-bold text-mist"
          >
            NEXT
          </button>
          <button
            type="button"
            onClick={() => engine.toggleBgm()}
            aria-label={state.bgmPlaying ? "หยุดเพลง" : "เล่นเพลง"}
            className="grid size-12 place-items-center rounded-full bg-gold font-display text-xs font-extrabold text-ink"
          >
            {state.bgmPlaying ? "PAUSE" : "PLAY"}
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.icon}
                  alt=""
                  draggable={false}
                  className={`size-6 object-contain transition [image-rendering:pixelated] ${
                    on ? "scale-110" : "opacity-55 grayscale"
                  }`}
                />
                <span className="text-[11px] font-medium">{t.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

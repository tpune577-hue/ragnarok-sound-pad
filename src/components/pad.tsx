"use client";

import { useRef, useState } from "react";
import type { SoundDef } from "@/data/sounds";
import { deleteOverride, putOverride } from "@/lib/audio/overrides";
import { useEngine } from "@/lib/audio/use-engine";

export const haptic = () => navigator.vibrate?.(12);

type Props = { sound: SoundDef; accent?: string; editMode: boolean };

export function SoundPad({ sound, accent = "#d8b45a", editMode }: Props) {
  const [state, engine] = useEngine();
  const fileInput = useRef<HTMLInputElement>(null);
  const [plays, setPlays] = useState(0);
  const duration = state.playing.get(sound.id);
  const custom = state.overrides.has(sound.id);
  const source = custom ? "custom" : state.pack[sound.id] || sound.file ? "original" : "synth";

  function play() {
    haptic();
    setPlays((n) => n + 1);
    void engine.playSound(sound);
  }

  async function onFile(file: File | undefined) {
    if (!file) return;
    await putOverride({ id: sound.id, name: file.name, blob: file });
    engine.overrideChanged(sound.id, true);
  }

  const isPixelIcon = sound.icon.includes("/skills/") || sound.icon.includes("/items/");

  return (
    <div className="relative" style={{ "--accent": accent } as React.CSSProperties}>
      <button
        type="button"
        onPointerDown={editMode ? undefined : play}
        onClick={(e) => {
          if (editMode) fileInput.current?.click();
          else if (e.detail === 0) play();
        }}
        onContextMenu={(e) => e.preventDefault()}
        className={`pad relative flex aspect-square w-full touch-manipulation flex-col items-center justify-center gap-1.5 overflow-hidden rounded-3xl border-2 px-2 text-center transition-transform duration-75 active:scale-[0.94] ${
          duration !== undefined ? "is-playing border-(--accent)" : "border-white/10"
        } ${editMode ? "border-dashed border-gold/50" : ""}`}
      >
        <span
          className="relative grid size-14 place-items-center rounded-2xl border border-white/15 bg-[#0c1022]/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_12px_rgba(0,0,0,0.45)]"
          style={{
            boxShadow:
              duration !== undefined
                ? `0 0 18px color-mix(in srgb, ${accent} 60%, transparent), inset 0 1px 0 rgba(255,255,255,0.2)`
                : undefined,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sound.icon}
            alt=""
            draggable={false}
            className={`object-contain select-none ${
              isPixelIcon ? "size-9 [image-rendering:pixelated]" : "size-11"
            }`}
          />
        </span>
        <span className="mt-0.5 line-clamp-1 font-display text-[14px] leading-tight font-bold text-white">
          {sound.label}
        </span>
        <span className="line-clamp-1 text-[11px] text-mist">{editMode ? "แตะเพื่ออัปโหลด" : sound.th}</span>
        <SourceDot source={source} />
        {duration !== undefined && (
          <span
            key={plays}
            className="pad-progress absolute inset-x-0 bottom-0 h-1.5 origin-left bg-(--accent)"
            style={{ animationDuration: `${duration}s` }}
          />
        )}
      </button>
      {editMode && custom && (
        <button
          type="button"
          onClick={async () => {
            await deleteOverride(sound.id);
            engine.overrideChanged(sound.id, false);
          }}
          className="absolute -top-2 -right-1 rounded-full border border-line bg-ink px-2.5 py-1 text-xs text-mist"
        >
          รีเซ็ต
        </button>
      )}
      <input
        ref={fileInput}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={(e) => {
          void onFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}

const SOURCE_COLOR = { original: "#7ee08a", synth: "#59607f", custom: "#f0c04a" } as const;

function SourceDot({ source }: { source: keyof typeof SOURCE_COLOR }) {
  return (
    <span
      className="absolute top-3 right-3 size-2 rounded-full"
      style={{ background: SOURCE_COLOR[source] }}
      aria-hidden
    />
  );
}

export function PadGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{children}</div>;
}

"use client";

import { useRef } from "react";
import type { SoundDef } from "@/data/sounds";
import { deleteOverride, putOverride } from "@/lib/audio/overrides";
import { useEngine } from "@/lib/audio/use-engine";

type Props = { sound: SoundDef; accent?: string; editMode: boolean };

export function SoundTile({ sound, accent = "#d8b45a", editMode }: Props) {
  const [state, engine] = useEngine();
  const fileInput = useRef<HTMLInputElement>(null);
  const playing = state.playing.has(sound.id);
  const custom = state.overrides.has(sound.id);
  const source = custom ? "custom" : sound.file ? "original" : "synth";

  async function onFile(file: File | undefined) {
    if (!file) return;
    await putOverride({ id: sound.id, name: file.name, blob: file });
    engine.overrideChanged(sound.id, true);
  }

  async function reset() {
    await deleteOverride(sound.id);
    engine.overrideChanged(sound.id, false);
  }

  return (
    <div className="relative" style={{ "--accent": accent } as React.CSSProperties}>
      <button
        type="button"
        onPointerDown={editMode ? undefined : () => void engine.playSound(sound)}
        onClick={(e) => {
          if (editMode) fileInput.current?.click();
          else if (e.detail === 0) void engine.playSound(sound);
        }}
        className={`group flex h-24 w-full flex-col justify-between rounded-xl border bg-panel-2/80 px-3 py-2.5 text-left transition active:scale-[0.97] ${
          playing ? "is-playing border-(--accent)" : "border-line hover:border-(--accent)/70"
        } ${editMode ? "border-dashed" : ""}`}
      >
        <span className="flex items-start justify-between gap-2">
          <span className="font-display text-[15px] leading-tight font-semibold text-white">{sound.label}</span>
          <SourceDot source={source} />
        </span>
        <span className="truncate text-xs text-mist">
          {editMode ? "แตะเพื่ออัปโหลดเสียงใหม่" : sound.th}
          {playing && !editMode && <span className="ml-1 text-(--accent)">♪</span>}
        </span>
        <span
          className="absolute inset-x-3 bottom-0 h-0.5 rounded-full opacity-70"
          style={{ background: accent }}
        />
      </button>
      {editMode && custom && (
        <button
          type="button"
          onClick={reset}
          className="absolute -top-2 -right-2 rounded-full border border-line bg-ink px-2 py-0.5 text-[11px] text-mist hover:text-white"
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

const SOURCE_STYLE = {
  original: { color: "#7ee08a", title: "เสียงจากเกม (iRO Wiki)" },
  synth: { color: "#6b7399", title: "เสียงสังเคราะห์ชั่วคราว" },
  custom: { color: "#f0c04a", title: "เสียงที่อัปโหลดเอง" },
} as const;

function SourceDot({ source }: { source: keyof typeof SOURCE_STYLE }) {
  const s = SOURCE_STYLE[source];
  return <span title={s.title} className="mt-1 size-2 shrink-0 rounded-full" style={{ background: s.color }} />;
}

"use client";

import { useSyncExternalStore } from "react";
import { getEngine } from "./engine";

export function useEngine() {
  const engine = getEngine();
  const state = useSyncExternalStore(engine.subscribe, engine.getSnapshot, engine.getSnapshot);
  return [state, engine] as const;
}

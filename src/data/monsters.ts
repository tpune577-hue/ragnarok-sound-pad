import type { StepKind } from "../lib/audio/synth-ids";

export type Monster = {
  id: string;
  name: string;
  step: StepKind;
  color: string;
  mvp?: boolean;
};

export const STEP_KIND_LABEL: Record<StepKind, string> = {
  bounce: "เด้งดึ๋ง",
  hop: "กระโดด",
  skitter: "แมลงไต่",
  paw: "สัตว์สี่ขา",
  stomp: "ย่ำหนัก",
  flap: "บิน",
  ghost: "ลอยผี",
  rattle: "โครงกระดูก",
  drag: "ลากขา",
  creak: "ต้นไม้",
};

export const MONSTERS: Monster[] = [
  { id: "poring", name: "Poring", step: "bounce", color: "#f48fb1" },
  { id: "drops", name: "Drops", step: "bounce", color: "#ffb74d" },
  { id: "poporing", name: "Poporing", step: "bounce", color: "#81c784" },
  { id: "marin", name: "Marin", step: "bounce", color: "#ce93d8" },
  { id: "lunatic", name: "Lunatic", step: "hop", color: "#eeeeee" },
  { id: "roda-frog", name: "Roda Frog", step: "hop", color: "#4db6ac" },
  { id: "spore", name: "Spore", step: "hop", color: "#a1887f" },
  { id: "fabre", name: "Fabre", step: "drag", color: "#aed581" },
  { id: "thief-bug", name: "Thief Bug", step: "skitter", color: "#8d6e63" },
  { id: "rocker", name: "Rocker", step: "skitter", color: "#c5e1a5" },
  { id: "tarou", name: "Tarou", step: "skitter", color: "#bcaaa4" },
  { id: "savage-bebe", name: "Savage Babe", step: "paw", color: "#d7ccc8" },
  { id: "wolf", name: "Wolf", step: "paw", color: "#90a4ae" },
  { id: "chonchon", name: "Chonchon", step: "flap", color: "#fff176" },
  { id: "hornet", name: "Hornet", step: "flap", color: "#ffd54f" },
  { id: "familiar", name: "Familiar", step: "flap", color: "#7e57c2" },
  { id: "creamy", name: "Creamy", step: "flap", color: "#f8bbd0" },
  { id: "willow", name: "Willow", step: "creak", color: "#8bc34a" },
  { id: "skeleton", name: "Skeleton", step: "rattle", color: "#e0e0e0" },
  { id: "zombie", name: "Zombie", step: "drag", color: "#9ccc65" },
  { id: "whisper", name: "Whisper", step: "ghost", color: "#b0bec5" },
  { id: "orc-warrior", name: "Orc Warrior", step: "stomp", color: "#689f38" },
  { id: "golden-thief-bug", name: "Golden Thief Bug", step: "skitter", color: "#ffca28", mvp: true },
  { id: "eddga", name: "Eddga", step: "paw", color: "#ff7043", mvp: true },
  { id: "moonlight", name: "Moonlight Flower", step: "ghost", color: "#ffe082", mvp: true },
  { id: "osiris", name: "Osiris", step: "ghost", color: "#80deea", mvp: true },
  { id: "phreeoni", name: "Phreeoni", step: "stomp", color: "#bcaaa4", mvp: true },
  { id: "orc-hero", name: "Orc Hero", step: "stomp", color: "#558b2f", mvp: true },
  { id: "maya", name: "Maya", step: "skitter", color: "#ab47bc", mvp: true },
  { id: "mistress", name: "Mistress", step: "flap", color: "#ffee58", mvp: true },
  { id: "baphomet", name: "Baphomet", step: "stomp", color: "#5d4037", mvp: true },
];

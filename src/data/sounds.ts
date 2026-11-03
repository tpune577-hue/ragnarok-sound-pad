import type { SynthId } from "../lib/audio/synth-ids";

export const SFX_REMOTE_BASE = "https://mirror.irowiki.org/ragnarok/effects/";

export type SoundDef = {
  id: string;
  label: string;
  th?: string;
  /** Path relative to SFX_REMOTE_BASE; downloaded to /audio/sfx/<basename>. */
  file?: string;
  synth: SynthId;
};

export type ClassId = "swordsman" | "thief" | "mage" | "acolyte" | "archer" | "merchant";

export type ClassBoard = {
  id: ClassId;
  name: string;
  th: string;
  class2: string;
  accent: string;
  class1: SoundDef[];
  class2Skills: SoundDef[];
};

export const sfxUrl = (file: string) => `/audio/sfx/${file.split("/").pop()}`;

export const CLASSES: ClassBoard[] = [
  {
    id: "swordsman",
    name: "Swordsman",
    th: "นักดาบ",
    class2: "Knight / Crusader",
    accent: "#e05d44",
    class1: [
      { id: "sw-bash", label: "Bash", th: "ฟันหนัก", synth: "bash" },
      { id: "sw-magnum", label: "Magnum Break", th: "ระเบิดไฟรอบตัว", synth: "explosion" },
      { id: "sw-provoke", label: "Provoke", th: "ยั่วยุ", synth: "provoke" },
      { id: "sw-endure", label: "Endure", th: "อดทน", synth: "endure" },
    ],
    class2Skills: [
      { id: "sw-bowling", label: "Bowling Bash", th: "ฟันกระเด็น", synth: "heavy-hit" },
      { id: "sw-brandish", label: "Brandish Spear", th: "กวาดหอก", synth: "multi-slash" },
      { id: "sw-grandcross", label: "Grand Cross", th: "กางเขนศักดิ์สิทธิ์", synth: "holy" },
      { id: "sw-battlechant", label: "Battle Chant", th: "บทสวดสงคราม", file: "BattleChant.wav", synth: "holy" },
    ],
  },
  {
    id: "thief",
    name: "Thief",
    th: "โจร",
    class2: "Assassin / Rogue",
    accent: "#8e6bd8",
    class1: [
      { id: "th-double", label: "Double Attack", th: "แทงสองครั้ง", synth: "double-slash" },
      { id: "th-envenom", label: "Envenom", th: "อาบยาพิษ", synth: "poison" },
      { id: "th-hiding", label: "Hiding", th: "ซ่อนตัว", synth: "stealth" },
      { id: "th-steal", label: "Steal", th: "ขโมยของ", synth: "coins" },
    ],
    class2Skills: [
      { id: "th-sonic", label: "Sonic Blow", th: "ฟันรัว", synth: "multi-slash" },
      { id: "th-grimtooth", label: "Grimtooth", th: "เขี้ยวมรณะ", synth: "slash" },
      { id: "th-backstab", label: "Back Stab", th: "แทงข้างหลัง", synth: "crit" },
    ],
  },
  {
    id: "mage",
    name: "Mage",
    th: "นักเวทย์",
    class2: "Wizard / Sage",
    accent: "#4a8fe7",
    class1: [
      { id: "mg-firebolt", label: "Fire Bolt", th: "ลูกไฟ", synth: "fire" },
      { id: "mg-coldbolt", label: "Cold Bolt", th: "ลูกน้ำแข็ง", synth: "cold" },
      { id: "mg-lightning", label: "Lightning Bolt", th: "สายฟ้า", synth: "lightning" },
      { id: "mg-napalm", label: "Napalm Beat", th: "พลังจิต", synth: "ghost" },
      { id: "mg-soulstrike", label: "Soul Strike", th: "วิญญาณโจมตี", synth: "soul" },
      { id: "mg-firewall", label: "Fire Wall", th: "กำแพงไฟ", synth: "wall" },
      { id: "mg-frostdiver", label: "Frost Diver", th: "แช่แข็ง", synth: "freeze" },
    ],
    class2Skills: [
      { id: "mg-stormgust", label: "Storm Gust", th: "พายุหิมะ", synth: "storm" },
      { id: "mg-meteor", label: "Meteor Storm", th: "อุกกาบาต", synth: "meteor" },
      { id: "mg-lov", label: "Lord of Vermilion", th: "สายฟ้าฟาด", synth: "lightning" },
      { id: "mg-jupitel", label: "Jupitel Thunder", th: "ลูกบอลสายฟ้า", synth: "soul" },
    ],
  },
  {
    id: "acolyte",
    name: "Acolyte",
    th: "ผู้ช่วยนักบวช",
    class2: "Priest / Monk",
    accent: "#e8c35a",
    class1: [
      { id: "ac-heal", label: "Heal", th: "ฮีล", file: "Heal.wav", synth: "chime-up" },
      { id: "ac-blessing", label: "Blessing", th: "อวยพร", file: "Blessing.wav", synth: "chime-up" },
      { id: "ac-agi", label: "Increase AGI", th: "เพิ่มความเร็ว", synth: "chime-up" },
      { id: "ac-cure", label: "Cure", th: "รักษาสถานะ", file: "Cure.wav", synth: "chime-up" },
      { id: "ac-holylight", label: "Holy Light", th: "แสงศักดิ์สิทธิ์", synth: "holy" },
      { id: "ac-pneuma", label: "Pneuma", th: "กันธนู", synth: "wind" },
      { id: "ac-teleport", label: "Teleport", th: "เทเลพอร์ต", synth: "warp" },
    ],
    class2Skills: [
      { id: "ac-sanctuary", label: "Sanctuary", th: "เขตศักดิ์สิทธิ์", file: "Sanctuary.wav", synth: "holy" },
      { id: "ac-kyrie", label: "Kyrie Eleison", th: "โล่ป้องกัน", file: "KyrieEleison.wav", synth: "endure" },
      { id: "ac-magnificat", label: "Magnificat", th: "ฟื้น SP", file: "Magnificat.wav", synth: "chime-up" },
      { id: "ac-gloria", label: "Gloria", th: "เพิ่มโชค", file: "Gloria.wav", synth: "chime-up" },
      { id: "ac-lex", label: "Lex Aeterna", th: "ดาเมจสองเท่า", file: "LexAeterna.wav", synth: "holy" },
      { id: "ac-aspersio", label: "Aspersio", th: "อาวุธธาตุศักดิ์สิทธิ์", file: "Aspersio.wav", synth: "holy" },
      { id: "ac-bss", label: "B.S. Sacramenti", th: "เกราะศักดิ์สิทธิ์", file: "BSS.wav", synth: "holy" },
      { id: "ac-impositio", label: "Impositio Manus", th: "เพิ่มพลังโจมตี", file: "Impositio.wav", synth: "chime-up" },
      { id: "ac-recovery", label: "Status Recovery", th: "ล้างสถานะ", file: "StatusRecovery.wav", synth: "chime-up" },
      { id: "ac-resurrection", label: "Resurrection", th: "ชุบชีวิต", file: "Resurrection.wav", synth: "respawn" },
      { id: "ac-magnus", label: "Magnus Exorcismus", th: "ขับไล่ปีศาจ", file: "MagnusExorcismus.wav", synth: "holy" },
      { id: "ac-assumptio", label: "Assumptio", th: "พรแห่งสวรรค์", file: "Assumptio.wav", synth: "holy" },
    ],
  },
  {
    id: "archer",
    name: "Archer",
    th: "นักธนู",
    class2: "Hunter / Bard / Dancer",
    accent: "#5fb85a",
    class1: [
      { id: "ar-double", label: "Double Strafe", th: "ยิงสองดอก", synth: "double-arrow" },
      { id: "ar-shower", label: "Arrow Shower", th: "ฝนธนู", synth: "arrow-rain" },
      { id: "ar-concentration", label: "Improve Concentration", th: "เพิ่มสมาธิ", synth: "focus" },
      { id: "ar-charge", label: "Charge Arrow", th: "ธนูผลักกระเด็น", synth: "arrow" },
    ],
    class2Skills: [
      { id: "ar-blitz", label: "Blitz Beat", th: "เหยี่ยวโจมตี", synth: "falcon" },
      { id: "ar-snare", label: "Ankle Snare", th: "กับดักตรึง", synth: "trap" },
      { id: "ar-riff", label: "Impressive Riff", th: "เพลงบาร์ด", file: "BD/ImpressiveRiff.wav", synth: "chime-up" },
      { id: "ar-strings", label: "Magic Strings", th: "เพลงบาร์ด", file: "BD/MagicStrings.wav", synth: "chime-up" },
      { id: "ar-lutie", label: "Song of Lutie", th: "เพลงบาร์ด", file: "BD/SongofLutie.wav", synth: "chime-up" },
      { id: "ar-ladyluck", label: "Lady Luck", th: "ท่าเต้น", file: "BD/LadyLuck.wav", synth: "chime-up" },
      { id: "ar-gypsy", label: "Gypsy's Kiss", th: "ท่าเต้น", file: "BD/GypsysKiss.wav", synth: "chime-up" },
      { id: "ar-slowgrace", label: "Slow Grace", th: "ท่าเต้น", file: "BD/SlowGrace.wav", synth: "chime-up" },
    ],
  },
  {
    id: "merchant",
    name: "Merchant",
    th: "พ่อค้า",
    class2: "Blacksmith / Alchemist",
    accent: "#d98b3a",
    class1: [
      { id: "mc-mammonite", label: "Mammonite", th: "ทุ่มเงินตี", synth: "coins" },
      { id: "mc-cartrev", label: "Cart Revolution", th: "เหวี่ยงรถเข็น", synth: "cart" },
      { id: "mc-loud", label: "Loud Exclamation", th: "ตะโกนเพิ่มพลัง", synth: "shout" },
    ],
    class2Skills: [
      { id: "mc-adrenaline", label: "Adrenaline Rush", th: "เร่งความเร็วโจมตี", file: "AdrenalineRush.wav", synth: "shout" },
      { id: "mc-hammerfall", label: "Hammer Fall", th: "ทุบพื้นสตั้น", synth: "hammer" },
      { id: "mc-acid", label: "Acid Terror", th: "ขวดกรด", synth: "poison" },
    ],
  },
];

export type EventGroup = { id: string; name: string; th: string; sounds: SoundDef[] };

export const EVENT_GROUPS: EventGroup[] = [
  {
    id: "combat",
    name: "Combat",
    th: "การต่อสู้",
    sounds: [
      { id: "ev-attack", label: "Basic Attack", th: "โจมตีปกติ", synth: "slash" },
      { id: "ev-ranged", label: "Ranged Attack", th: "โจมตีระยะไกล", synth: "arrow" },
      { id: "ev-move", label: "Basic Move", th: "เดิน 2 ช่อง", synth: "footsteps" },
      { id: "ev-hit", label: "Take Damage", th: "โดนโจมตี", synth: "hit" },
      { id: "ev-crit", label: "Critical", th: "คริติคอล", synth: "crit" },
      { id: "ev-miss", label: "Miss", th: "พลาด", synth: "miss" },
      { id: "ev-knockback", label: "Knockback", th: "กระเด็น", synth: "heavy-hit" },
      { id: "ev-heal", label: "Heal", th: "ฟื้น HP", file: "Heal.wav", synth: "chime-up" },
    ],
  },
  {
    id: "progress",
    name: "Progression",
    th: "เลเวล & สกิล",
    sounds: [
      { id: "ev-levelup", label: "Level Up", th: "เลเวลอัพ", synth: "levelup" },
      { id: "ev-skillup", label: "Skill Up", th: "อัพสกิล", synth: "skillup" },
      { id: "ev-jobchange", label: "Class Change", th: "เปลี่ยนอาชีพ", synth: "jobchange" },
    ],
  },
  {
    id: "items",
    name: "Cards, Dice & Items",
    th: "การ์ด ลูกเต๋า ไอเทม",
    sounds: [
      { id: "ev-dice", label: "Roll Dice", th: "ทอยลูกเต๋า", synth: "dice" },
      { id: "ev-draw", label: "Draw Card", th: "จั่วการ์ด", synth: "card" },
      { id: "ev-cooldown", label: "Cooldown Shift", th: "เลื่อน CD", synth: "tick" },
      { id: "ev-potion", label: "Use Item", th: "ใช้ไอเทม", synth: "potion" },
      { id: "ev-drop", label: "Item Drop", th: "ของดรอป", synth: "drop" },
      { id: "ev-unique", label: "Unique Drop", th: "ดรอปของหายาก", synth: "rare-drop" },
      { id: "ev-card", label: "Monster Card!", th: "ได้การ์ดมอนสเตอร์", synth: "jobchange" },
    ],
  },
  {
    id: "status",
    name: "Status Effects",
    th: "สถานะผิดปกติ",
    sounds: [
      { id: "st-blind", label: "Blind", th: "ตาบอด", synth: "blind" },
      { id: "st-curse", label: "Curse", th: "คำสาป", synth: "curse" },
      { id: "st-freeze", label: "Freeze", th: "แช่แข็ง", synth: "freeze" },
      { id: "st-immobilize", label: "Immobilize", th: "ขยับไม่ได้", synth: "immobilize" },
      { id: "st-poison", label: "Poison", th: "ติดพิษ", synth: "poison" },
      { id: "st-sleep", label: "Sleep", th: "หลับ", synth: "sleep" },
      { id: "st-stun", label: "Stun", th: "มึนงง", synth: "stun" },
    ],
  },
  {
    id: "scenario",
    name: "Scenario",
    th: "ฉาก & บอส",
    sounds: [
      { id: "ev-spawn", label: "Monster Spawn", th: "มอนเกิด", synth: "spawn" },
      { id: "ev-kill", label: "Monster Defeated", th: "กำจัดมอน", synth: "pop" },
      { id: "ev-mvp", label: "MVP Appears", th: "บอสปรากฏ", synth: "mvp" },
      { id: "ev-death", label: "Character Dies", th: "ตัวละครตาย", synth: "death" },
      { id: "ev-respawn", label: "Respawn", th: "เกิดใหม่", synth: "respawn" },
      { id: "ev-victory", label: "Scenario Won", th: "ชนะฉาก", synth: "victory" },
      { id: "ev-defeat", label: "Scenario Lost", th: "แพ้ฉาก", synth: "defeat" },
    ],
  },
];

export const ALL_SOUND_FILES: string[] = Array.from(
  new Set(
    [...CLASSES.flatMap((c) => [...c.class1, ...c.class2Skills]), ...EVENT_GROUPS.flatMap((g) => g.sounds)]
      .map((s) => s.file)
      .filter((f): f is string => Boolean(f)),
  ),
);

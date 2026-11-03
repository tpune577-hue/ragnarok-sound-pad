import type { SynthId } from "../lib/audio/synth-ids";

export const SFX_REMOTE_BASE = "https://mirror.irowiki.org/ragnarok/effects/";

export type SoundDef = {
  /** Also the file name for a drop-in sound pack: public/audio/pack/<id>.mp3|wav|ogg */
  id: string;
  label: string;
  th?: string;
  icon: string;
  /** Path relative to SFX_REMOTE_BASE; downloaded to /audio/sfx/<basename>. */
  file?: string;
  synth: SynthId;
};

export type PadGroup = { id: string; name: string; th: string; sounds: SoundDef[] };

export type ClassId = "swordsman" | "thief" | "mage" | "acolyte" | "archer" | "merchant";

export type ClassBoard = {
  id: ClassId;
  name: string;
  th: string;
  icon: string;
  class2: string;
  accent: string;
  class1: SoundDef[];
  class2Skills: SoundDef[];
};

export const sfxUrl = (file: string) => `/audio/sfx/${file.split("/").pop()}`;

export const COMMON_GROUPS: PadGroup[] = [
  {
    id: "quick",
    name: "Quick",
    th: "ใช้บ่อย",
    sounds: [
      { id: "level-up", label: "Level Up", th: "เลเวลอัพ", icon: "⬆️", synth: "levelup" },
      { id: "mvp", label: "MVP", th: "บอสปรากฏ / ล้มบอส", icon: "👑", synth: "mvp" },
      { id: "attack", label: "Attack", th: "โจมตีปกติ", icon: "⚔️", synth: "slash" },
      { id: "hit", label: "Take Damage", th: "โดนโจมตี", icon: "💥", synth: "hit" },
      { id: "hp-recovery", label: "HP Recovery", th: "ฟื้น HP / ใช้ยา", icon: "🧪", synth: "potion" },
      { id: "critical", label: "Critical", th: "คริติคอล", icon: "✴️", synth: "crit" },
      { id: "monster-kill", label: "Monster Down", th: "กำจัดมอนสเตอร์", icon: "💫", synth: "pop" },
      { id: "death", label: "Character Dies", th: "ตัวละครตาย", icon: "💀", synth: "death" },
    ],
  },
  {
    id: "table",
    name: "Table",
    th: "บนโต๊ะ",
    sounds: [
      { id: "login", label: "Game Start", th: "เริ่มเกม", icon: "🚪", synth: "warp" },
      { id: "dice", label: "Roll Dice", th: "ทอยลูกเต๋า", icon: "🎲", synth: "dice" },
      { id: "draw-card", label: "Draw Card", th: "จั่วการ์ด", icon: "🃏", synth: "card" },
      { id: "cooldown", label: "Cooldown", th: "เลื่อน CD", icon: "⏳", synth: "tick" },
      { id: "move", label: "Move", th: "เดิน", icon: "👣", synth: "footsteps" },
      { id: "item-drop", label: "Item Drop", th: "ของดรอป", icon: "🎁", synth: "drop" },
      { id: "refine-success", label: "Refine Success", th: "ตีบวกผ่าน / Unique Drop", icon: "✨", synth: "rare-drop" },
      { id: "refine-fail", label: "Refine Failed", th: "ตีบวกแตก", icon: "💔", synth: "refine-fail" },
      { id: "spawn", label: "Spawn", th: "มอนเกิด", icon: "🌀", synth: "spawn" },
      { id: "respawn", label: "Respawn", th: "เกิดใหม่", icon: "🕊️", synth: "respawn" },
      { id: "victory", label: "Victory", th: "ชนะฉาก", icon: "🏆", synth: "victory" },
      { id: "defeat", label: "Defeat", th: "แพ้ฉาก", icon: "🏳️", synth: "defeat" },
    ],
  },
  {
    id: "status",
    name: "Status",
    th: "สถานะผิดปกติ",
    sounds: [
      { id: "blind", label: "Blind", th: "ตาบอด", icon: "🕶️", synth: "blind" },
      { id: "curse", label: "Curse", th: "คำสาป", icon: "🩸", synth: "curse" },
      { id: "frozen", label: "Freeze", th: "แช่แข็ง", icon: "🧊", synth: "freeze" },
      { id: "immobilize", label: "Immobilize", th: "ขยับไม่ได้", icon: "⛓️", synth: "immobilize" },
      { id: "poison", label: "Poison", th: "ติดพิษ", icon: "☠️", synth: "poison" },
      { id: "sleep", label: "Sleep", th: "หลับ", icon: "💤", synth: "sleep" },
      { id: "stun", label: "Stun", th: "มึนงง", icon: "💫", synth: "stun" },
      { id: "stone-curse", label: "Stone Curse", th: "กลายเป็นหิน", icon: "🪨", synth: "stone" },
    ],
  },
];

export const CLASSES: ClassBoard[] = [
  {
    id: "swordsman",
    name: "Swordsman",
    th: "นักดาบ",
    icon: "🗡️",
    class2: "Knight",
    accent: "#e05d44",
    class1: [
      { id: "bash", label: "Bash", th: "ฟันหนัก", icon: "🗡️", synth: "bash" },
      { id: "magnum-break", label: "Magnum Break", th: "ระเบิดไฟรอบตัว", icon: "🔥", synth: "explosion" },
      { id: "provoke", label: "Provoke", th: "ยั่วยุ", icon: "😤", synth: "provoke" },
      { id: "endure", label: "Endure", th: "อดทน", icon: "🛡️", synth: "endure" },
    ],
    class2Skills: [
      { id: "counter-attack", label: "Counter Attack", th: "สวนกลับ", icon: "↩️", synth: "crit" },
      { id: "twohand-quicken", label: "Two-Hand Quicken", th: "เร่งความเร็ว", icon: "⚡", synth: "shout" },
      { id: "bowling-bash", label: "Bowling Bash", th: "ฟันกระเด็น", icon: "🎳", synth: "heavy-hit" },
      { id: "battle-chant", label: "Battle Chant", th: "บทสวดสงคราม", icon: "📯", file: "BattleChant.wav", synth: "holy" },
    ],
  },
  {
    id: "thief",
    name: "Thief",
    th: "โจร",
    icon: "🥷",
    class2: "Assassin",
    accent: "#8e6bd8",
    class1: [
      { id: "double-attack", label: "Double Attack", th: "แทงสองครั้ง", icon: "✌️", synth: "double-slash" },
      { id: "enchant-poison", label: "Envenom", th: "อาบยาพิษ", icon: "🧪", synth: "poison" },
      { id: "hiding", label: "Hiding", th: "ซ่อนตัว", icon: "🫥", synth: "stealth" },
      { id: "steal", label: "Steal", th: "ขโมยของ", icon: "💰", synth: "coins" },
    ],
    class2Skills: [
      { id: "sonic-blow", label: "Sonic Blow", th: "ฟันรัว", icon: "🌪️", synth: "multi-slash" },
      { id: "grimtooth", label: "Grimtooth", th: "เขี้ยวมรณะ", icon: "🦷", synth: "slash" },
    ],
  },
  {
    id: "mage",
    name: "Mage",
    th: "นักเวทย์",
    icon: "🪄",
    class2: "Wizard",
    accent: "#4a8fe7",
    class1: [
      { id: "beginspell", label: "Casting", th: "ร่ายเวทย์", icon: "🔮", synth: "focus" },
      { id: "fireball", label: "Fire Ball", th: "ลูกไฟ", icon: "🔥", synth: "fire" },
      { id: "frost-diver", label: "Frost Diver", th: "แช่แข็ง", icon: "❄️", synth: "cold" },
      { id: "thunder-storm", label: "Thunder Storm", th: "พายุสายฟ้า", icon: "⚡", synth: "lightning" },
      { id: "soul-strike", label: "Soul Strike", th: "วิญญาณโจมตี", icon: "👻", synth: "soul" },
      { id: "firewall", label: "Fire Wall", th: "กำแพงไฟ", icon: "🧱", synth: "wall" },
      { id: "safety-wall", label: "Safety Wall", th: "กำแพงป้องกัน", icon: "🛡️", synth: "endure" },
      { id: "sight", label: "Sight", th: "ส่องหา", icon: "👁️", synth: "chime-up" },
    ],
    class2Skills: [
      { id: "storm-gust", label: "Storm Gust", th: "พายุหิมะ", icon: "🌨️", synth: "storm" },
      { id: "meteor-storm", label: "Meteor Storm", th: "อุกกาบาต", icon: "☄️", synth: "meteor" },
      { id: "earth-spike", label: "Earth Spike", th: "หนามดิน", icon: "⛰️", synth: "heavy-hit" },
      { id: "fire-pillar", label: "Fire Pillar", th: "เสาไฟ", icon: "🔥", synth: "fire" },
      { id: "ice-wall", label: "Ice Wall", th: "กำแพงน้ำแข็ง", icon: "🧊", synth: "freeze" },
      { id: "water-ball", label: "Water Ball", th: "ลูกน้ำ", icon: "💧", synth: "potion" },
      { id: "quagmire", label: "Quagmire", th: "หล่มโคลน", icon: "🟫", synth: "poison" },
      { id: "sightrasher", label: "Sightrasher", th: "ระเบิดไฟวงกว้าง", icon: "💥", synth: "explosion" },
    ],
  },
  {
    id: "acolyte",
    name: "Acolyte",
    th: "อโคไลท์",
    icon: "✝️",
    class2: "Priest",
    accent: "#e8c35a",
    class1: [
      { id: "heal", label: "Heal", th: "ฮีล", icon: "💚", file: "Heal.wav", synth: "chime-up" },
      { id: "blessing", label: "Blessing", th: "อวยพร", icon: "🙏", file: "Blessing.wav", synth: "chime-up" },
      { id: "increase-agi", label: "Increase AGI", th: "เพิ่มความเร็ว", icon: "👟", synth: "chime-up" },
      { id: "decrease-agi", label: "Decrease AGI", th: "ลดความเร็ว", icon: "🐌", synth: "sleep" },
      { id: "cure", label: "Cure", th: "รักษาสถานะ", icon: "🩹", file: "Cure.wav", synth: "chime-up" },
      { id: "angelus", label: "Angelus", th: "เพิ่มเกราะ", icon: "😇", synth: "holy" },
      { id: "signum-crucis", label: "Signum Crucis", th: "ลดเกราะอันเดด", icon: "✝️", synth: "holy" },
      { id: "teleport", label: "Teleport", th: "เทเลพอร์ต", icon: "🌀", synth: "warp" },
      { id: "warp-portal", label: "Warp Portal", th: "ประตูวาร์ป", icon: "🌌", synth: "warp" },
      { id: "aqua-benedicta", label: "Aqua Benedicta", th: "น้ำมนต์", icon: "💧", synth: "potion" },
    ],
    class2Skills: [
      { id: "sanctuary", label: "Sanctuary", th: "เขตศักดิ์สิทธิ์", icon: "⛪", file: "Sanctuary.wav", synth: "holy" },
      { id: "kyrie-eleison", label: "Kyrie Eleison", th: "โล่ป้องกัน", icon: "🛡️", file: "KyrieEleison.wav", synth: "endure" },
      { id: "magnificat", label: "Magnificat", th: "ฟื้น SP", icon: "🎶", file: "Magnificat.wav", synth: "chime-up" },
      { id: "gloria", label: "Gloria", th: "เพิ่มโชค", icon: "🍀", file: "Gloria.wav", synth: "chime-up" },
      { id: "lex-aeterna", label: "Lex Aeterna", th: "ดาเมจสองเท่า", icon: "📜", file: "LexAeterna.wav", synth: "holy" },
      { id: "aspersio", label: "Aspersio", th: "อาวุธศักดิ์สิทธิ์", icon: "💦", file: "Aspersio.wav", synth: "holy" },
      { id: "bs-sacramenti", label: "B.S. Sacramenti", th: "เกราะศักดิ์สิทธิ์", icon: "🔰", file: "BSS.wav", synth: "holy" },
      { id: "impositio-manus", label: "Impositio Manus", th: "เพิ่มพลังโจมตี", icon: "✋", file: "Impositio.wav", synth: "chime-up" },
      { id: "suffragium", label: "Suffragium", th: "ร่ายเร็วขึ้น", icon: "📿", synth: "chime-up" },
      { id: "recovery", label: "Recovery", th: "ล้างสถานะ", icon: "🌿", file: "StatusRecovery.wav", synth: "chime-up" },
      { id: "slow-poison", label: "Slow Poison", th: "ชะลอพิษ", icon: "🧴", synth: "poison" },
      { id: "resurrection", label: "Resurrection", th: "ชุบชีวิต", icon: "🕊️", file: "Resurrection.wav", synth: "respawn" },
      { id: "magnus-exorcismus", label: "Magnus Exorcismus", th: "ขับไล่ปีศาจ", icon: "🌟", file: "MagnusExorcismus.wav", synth: "holy" },
    ],
  },
  {
    id: "archer",
    name: "Archer",
    th: "นักธนู",
    icon: "🏹",
    class2: "Hunter / Bard / Dancer",
    accent: "#5fb85a",
    class1: [
      { id: "double-strafe", label: "Double Strafe", th: "ยิงสองดอก", icon: "🏹", synth: "double-arrow" },
      { id: "arrow-shower", label: "Arrow Shower", th: "ฝนธนู", icon: "🌧️", synth: "arrow-rain" },
      { id: "improve-concentration", label: "Concentration", th: "เพิ่มสมาธิ", icon: "🎯", synth: "focus" },
      { id: "charge-arrow", label: "Charge Arrow", th: "ธนูผลักกระเด็น", icon: "➡️", synth: "arrow" },
    ],
    class2Skills: [
      { id: "blitz-beat", label: "Blitz Beat", th: "เหยี่ยวโจมตี", icon: "🦅", synth: "falcon" },
      { id: "detect", label: "Detect", th: "เหยี่ยวค้นหา", icon: "🔍", synth: "falcon" },
      { id: "ankle-snare", label: "Ankle Snare", th: "กับดักตรึง", icon: "🪤", synth: "trap" },
      { id: "land-mine", label: "Land Mine", th: "กับดักระเบิด", icon: "💣", synth: "explosion" },
      { id: "freezing-trap", label: "Freezing Trap", th: "กับดักน้ำแข็ง", icon: "🧊", synth: "freeze" },
      { id: "sandman", label: "Sandman", th: "กับดักหลับ", icon: "😴", synth: "sleep" },
      { id: "flasher", label: "Flasher", th: "กับดักแสง", icon: "📸", synth: "blind" },
      { id: "impressive-riff", label: "Bard Song", th: "เพลงบาร์ด", icon: "🎸", file: "BD/ImpressiveRiff.wav", synth: "chime-up" },
      { id: "lady-luck", label: "Dancer Song", th: "ท่าเต้น", icon: "💃", file: "BD/LadyLuck.wav", synth: "chime-up" },
      { id: "lullaby", label: "Lullaby", th: "เพลงกล่อมหลับ", icon: "🎵", file: "BD/Lullaby.wav", synth: "sleep" },
    ],
  },
  {
    id: "merchant",
    name: "Merchant",
    th: "พ่อค้า",
    icon: "💰",
    class2: "Blacksmith",
    accent: "#d98b3a",
    class1: [
      { id: "mammonite", label: "Mammonite", th: "ทุ่มเงินตี", icon: "💰", synth: "coins" },
      { id: "cart-revolution", label: "Cart Revolution", th: "เหวี่ยงรถเข็น", icon: "🛒", synth: "cart" },
      { id: "crazy-uproar", label: "Crazy Uproar", th: "ตะโกนเพิ่มพลัง", icon: "📢", synth: "shout" },
    ],
    class2Skills: [
      { id: "adrenaline-rush", label: "Adrenaline Rush", th: "เร่งโจมตี", icon: "💢", file: "AdrenalineRush.wav", synth: "shout" },
      { id: "over-thrust", label: "Over Thrust", th: "เพิ่มพลังโจมตี", icon: "💪", synth: "shout" },
      { id: "weapon-perfection", label: "Weapon Perfection", th: "อาวุธสมบูรณ์", icon: "⚒️", synth: "endure" },
      { id: "maximize-power", label: "Maximize Power", th: "พลังสูงสุด", icon: "🔝", synth: "focus" },
      { id: "hammer-fall", label: "Hammer Fall", th: "ทุบพื้นสตั้น", icon: "🔨", synth: "hammer" },
      { id: "greed", label: "Greed", th: "เก็บของรอบตัว", icon: "🤑", synth: "coins" },
      { id: "weapon-repair", label: "Weapon Repair", th: "ซ่อมอาวุธ", icon: "🔧", synth: "tick" },
    ],
  },
];

export const ALL_SOUNDS: SoundDef[] = [
  ...COMMON_GROUPS.flatMap((g) => g.sounds),
  ...CLASSES.flatMap((c) => [...c.class1, ...c.class2Skills]),
];

export const ALL_SOUND_FILES: string[] = Array.from(
  new Set(ALL_SOUNDS.map((s) => s.file).filter((f): f is string => Boolean(f))),
);

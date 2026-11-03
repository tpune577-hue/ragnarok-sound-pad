import type { SynthId } from "../lib/audio/synth-ids";

export const SFX_REMOTE_BASE = "https://mirror.irowiki.org/ragnarok/effects/";

export type SoundDef = {
  /** Also the file name in public/audio/pack/<id>.wav */
  id: string;
  label: string;
  th?: string;
  /** Path to real RO / boardgame icon under /icons/... */
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
  class2Icon: string;
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
      { id: "level-up", label: "Level Up", th: "เลเวลอัพ", icon: "/icons/items/angel-wing.png", synth: "levelup" },
      { id: "mvp", label: "MVP", th: "บอสปรากฏ / ล้มบอส", icon: "/icons/boardgame/mvp.gif", synth: "mvp" },
      { id: "attack", label: "Sword Hit", th: "โจมตีด้วยดาบ", icon: "/icons/items/sword.png", synth: "slash" },
      { id: "hit", label: "Take Damage", th: "โดนโจมตี", icon: "/icons/boardgame/dice-0.png", synth: "hit" },
      { id: "hp-recovery", label: "HP Recovery", th: "ฟื้น HP / ปั๊มยา", icon: "/icons/items/red-potion.png", synth: "potion" },
      { id: "critical", label: "Critical", th: "คริติคอล", icon: "/icons/skills/critical-explosion.png", synth: "crit" },
      { id: "critical-aspd", label: "Critical ASPD 190", th: "ตีรัวคริติคอล", icon: "/icons/items/awakening-potion.png", synth: "multi-slash" },
      { id: "arrow-hit", label: "Arrow Hit", th: "ยิงธนูโดน", icon: "/icons/items/bow.png", synth: "arrow" },
      { id: "dagger-hit", label: "Dagger Hit", th: "แทงมีดสั้น", icon: "/icons/items/dagger.png", synth: "double-slash" },
      { id: "mace-hit", label: "Mace Hit", th: "ทุบกระบอง", icon: "/icons/items/mace.png", synth: "bash" },
      { id: "spear-hit", label: "Spear Hit", th: "แทงหอก", icon: "/icons/items/spear.png", synth: "heavy-hit" },
    ],
  },
  {
    id: "table",
    name: "Table",
    th: "บนโต๊ะ",
    sounds: [
      { id: "login", label: "Enter Game", th: "เข้าสู่ระบบ / เริ่มฉาก", icon: "/icons/items/emperium.png", synth: "warp" },
      { id: "refine-success", label: "Refine Success", th: "ตีบวกติด / Unique Drop", icon: "/icons/items/oridecon.png", synth: "rare-drop" },
      { id: "refine-fail", label: "Refine Failed", th: "ตีบวกแตก / ล้มเหลว", icon: "/icons/items/elunium.png", synth: "refine-fail" },
      { id: "pharmacy-success", label: "Craft Success", th: "ปรุงยาสำเร็จ / ได้ไอเทม", icon: "/icons/items/white-potion.png", synth: "chime-up" },
      { id: "pharmacy-fail", label: "Craft Failed", th: "ปรุงยาล้มเหลว", icon: "/icons/items/poison-bottle.png", synth: "refine-fail" },
      { id: "chat-room", label: "Quest / NPC", th: "คุยกับ NPC / เปิดห้อง", icon: "/icons/items/book.png", synth: "card" },
      { id: "prontera-birds", label: "Prontera Ambience", th: "เสียงบรรยากาศเมือง", icon: "/icons/items/butterfly-wing.png", synth: "wind" },
      { id: "steal-coin", label: "Zeny / Loot", th: "รับเงิน Zeny / ดรอปของ", icon: "/icons/items/zeny.png", synth: "coins" },
      { id: "teleport", label: "Fly Wing", th: "วาร์ปหนี / ย้ายช่อง", icon: "/icons/items/fly-wing.png", synth: "warp" },
      { id: "resurrection", label: "Yggdrasil Leaf", th: "ชุบชีวิตตัวละคร", icon: "/icons/items/yggdrasil-leaf.png", file: "Resurrection.wav", synth: "respawn" },
    ],
  },
  {
    id: "status",
    name: "Status",
    th: "สถานะผิดปกติ",
    sounds: [
      { id: "blind", label: "Blind", th: "ตาบอด (ห้ามยิงไกล)", icon: "/icons/boardgame/status-blind.png", synth: "blind" },
      { id: "curse", label: "Curse", th: "คำสาป (ดาเมจเหลือ 1)", icon: "/icons/boardgame/status-curse.png", synth: "curse" },
      { id: "frozen", label: "Freeze", th: "แช่แข็ง (ธาตุน้ำ)", icon: "/icons/boardgame/status-frozen.png", synth: "freeze" },
      { id: "immobilize", label: "Immobilize", th: "ขยับไม่ได้", icon: "/icons/boardgame/status-immobilize.png", synth: "immobilize" },
      { id: "poison", label: "Poison", th: "ติดพิษ (-1 HP ต้นเทิร์น)", icon: "/icons/boardgame/status-poison.png", synth: "poison" },
      { id: "sleep", label: "Sleep", th: "หลับ (ห้ามใช้สกิล)", icon: "/icons/boardgame/status-sleep.png", synth: "sleep" },
      { id: "stun", label: "Stun", th: "มึนงง (ห้ามใช้ Action)", icon: "/icons/boardgame/status-stun.png", synth: "stun" },
      { id: "silence", label: "Silence", th: "ใบ้ (ห้ามร่ายเวทย์)", icon: "/icons/skills/lex-divina.png", synth: "blind" },
      { id: "stone-curse", label: "Stone Curse", th: "สาปหิน", icon: "/icons/skills/stone-curse-skill.png", synth: "stone" },
      { id: "stone-explosion", label: "Stone Break", th: "หินแตกกระจาย", icon: "/icons/items/red-gemstone.png", synth: "explosion" },
    ],
  },
];

export const CLASSES: ClassBoard[] = [
  {
    id: "swordsman",
    name: "Swordsman",
    th: "นักดาบ",
    icon: "/icons/jobs/swordsman.png",
    class2: "Knight / Crusader",
    class2Icon: "/icons/jobs/knight.png",
    accent: "#e05d44",
    class1: [
      { id: "bash", label: "Bash", th: "ฟันหนัก", icon: "/icons/skills/bash.png", synth: "bash" },
      { id: "magnum-break", label: "Magnum Break", th: "ระเบิดไฟรอบตัว", icon: "/icons/skills/magnum-break.png", synth: "explosion" },
      { id: "provoke", label: "Provoke", th: "ยั่วยุ", icon: "/icons/skills/provoke.png", synth: "provoke" },
      { id: "endure", label: "Endure", th: "อดทน", icon: "/icons/skills/endure.png", synth: "endure" },
    ],
    class2Skills: [
      { id: "counter-attack", label: "Counter Attack", th: "สวนกลับ", icon: "/icons/skills/counter-attack.png", synth: "crit" },
      { id: "twohand-quicken", label: "Two-Hand Quicken", th: "เร่งดาบสองมือ", icon: "/icons/skills/twohand-quicken.png", synth: "shout" },
      { id: "spiral-pierce", label: "Spiral Pierce", th: "แทงหอกเกลียว", icon: "/icons/skills/spiral-pierce.png", synth: "heavy-hit" },
      { id: "aura-blade", label: "Aura Blade", th: "ออร่าดาบ", icon: "/icons/skills/aura-blade.png", synth: "slash" },
      { id: "parry", label: "Parry", th: "ปัดป้องด้วยดาบ", icon: "/icons/skills/parry.png", synth: "endure" },
      { id: "concentration", label: "Concentration", th: "ตั้งสมาธิเพิ่มโจมตี", icon: "/icons/skills/concentration.png", synth: "focus" },
      { id: "berserk", label: "Berserk", th: "คลั่งโจมตีสุดตัว", icon: "/icons/skills/berserk.png", synth: "shout" },
      { id: "joint-beat", label: "Joint Beat", th: "ตีข้อต่อ", icon: "/icons/skills/joint-beat.png", synth: "bash" },
      { id: "head-crush", label: "Head Crush", th: "ตีหัวเลือดไหล", icon: "/icons/skills/head-crush.png", synth: "heavy-hit" },
      { id: "holy-cross", label: "Holy Cross", th: "กางเขนศักดิ์สิทธิ์", icon: "/icons/skills/holy-cross.png", synth: "holy" },
      { id: "grand-cross", label: "Grand Cross", th: "มหาเขนศักดิ์สิทธิ์", icon: "/icons/skills/grand-cross.png", synth: "holy" },
      { id: "shield-boomerang", label: "Shield Boomerang", th: "ปาโล่", icon: "/icons/skills/shield-boomerang.png", synth: "bash" },
      { id: "guard", label: "Auto Guard", th: "ยกโล่กัน", icon: "/icons/skills/guard.png", synth: "endure" },
      { id: "spear-quicken", label: "Spear Quicken", th: "เร่งหอก", icon: "/icons/skills/spear-quicken.png", synth: "shout" },
      { id: "pressure", label: "Pressure", th: "แรงกดดันสวรรค์", icon: "/icons/skills/pressure.png", synth: "heavy-hit" },
      { id: "battle-chant", label: "Battle Chant", th: "บทสวดสงคราม", icon: "/icons/skills/battle-chant.png", file: "BattleChant.wav", synth: "holy" },
    ],
  },
  {
    id: "thief",
    name: "Thief",
    th: "โจร",
    icon: "/icons/jobs/thief.png",
    class2: "Assassin / Rogue",
    class2Icon: "/icons/jobs/assassin.png",
    accent: "#8e6bd8",
    class1: [
      { id: "double-attack", label: "Double Attack", th: "ฟันสองครั้ง", icon: "/icons/skills/double-attack.png", synth: "double-slash" },
      { id: "enchant-poison", label: "Enchant Poison", th: "เคลือบพิษ", icon: "/icons/skills/enchant-poison.png", synth: "poison" },
      { id: "hiding", label: "Hiding", th: "มุดดินซ่อนตัว", icon: "/icons/skills/hiding.png", synth: "stealth" },
      { id: "steal", label: "Steal", th: "ขโมยไอเทม", icon: "/icons/skills/steal.png", synth: "coins" },
    ],
    class2Skills: [
      { id: "sonic-blow", label: "Sonic Blow", th: "ฟันรัว 8 จังหวะ", icon: "/icons/skills/sonic-blow.png", synth: "multi-slash" },
      { id: "grimtooth", label: "Grimtooth", th: "เขี้ยวมรณะจากใต้ดิน", icon: "/icons/skills/grimtooth.png", synth: "slash" },
      { id: "edp", label: "Deadly Poison", th: "เคลือบพิษสังหาร", icon: "/icons/skills/edp.png", synth: "poison" },
      { id: "soul-destroyer", label: "Soul Destroyer", th: "ทำลายวิญญาณ", icon: "/icons/skills/soul-destroyer.png", synth: "explosion" },
      { id: "meteor-assault", label: "Meteor Assault", th: "ฟาดคลื่นรอบตัว", icon: "/icons/skills/meteor-assault.png", synth: "heavy-hit" },
      { id: "back-stab", label: "Back Stab", th: "แทงข้างหลัง", icon: "/icons/skills/back-stab.png", synth: "crit" },
      { id: "steal-coin", label: "Mug / Steal Coin", th: "ปล้นเหรียญ", icon: "/icons/skills/steal-coin.png", synth: "coins" },
      { id: "intimidate", label: "Intimidate", th: "ขู่พาหนี", icon: "/icons/skills/intimidate.png", synth: "slash" },
      { id: "full-strip", label: "Full Strip", th: "ปลดอาวุธชุดเกราะ", icon: "/icons/skills/full-strip.png", synth: "stealth" },
      { id: "reject-sword", label: "Reject Sword", th: "สะท้อนคมดาบ", icon: "/icons/skills/reject-sword.png", synth: "crit" },
      { id: "preserve", label: "Preserve", th: "จำสกิล", icon: "/icons/skills/preserve.png", synth: "focus" },
    ],
  },
  {
    id: "mage",
    name: "Mage",
    th: "นักเวทย์",
    icon: "/icons/jobs/mage.png",
    class2: "Wizard / Sage",
    class2Icon: "/icons/jobs/wizard.png",
    accent: "#4a8fe7",
    class1: [
      { id: "beginspell", label: "Spell Casting", th: "เริ่มร่ายเวทย์", icon: "/icons/skills/amplify-magic.png", synth: "focus" },
      { id: "fireball", label: "Fire Ball", th: "ลูกไฟระเบิด", icon: "/icons/skills/fireball.png", synth: "fire" },
      { id: "firewall", label: "Fire Wall", th: "กำแพงไฟ", icon: "/icons/skills/firewall.png", synth: "wall" },
      { id: "frost-diver", label: "Frost Diver", th: "แช่แข็งเป้าหมาย", icon: "/icons/skills/frost-diver.png", synth: "cold" },
      { id: "thunder-storm", label: "Thunder Storm", th: "พายุสายฟ้า", icon: "/icons/skills/thunder-storm.png", synth: "lightning" },
      { id: "soul-strike", label: "Soul Strike", th: "ลูกแก้ววิญญาณ", icon: "/icons/skills/soul-strike.png", synth: "soul" },
      { id: "safety-wall", label: "Safety Wall", th: "ม่านป้องกันประชิด", icon: "/icons/skills/safety-wall.png", synth: "endure" },
      { id: "sight", label: "Sight", th: "ลูกไฟส่องตัวซ่อน", icon: "/icons/skills/sight.png", synth: "chime-up" },
    ],
    class2Skills: [
      { id: "storm-gust", label: "Storm Gust", th: "พายุหิมะ", icon: "/icons/skills/storm-gust.png", synth: "storm" },
      { id: "meteor-storm", label: "Meteor Storm", th: "ฝนดาวตก", icon: "/icons/skills/meteor-storm.png", synth: "meteor" },
      { id: "earth-spike", label: "Earth Spike", th: "หนามธรณี", icon: "/icons/skills/earth-spike.png", synth: "heavy-hit" },
      { id: "fire-pillar", label: "Fire Pillar", th: "เสาเพลิง", icon: "/icons/skills/fire-pillar.png", synth: "fire" },
      { id: "ice-wall", label: "Ice Wall", th: "กำแพงน้ำแข็ง", icon: "/icons/skills/ice-wall.png", synth: "freeze" },
      { id: "water-ball", label: "Water Ball", th: "กระสุนน้ำรัว", icon: "/icons/skills/water-ball.png", synth: "potion" },
      { id: "quagmire", label: "Quagmire", th: "บึงโคลนลดความเร็ว", icon: "/icons/skills/quagmire.png", synth: "poison" },
      { id: "sightrasher", label: "Sightrasher", th: "ระเบิดลูกไฟรอบทิศ", icon: "/icons/skills/sightrasher.png", synth: "explosion" },
      { id: "napalm-vulcan", label: "Napalm Vulcan", th: "ระเบิดพลังจิตต่อเนื่อง", icon: "/icons/skills/napalm-vulcan.png", synth: "ghost" },
      { id: "gravitation-field", label: "Gravitation Field", th: "สนามแรงโน้มถ่วง", icon: "/icons/skills/gravitation-field.png", synth: "soul" },
      { id: "ganbantein", label: "Ganbantein", th: "สลายเวทย์พื้น", icon: "/icons/skills/ganbantein.png", synth: "holy" },
      { id: "amplify-magic", label: "Amplify Magic", th: "เร่งพลังเวทย์", icon: "/icons/skills/amplify-magic.png", synth: "focus" },
      { id: "magic-rod", label: "Magic Rod", th: "ดูดซับเวทย์", icon: "/icons/skills/magic-rod.png", synth: "focus" },
      { id: "spell-breaker", label: "Spell Breaker", th: "ขัดจังหวะร่ายเวทย์", icon: "/icons/skills/spell-breaker.png", synth: "soul" },
      { id: "double-casting", label: "Double Casting", th: "ร่ายเวทย์ซ้อน", icon: "/icons/skills/double-casting.png", synth: "chime-up" },
      { id: "memorize", label: "Memorize", th: "จดจำบทเวทย์", icon: "/icons/skills/memorize.png", synth: "focus" },
    ],
  },
  {
    id: "acolyte",
    name: "Acolyte",
    th: "อโคไลท์",
    icon: "/icons/jobs/acolyte.png",
    class2: "Priest / Monk",
    class2Icon: "/icons/jobs/priest.png",
    accent: "#e8c35a",
    class1: [
      { id: "heal", label: "Heal", th: "ฟื้นฟู HP", icon: "/icons/skills/heal.png", file: "Heal.wav", synth: "chime-up" },
      { id: "blessing", label: "Blessing", th: "อวยพรเพิ่มสเตตัส", icon: "/icons/skills/blessing.png", file: "Blessing.wav", synth: "chime-up" },
      { id: "increase-agi", label: "Increase AGI", th: "เพิ่มความเร็ว", icon: "/icons/skills/increase-agi.png", synth: "chime-up" },
      { id: "decrease-agi", label: "Decrease AGI", th: "ลดความเร็วศัตรู", icon: "/icons/skills/decrease-agi.png", synth: "sleep" },
      { id: "cure", label: "Cure", th: "รักษาสถานะผิดปกติ", icon: "/icons/skills/cure.png", file: "Cure.wav", synth: "chime-up" },
      { id: "angelus", label: "Angelus", th: "เพิ่มพลังป้องกันปาร์ตี้", icon: "/icons/skills/angelus.png", synth: "holy" },
      { id: "signum-crucis", label: "Signum Crucis", th: "ลดเกราะผีดิบ/ปีศาจ", icon: "/icons/skills/signum-crucis.png", synth: "holy" },
      { id: "teleport", label: "Teleport", th: "เทเลพอร์ต", icon: "/icons/skills/teleport.png", synth: "warp" },
      { id: "warp-portal", label: "Warp Portal", th: "เปิดประตูมิติ", icon: "/icons/skills/warp-portal.png", synth: "warp" },
      { id: "aqua-benedicta", label: "Aqua Benedicta", th: "เสกน้ำมนต์", icon: "/icons/skills/aqua-benedicta.png", synth: "potion" },
    ],
    class2Skills: [
      { id: "sanctuary", label: "Sanctuary", th: "เขตศักดิ์สิทธิ์ฟื้น HP", icon: "/icons/skills/sanctuary.png", file: "Sanctuary.wav", synth: "holy" },
      { id: "kyrie-eleison", label: "Kyrie Eleison", th: "เกราะกันการโจมตี", icon: "/icons/skills/kyrie-eleison.png", file: "KyrieEleison.wav", synth: "endure" },
      { id: "magnificat", label: "Magnificat", th: "บทเพลงฟื้น SP", icon: "/icons/skills/magnificat.png", file: "Magnificat.wav", synth: "chime-up" },
      { id: "gloria", label: "Gloria", th: "สวดเพิ่ม LUK", icon: "/icons/skills/gloria.png", file: "Gloria.wav", synth: "chime-up" },
      { id: "lex-aeterna", label: "Lex Aeterna", th: "ดาเมจครั้งถัดไป ×2", icon: "/icons/skills/lex-aeterna.png", file: "LexAeterna.wav", synth: "holy" },
      { id: "aspersio", label: "Aspersio", th: "เคลือบอาวุธศักดิ์สิทธิ์", icon: "/icons/skills/aspersio.png", file: "Aspersio.wav", synth: "holy" },
      { id: "bs-sacramenti", label: "B.S. Sacramenti", th: "เกราะธาตุศักดิ์สิทธิ์", icon: "/icons/skills/bs-sacramenti.png", file: "BSS.wav", synth: "holy" },
      { id: "impositio-manus", label: "Impositio Manus", th: "วางมือเพิ่มพลังโจมตี", icon: "/icons/skills/impositio-manus.png", file: "Impositio.wav", synth: "chime-up" },
      { id: "suffragium", label: "Suffragium", th: "ลดเวลาร่ายเวทย์", icon: "/icons/skills/suffragium.png", synth: "chime-up" },
      { id: "recovery", label: "Status Recovery", th: "ปลดแช่แข็ง/หิน/มึน", icon: "/icons/skills/recovery.png", file: "StatusRecovery.wav", synth: "chime-up" },
      { id: "slow-poison", label: "Slow Poison", th: "หยุดพิษชั่วคราว", icon: "/icons/skills/slow-poison.png", synth: "poison" },
      { id: "resurrection", label: "Resurrection", th: "ชุบชีวิต", icon: "/icons/skills/resurrection.png", file: "Resurrection.wav", synth: "respawn" },
      { id: "magnus-exorcismus", label: "Magnus Exorcismus", th: "มหาเวทย์ปราบผีดิบ", icon: "/icons/skills/magnus-exorcismus.png", file: "MagnusExorcismus.wav", synth: "holy" },
      { id: "assumptio", label: "Assumptio", th: "พรสวรรค์ลดดาเมจครึ่ง", icon: "/icons/skills/assumptio.png", file: "Assumptio.wav", synth: "holy" },
      { id: "asura-strike", label: "Asura Strike", th: "หมัดอสูร (Guillotine Fist)", icon: "/icons/skills/asura-strike.png", synth: "explosion" },
      { id: "critical-explosion", label: "Fury / Crit Explosion", th: "ระเบิดลูกแก้วจิต", icon: "/icons/skills/critical-explosion.png", synth: "shout" },
      { id: "steel-body", label: "Steel Body", th: "กายาเหล็กไหล", icon: "/icons/skills/steel-body.png", synth: "endure" },
      { id: "palm-push", label: "Palm Push Strike", th: "ฝ่ามือกระแทกกระเด็น", icon: "/icons/skills/palm-push.png", synth: "heavy-hit" },
      { id: "tiger-knuckle", label: "Tiger Knuckle Fist", th: "หมัดพยัคฆ์", icon: "/icons/skills/tiger-knuckle.png", synth: "bash" },
    ],
  },
  {
    id: "archer",
    name: "Archer",
    th: "นักธนู",
    icon: "/icons/jobs/archer.png",
    class2: "Hunter / Bard / Dancer",
    class2Icon: "/icons/jobs/hunter.png",
    accent: "#5fb85a",
    class1: [
      { id: "double-strafe", label: "Double Strafe", th: "ยิงธนูคู่", icon: "/icons/skills/double-strafe.png", synth: "double-arrow" },
      { id: "improve-concentration", label: "Attention Concentrate", th: "เพ่งสมาธิเพิ่ม AGI/DEX", icon: "/icons/skills/improve-concentration.png", synth: "focus" },
      { id: "arrow-hit", label: "Arrow Shot", th: "ยิงธนู", icon: "/icons/skills/charge-arrow.png", synth: "arrow" },
    ],
    class2Skills: [
      { id: "blitz-beat", label: "Blitz Beat", th: "เหยี่ยวโฉบโจมตี", icon: "/icons/skills/blitz-beat.png", synth: "falcon" },
      { id: "falcon-assault", label: "Falcon Assault", th: "เหยี่ยวพิฆาต", icon: "/icons/skills/falcon-assault.png", synth: "falcon" },
      { id: "focused-arrow", label: "Sharp Shooting", th: "ยิงทะลวงแนวตรง", icon: "/icons/skills/focused-arrow.png", synth: "arrow" },
      { id: "true-sight", label: "True Sight", th: "เนตรเหยี่ยว", icon: "/icons/skills/true-sight.png", synth: "focus" },
      { id: "wind-walk", label: "Wind Walk", th: "ก้าวสายลม", icon: "/icons/skills/wind-walk.png", synth: "wind" },
      { id: "detect", label: "Detect", th: "เหยี่ยวตรวจจับ", icon: "/icons/skills/detect.png", synth: "falcon" },
      { id: "land-mine", label: "Land Mine", th: "กับดักระเบิดดิน", icon: "/icons/skills/land-mine.png", synth: "explosion" },
      { id: "blast-mine", label: "Blast Mine", th: "กับดักระเบิดลม", icon: "/icons/skills/blast-mine.png", synth: "explosion" },
      { id: "claymore-trap", label: "Claymore Trap", th: "กับดักระเบิดไฟ", icon: "/icons/skills/claymore-trap.png", synth: "explosion" },
      { id: "freezing-trap", label: "Freezing Trap", th: "กับดักน้ำแข็ง", icon: "/icons/skills/freezing-trap.png", synth: "freeze" },
      { id: "sandman", label: "Sandman", th: "กับดักนิทรา", icon: "/icons/skills/sandman.png", synth: "sleep" },
      { id: "flasher", label: "Flasher", th: "กับดักแสงตาบอด", icon: "/icons/skills/flasher.png", synth: "blind" },
      { id: "shockwave-trap", label: "Shockwave Trap", th: "กับดักดูดพลัง", icon: "/icons/skills/shockwave-trap.png", synth: "trap" },
      { id: "skid-trap", label: "Skid Trap", th: "กับดักไถลกระเด็น", icon: "/icons/skills/skid-trap.png", synth: "trap" },
      { id: "spring-trap", label: "Spring Trap", th: "เหยี่ยวทำลายกับดัก", icon: "/icons/skills/spring-trap.png", synth: "falcon" },
      { id: "poem-of-bragi", label: "A Poem of Bragi", th: "บทกวีลดร่าย/ดีเลย์", icon: "/icons/skills/poem-of-bragi.png", file: "BD/MagicStrings.wav", synth: "chime-up" },
      { id: "impressive-riff", label: "Assassin Cross of Sunset", th: "เพลงเร่งความเร็วโจมตี", icon: "/icons/skills/impressive-riff.png", file: "BD/ImpressiveRiff.wav", synth: "chime-up" },
      { id: "apple-of-idun", label: "The Apple of Idun", th: "เพลงเพิ่ม Max HP", icon: "/icons/skills/apple-of-idun.png", file: "BD/SongofLutie.wav", synth: "chime-up" },
      { id: "service-for-you", label: "Service for You", th: "ระบำลดใช้ SP", icon: "/icons/skills/service-for-you.png", file: "BD/GypsysKiss.wav", synth: "chime-up" },
      { id: "fortunes-kiss", label: "Fortune's Kiss", th: "ระบำเพิ่มคริติคอล", icon: "/icons/skills/fortunes-kiss.png", file: "BD/LadyLuck.wav", synth: "chime-up" },
      { id: "dont-forget-me", label: "Please Don't Forget Me", th: "ระบำลดความเร็วศัตรู", icon: "/icons/skills/dont-forget-me.png", file: "BD/SlowGrace.wav", synth: "sleep" },
      { id: "lullaby", label: "Lullaby", th: "บรรเลงกล่อมหลับ", icon: "/icons/skills/lullaby.png", file: "BD/Lullaby.wav", synth: "sleep" },
      { id: "arrow-vulcan", label: "Arrow Vulcan", th: "ระบำยิงธนูรัว", icon: "/icons/skills/arrow-vulcan.png", synth: "arrow-rain" },
      { id: "tarot-card", label: "Tarot Card of Fate", th: "เปิดไพ่แห่งโชคชะตา", icon: "/icons/skills/tarot-card.png", synth: "card" },
    ],
  },
  {
    id: "merchant",
    name: "Merchant",
    th: "พ่อค้า",
    icon: "/icons/jobs/merchant.png",
    class2: "Blacksmith / Alchemist",
    class2Icon: "/icons/jobs/blacksmith.png",
    accent: "#d98b3a",
    class1: [
      { id: "mammonite", label: "Mammonite", th: "ฟาดด้วยเงิน Zeny", icon: "/icons/skills/mammonite.png", synth: "coins" },
      { id: "crazy-uproar", label: "Crazy Uproar", th: "ตะโกนเพิ่ม STR", icon: "/icons/skills/crazy-uproar.png", synth: "shout" },
      { id: "greed", label: "Greed", th: "กวาดไอเทมรอบตัว", icon: "/icons/skills/greed.png", synth: "coins" },
    ],
    class2Skills: [
      { id: "adrenaline-rush", label: "Adrenaline Rush", th: "เร่งความเร็วโจมตี", icon: "/icons/skills/adrenaline-rush.png", file: "AdrenalineRush.wav", synth: "shout" },
      { id: "over-thrust", label: "Over Thrust", th: "เสริมพลังโจมตีปาร์ตี้", icon: "/icons/skills/over-thrust.png", synth: "shout" },
      { id: "maximum-over-thrust", label: "Max Over Thrust", th: "เสริมพลังโจมตีขั้นสุด", icon: "/icons/skills/maximum-over-thrust.png", synth: "shout" },
      { id: "weapon-perfection", label: "Weapon Perfection", th: "ตีทุกขนาด 100%", icon: "/icons/skills/weapon-perfection.png", synth: "endure" },
      { id: "maximize-power", label: "Maximize Power", th: "ดึงพลังอาวุธสูงสุด", icon: "/icons/skills/maximize-power.png", synth: "focus" },
      { id: "weapon-repair", label: "Weapon Repair", th: "ซ่อมอาวุธและชุดเกราะ", icon: "/icons/skills/weapon-repair.png", synth: "tick" },
      { id: "acid-demonstration", label: "Acid Bomb", th: "ปาระเบิดกรดและไฟ", icon: "/icons/skills/acid-demonstration.png", synth: "explosion" },
      { id: "slim-potion-pitcher", label: "Potion Pitcher", th: "ปาขวดยาฟื้นฟู", icon: "/icons/skills/slim-potion-pitcher.png", synth: "potion" },
      { id: "full-chemical-protection", label: "Full Protection", th: "เคลือบกันอาวุธแตก", icon: "/icons/skills/full-chemical-protection.png", synth: "endure" },
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

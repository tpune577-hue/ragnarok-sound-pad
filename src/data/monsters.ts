import type { StepKind } from "../lib/audio/synth-ids";

export type Monster = {
  id: string;
  name: string;
  th: string;
  sprite: string;
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
  drag: "เลื้อยคลาน",
  creak: "พืช/ต้นไม้",
};

export const MONSTERS: Monster[] = [
  // Regular Monsters (all 26 from the YouTube playlist)
  { id: "poring", name: "Poring", th: "โปริ่ง", sprite: "/icons/monsters/poring.gif", step: "bounce", color: "#f48fb1" },
  { id: "lunatic", name: "Lunatic", th: "กระต่ายปุย", sprite: "/icons/monsters/lunatic.gif", step: "hop", color: "#e0e6f5" },
  { id: "fabre", name: "Fabre", th: "หนอนเขียว", sprite: "/icons/monsters/fabre.gif", step: "drag", color: "#aed581" },
  { id: "picky", name: "Picky", th: "ลูกเจี๊ยบ", sprite: "/icons/monsters/picky.gif", step: "hop", color: "#ffd54f" },
  { id: "chonchon", name: "Chonchon", th: "แมลงวัน", sprite: "/icons/monsters/chonchon.gif", step: "flap", color: "#dce775" },
  { id: "roda-frog", name: "Roda Frog", th: "กบเขียว", sprite: "/icons/monsters/roda-frog.gif", step: "hop", color: "#4db6ac" },
  { id: "willow", name: "Willow", th: "ปีศาจต้นไม้", sprite: "/icons/monsters/willow.gif", step: "creak", color: "#8bc34a" },
  { id: "spore", name: "Spore", th: "เห็ดแดง", sprite: "/icons/monsters/spore.gif", step: "hop", color: "#e57373" },
  { id: "rocker", name: "Rocker", th: "ตั๊กแตนสีซอ", sprite: "/icons/monsters/rocker.gif", step: "skitter", color: "#9ccc65" },
  { id: "hornet", name: "Hornet", th: "ผึ้งต่อย", sprite: "/icons/monsters/hornet.gif", step: "flap", color: "#ffb74d" },
  { id: "creamy", name: "Creamy", th: "ผีเสื้อชมพู", sprite: "/icons/monsters/creamy.gif", step: "flap", color: "#f8bbd0" },
  { id: "stainer", name: "Stainer", th: "เต่าทองสีรุ้ง", sprite: "/icons/monsters/stainer.gif", step: "flap", color: "#ba68c8" },
  { id: "andre", name: "Andre", th: "มดงาน", sprite: "/icons/monsters/andre.gif", step: "skitter", color: "#ffcc80" },
  { id: "horn", name: "Horn", th: "ด้วงกว่าง", sprite: "/icons/monsters/horn.gif", step: "skitter", color: "#8d6e63" },
  { id: "ambernite", name: "Ambernite", th: "หอยทาก", sprite: "/icons/monsters/ambernite.gif", step: "drag", color: "#ce93d8" },
  { id: "condor", name: "Condor", th: "แร้งทะเลทราย", sprite: "/icons/monsters/condor.gif", step: "flap", color: "#bcaaa4" },
  { id: "pecopeco", name: "Peco Peco", th: "นกเปโกะ", sprite: "/icons/monsters/pecopeco.gif", step: "paw", color: "#ffb74d" },
  { id: "baby-desert-wolf", name: "Baby Desert Wolf", th: "ลูกหมาป่า", sprite: "/icons/monsters/baby-desert-wolf.gif", step: "paw", color: "#d7ccc8" },
  { id: "wolf", name: "Wolf", th: "หมาป่า", sprite: "/icons/monsters/wolf.gif", step: "paw", color: "#90a4ae" },
  { id: "coco", name: "Coco", th: "กระรอกถือลูกโอ๊ก", sprite: "/icons/monsters/coco.gif", step: "hop", color: "#a1887f" },
  { id: "yoyo", name: "Yoyo", th: "ลิงจ๋อ", sprite: "/icons/monsters/yoyo.gif", step: "hop", color: "#ffb74d" },
  { id: "mandragora", name: "Mandragora", th: "ต้นไม้กรีดร้อง", sprite: "/icons/monsters/mandragora.gif", step: "creak", color: "#81c784" },
  { id: "hydra", name: "Hydra", th: "ดอกไม้ทะเล", sprite: "/icons/monsters/hydra.gif", step: "drag", color: "#f06292" },
  { id: "vadon", name: "Vadon", th: "ปูยักษ์ใต้ทะเล", sprite: "/icons/monsters/vadon.gif", step: "skitter", color: "#ef5350" },
  { id: "orc-warrior", name: "Orc Warrior", th: "นักรบออร์ค", sprite: "/icons/monsters/orc-warrior.gif", step: "stomp", color: "#689f38" },
  { id: "bigfoot", name: "Bigfoot", th: "หมีใหญ่", sprite: "/icons/monsters/bigfoot.gif", step: "stomp", color: "#8d6e63" },

  // MVP Bosses (all 16 from the YouTube playlist)
  { id: "golden-thief-bug", name: "Golden Thief Bug", th: "แมลงสาบทอง", sprite: "/icons/monsters/golden-thief-bug.gif", step: "skitter", color: "#ffca28", mvp: true },
  { id: "eddga", name: "Eddga", th: "พญาเสือโคร่ง", sprite: "/icons/monsters/eddga.gif", step: "paw", color: "#ff7043", mvp: true },
  { id: "moonlight", name: "Moonlight Flower", th: "จิ้งจอกเก้าหาง", sprite: "/icons/monsters/moonlight.gif", step: "ghost", color: "#ffe082", mvp: true },
  { id: "osiris", name: "Osiris", th: "ราชามัมมี่โอซิริส", sprite: "/icons/monsters/osiris.gif", step: "ghost", color: "#80deea", mvp: true },
  { id: "phreeoni", name: "Phreeoni", th: "อสูรลิ้นยักษ์", sprite: "/icons/monsters/phreeoni.gif", step: "stomp", color: "#f48fb1", mvp: true },
  { id: "orc-lord", name: "Orc Lord", th: "จอมทัพออร์ค", sprite: "/icons/monsters/orc-lord.gif", step: "stomp", color: "#66bb6a", mvp: true },
  { id: "maya", name: "Maya", th: "นางพญามดมายา", sprite: "/icons/monsters/maya.gif", step: "skitter", color: "#ab47bc", mvp: true },
  { id: "mistress", name: "Mistress", th: "ราชินีผึ้งมิสเทรส", sprite: "/icons/monsters/mistress.gif", step: "flap", color: "#ffee58", mvp: true },
  { id: "baphomet", name: "Baphomet", th: "บาโฟเมต", sprite: "/icons/monsters/baphomet.gif", step: "stomp", color: "#ef5350", mvp: true },
  { id: "drake", name: "Drake", th: "กัปตันผีเดรค", sprite: "/icons/monsters/drake.gif", step: "rattle", color: "#7986cb", mvp: true },
  { id: "doppelganger", name: "Doppelganger", th: "ดอปเปลแกงเกอร์", sprite: "/icons/monsters/doppelganger.gif", step: "stomp", color: "#9fa8da", mvp: true },
  { id: "garm", name: "Garm (Hatii)", th: "หมาป่าน้ำแข็งการ์ม", sprite: "/icons/monsters/garm.gif", step: "paw", color: "#81d4fa", mvp: true },
  { id: "stormy-knight", name: "Stormy Knight", th: "อัศวินพายุหิมะ", sprite: "/icons/monsters/stormy-knight.gif", step: "stomp", color: "#4fc3f7", mvp: true },
  { id: "pharaoh", name: "Pharaoh", th: "ฟาโรห์", sprite: "/icons/monsters/pharaoh.gif", step: "ghost", color: "#ffd54f", mvp: true },
  { id: "dark-lord", name: "Dark Lord", th: "จอมมารดาร์คลอร์ด", sprite: "/icons/monsters/dark-lord.gif", step: "ghost", color: "#b39ddb", mvp: true },
  { id: "lord-of-death", name: "Lord of Death", th: "ยมทูตแห่งความตาย", sprite: "/icons/monsters/lord-of-death.gif", step: "stomp", color: "#e57373", mvp: true },
];

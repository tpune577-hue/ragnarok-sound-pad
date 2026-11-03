export const BGM_REMOTE_BASE = "https://mirror.irowiki.org/ragnarok/mp3/bgm/";

export type BgmTrack = {
  id: string;
  title: string;
  location: string;
};

export const BGM_TRACKS: BgmTrack[] = [
  { id: "01", title: "Title", location: "Login Screen" },
  { id: "08", title: "Theme of Prontera", location: "Prontera" },
  { id: "13", title: "Theme of Geffen", location: "Geffen" },
  { id: "14", title: "Theme of Payon", location: "Payon" },
  { id: "11", title: "Theme of Morroc", location: "Morroc" },
  { id: "28", title: "You're in Ruins", location: "St. Capitolina Abbey" },
  { id: "12", title: "Streamside", location: "Prontera Fields" },
  { id: "05", title: "Tread on the Ground", location: "Prontera Fields" },
  { id: "04", title: "I Miss You", location: "Prontera Fields" },
  { id: "03", title: "Peaceful Forest", location: "Payon Fields" },
  { id: "25", title: "Plateau", location: "Geffen Fields" },
  { id: "19", title: "Under the Ground", location: "Prontera Culverts" },
  { id: "20", title: "Ancient Groover", location: "Payon Caves" },
  { id: "21", title: "Through the Tower", location: "Geffen Dungeon" },
  { id: "22", title: "Backattack!!", location: "Morroc Pyramid" },
  { id: "40", title: "Fear...", location: "Glast Heim" },
  { id: "44", title: "TeMP It Up", location: "Guild Dungeon" },
  { id: "18", title: "Time Up!!", location: "PvP Arena" },
  { id: "66", title: "Wanna Be Free!!", location: "War of Emperium" },
  { id: "51", title: "Believe in Myself", location: "Job Change" },
  { id: "02", title: "Gambler of Highway", location: "Job Change" },
];

export type SceneId =
  | "title"
  | "city"
  | "ceremony"
  | "field"
  | "dungeon"
  | "mvp"
  | "victory";

export type Scene = {
  id: SceneId;
  name: string;
  th: string;
  tracks: string[];
};

export const SCENES: Scene[] = [
  { id: "title", name: "Title", th: "เปิดเกม", tracks: ["01"] },
  { id: "city", name: "City Phase", th: "ในเมือง", tracks: ["08", "13", "14", "11"] },
  { id: "ceremony", name: "Cathedral", th: "พิธีกรรม", tracks: ["28"] },
  { id: "field", name: "Field", th: "ทุ่งนอกเมือง", tracks: ["12", "05", "04", "03", "25"] },
  { id: "dungeon", name: "Dungeon", th: "ดันเจี้ยน", tracks: ["19", "20", "21", "22", "40"] },
  { id: "mvp", name: "MVP Battle", th: "สู้บอส", tracks: ["44", "18", "66"] },
  { id: "victory", name: "Victory", th: "ชนะ / เปลี่ยนอาชีพ", tracks: ["51", "02"] },
];

export const bgmUrl = (id: string) => `/audio/bgm/${id}.mp3`;

import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { ALL_SOUNDS } from "../src/data/sounds.ts";

const dir = path.resolve(import.meta.dirname, "..", "public", "audio", "pack");
await mkdir(dir, { recursive: true });

const known = new Set(ALL_SOUNDS.map((s) => s.id));
const index: Record<string, string> = {};

for (const name of await readdir(dir)) {
  const { name: id, ext } = path.parse(name);
  if (![".mp3", ".wav", ".ogg", ".m4a"].includes(ext.toLowerCase())) continue;
  index[id] = `audio/pack/${encodeURIComponent(name)}`;
}

await writeFile(path.join(dir, "index.json"), JSON.stringify(index, null, 2));
const matchedPads = [...known].filter((id) => Boolean(index[id])).length;
console.log(
  `Sound pack indexed: ${Object.keys(index).length} audio files (${matchedPads}/${known.size} pads + monster SFX)`,
);

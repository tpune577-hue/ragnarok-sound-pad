import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { BGM_REMOTE_BASE, BGM_TRACKS } from "../src/data/bgm.ts";
import { ALL_SOUND_FILES, SFX_REMOTE_BASE } from "../src/data/sounds.ts";

const root = path.resolve(import.meta.dirname, "..", "public", "audio");

const jobs = [
  ...BGM_TRACKS.map((t) => ({
    url: `${BGM_REMOTE_BASE}${t.id}.mp3`,
    dest: path.join(root, "bgm", `${t.id}.mp3`),
  })),
  ...ALL_SOUND_FILES.map((f) => ({
    url: SFX_REMOTE_BASE + f.split("/").map(encodeURIComponent).join("/"),
    dest: path.join(root, "sfx", path.basename(f)),
  })),
];

async function exists(p: string) {
  try {
    return (await stat(p)).size > 0;
  } catch {
    return false;
  }
}

await mkdir(path.join(root, "bgm"), { recursive: true });
await mkdir(path.join(root, "sfx"), { recursive: true });

let failed = 0;
for (const job of jobs) {
  if (await exists(job.dest)) continue;
  const res = await fetch(job.url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) {
    failed++;
    console.error(`✗ ${res.status} ${job.url}`);
    continue;
  }
  await writeFile(job.dest, Buffer.from(await res.arrayBuffer()));
  console.log(`✓ ${path.relative(root, job.dest)}`);
}

console.log(`${jobs.length - failed}/${jobs.length} files ready in public/audio`);
if (failed) process.exit(1);

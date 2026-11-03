# Ragnarok the Board Game – Sound Companion

Web app (tablet/phone) ที่เล่น BGM และเสียงเอฟเฟกต์ประกอบการเล่น *Ragnarok the Board Game: Ceremony of Prontera*

```bash
npm install
npm run dev        # ดาวน์โหลดไฟล์เสียงจาก iRO Wiki mirror ให้อัตโนมัติก่อนเปิด (ครั้งแรก ~45 MB)
```

เปิด `http://localhost:3000` หรือใช้ Network URL ที่แสดงในเทอร์มินัลเพื่อเปิดจากแท็บเล็ตในวง Wi-Fi เดียวกัน

บนมือถือ: เปิด URL แล้วเลือก "เพิ่มลงในหน้าจอโฮม" เพื่อใช้แบบเต็มจอ

## ใส่ไฟล์เสียงจริง (Sound pack)

วางไฟล์ไว้ที่ `public/audio/pack/<id>.mp3` (หรือ `.wav` / `.ogg` / `.m4a`) โดย `<id>` คือ `id` ของปุ่มใน `src/data/sounds.ts`
เช่น `level-up.mp3`, `mvp.mp3`, `refine-success.mp3`, `bash.mp3`, `storm-gust.mp3`
แล้วรัน `npm run index-pack` (หรือ `npm run dev` / `npm run build` ซึ่งรันให้อัตโนมัติ) ปุ่มจะเปลี่ยนเป็นจุดสีเขียว

## โครงสร้าง

- `src/data/bgm.ts` – รายการเพลงและฉาก (Title, City Phase, Field, Dungeon, MVP …)
- `src/data/sounds.ts` – ปุ่มเสียงสกิลแต่ละอาชีพและเหตุการณ์บนโต๊ะ (`file` = ไฟล์จริง, `synth` = เสียงสังเคราะห์สำรอง)
- `src/data/monsters.ts` – มอนสเตอร์และประเภทเสียงเดิน
- `src/lib/audio/` – audio engine (Web Audio: crossfade BGM, ducking, synth, ไฟล์ที่อัปโหลดเอง)
- `scripts/fetch-audio.ts` – ดาวน์โหลดไฟล์เสียงลง `public/audio` (ไม่ commit เข้า git)

## ลิขสิทธิ์

เพลงและเสียงของ Ragnarok Online เป็นลิขสิทธิ์ของ Gravity Co., Ltd. ใช้เพื่อทำต้นแบบเท่านั้น

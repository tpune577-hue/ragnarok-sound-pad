# Ragnarok the Board Game – Sound Companion

Web app (tablet/phone) ที่เล่น BGM และเสียงเอฟเฟกต์ประกอบการเล่น *Ragnarok the Board Game: Ceremony of Prontera*

```bash
npm install
npm run dev        # ดาวน์โหลดไฟล์เสียงจาก iRO Wiki mirror ให้อัตโนมัติก่อนเปิด (ครั้งแรก ~45 MB)
```

เปิด `http://localhost:3000` หรือใช้ Network URL ที่แสดงในเทอร์มินัลเพื่อเปิดจากแท็บเล็ตในวง Wi-Fi เดียวกัน

## โครงสร้าง

- `src/data/bgm.ts` – รายการเพลงและฉาก (Title, City Phase, Field, Dungeon, MVP …)
- `src/data/sounds.ts` – ปุ่มเสียงสกิลแต่ละอาชีพและเหตุการณ์บนโต๊ะ (`file` = ไฟล์จริง, `synth` = เสียงสังเคราะห์สำรอง)
- `src/data/monsters.ts` – มอนสเตอร์และประเภทเสียงเดิน
- `src/lib/audio/` – audio engine (Web Audio: crossfade BGM, ducking, synth, ไฟล์ที่อัปโหลดเอง)
- `scripts/fetch-audio.ts` – ดาวน์โหลดไฟล์เสียงลง `public/audio` (ไม่ commit เข้า git)

## ลิขสิทธิ์

เพลงและเสียงของ Ragnarok Online เป็นลิขสิทธิ์ของ Gravity Co., Ltd. ใช้เพื่อทำต้นแบบเท่านั้น

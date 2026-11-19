# QarzDaftar Videos (Remotion)

QarzDaftar ilovasi uchun **o'zbek (`uz`)** va **rus (`ru`)** tillaridagi video darslar, reklama va ijtimoiy tarmoq roliklari paketi (Remotion + React + TypeScript + High Quality Audio Pipeline).

## 📁 Papka tuzilmasi

```text
qarzdaftar_videos/
├── social/                           # 🚀 BARCHA TAYYOR VIDEOLAR AVTOMATIK SHU YERGA CHIQADI
│   └── lesson-01-intro/
│       ├── uz-vertical-9x16.mp4      # 9:16 O'zbekcha Reels / Shorts / TikTok / Telegram
│       ├── uz-landscape-16x9.mp4     # 16:9 O'zbekcha YouTube / Web
│       ├── uz-thumbnail.png          # O'zbekcha video muqovasi
│       ├── ru-vertical-9x16.mp4      # 9:16 Ruscha Reels / Shorts / TikTok / Telegram
│       ├── ru-landscape-16x9.mp4     # 16:9 Ruscha YouTube / Web
│       └── ru-thumbnail.png          # Ruscha video muqovasi
├── myvoice/                          # Ovoz namunalari va yozuvlar
├── public/
│   ├── audio/                        # Fon musiqasi (bg-music.mp3) va o'tish tovushlari (whoosh.wav)
│   └── lessons/
│       └── lesson-01-intro/          # Darsga tegishli audio va vizual resurslar
├── scripts/
│   ├── process_all_scenes.py         # Ovozni qayta ishlash, masterlash va manifest yaratish
│   └── generate-voice.mjs            # TTS generatsiya skripti
└── src/
    ├── Root.tsx                      # Barcha kompozitsiyalar (UZ/RU × 9:16/16:9)
    ├── theme/brand.ts                # QarzDaftar brend ranglari va o'lchamlari
    ├── components/                   # Android PhoneFrame va LessonShell komponentlari
    └── lessons/
        └── lesson-01-intro/
            ├── index.tsx             # 1-dars video kompozitsiyasi va animatsiyalari
            ├── AnimatedPhoneScreens.tsx # 1:1 Jetpack Compose ekranlarining replikatsiyasi
            ├── script.json           # O'zbekcha va ruscha matnlar
            └── audio-manifest.json   # Ovoz va karaoke vaqtlari xaritasi
```

---

## 🎬 Video Render Qilish (Avtomatik `social/<lessonId>/` ga saqlanadi)

Barcha buyruqlar tayyor MP4 va PNG fayllarni to'g'ridan-to'g'ri `social/lesson-01-intro/` papkasiga saqlaydi:

```bash
# 🇺🇿 O'zbekcha formatlar
npm run render:lesson1:uz             # 9:16 Vertikal (Reels, TikTok, Shorts, Telegram)
npm run render:lesson1:uz:landscape   # 16:9 Gorizontal (YouTube, Web)
npm run render:lesson1:thumb:uz       # O'zbekcha muqova rasmi (Thumbnail)

# 🇷🇺 Ruscha formatlar
npm run render:lesson1:ru             # 9:16 Vertikal (Reels, Shorts, Telegram)
npm run render:lesson1:ru:landscape   # 16:9 Gorizontal (YouTube, Web)
npm run render:lesson1:thumb:ru       # Ruscha muqova rasmi (Thumbnail)
```

---

## 🖥️ Jonli Ko'rish (Remotion Studio)

```bash
cd qarzdaftar_videos
npm install
npm run dev
```

Brauzerda `http://localhost:3000` ochiladi — chap paneldan har bir kompozitsiyani jonli tahrirlash va ko'rish mumkin.

---

## 🎙️ Ovoz va Audio Standarti

1. **Vazmin va Ishonchli Temp (1.0x):** Sun'iy shoshiltirishlarsiz, do'kondorga ishonch bag'ishlovchi vazmin va samimiy nutq.
2. **Iliq Akustik Fon Musiqasi:** Har bir videoda past ovozda (`8%` volume) muloyim akustik gitara va pianino kuylari yangraydi.
3. **Sahna O'tishlari:** Sahnadan sahnaga o'tishda sun'iy "o'lik tinchlik" bo'lmaydi, har bir sahna almashinuvida 0.35s silliq oraliq va mayin whoosh ovoz effekti ishlaydi.
4. **Karaoke Subtitrlar:** Pastki panelda so'zlar nutq bilan birma-bir yonib boradi.

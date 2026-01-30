export const affirmations = [
  {
    id: 1,
    text: "Kamu nggak harus sempurna untuk layak dicintai. Kamu sudah cukup, apa adanya. 🤍",
    emoji: "🌸"
  },
  {
    id: 2,
    text: "Istirahat bukan kemalasan. Itu adalah cara tubuh dan pikiranmu untuk pulih. ☁️",
    emoji: "🛋️"
  },
  {
    id: 3,
    text: "Perasaanmu valid, meskipun orang lain tidak memahaminya. ✨",
    emoji: "💫"
  },
  {
    id: 4,
    text: "Kemajuan kecil tetaplah kemajuan. Bersabarlah dengan dirimu sendiri. 🌱",
    emoji: "🌱"
  },
  {
    id: 5,
    text: "Kamu sudah melewati hari-hari berat sebelumnya, dan kamu bisa melewati ini juga. 💪",
    emoji: "🦋"
  },
  {
    id: 6,
    text: "Tidak apa-apa untuk tidak baik-baik saja. Kamu manusia, bukan robot. 🧸",
    emoji: "🧸"
  },
  {
    id: 7,
    text: "Kamu berhak mengambil ruang dan waktu untuk dirimu sendiri. 🌙",
    emoji: "🌙"
  },
  {
    id: 8,
    text: "Membandingkan dirimu dengan orang lain adalah mencuri kebahagiaanmu sendiri. 🌻",
    emoji: "🌻"
  },
  {
    id: 9,
    text: "Setiap hari adalah kesempatan baru untuk memulai lagi. ☀️",
    emoji: "☀️"
  },
  {
    id: 10,
    text: "Kamu lebih kuat dari yang kamu pikirkan, lebih berani dari yang kamu rasakan. 🦁",
    emoji: "🦁"
  },
  {
    id: 11,
    text: "Merawat diri sendiri bukan egois—itu penting. 💆",
    emoji: "💆"
  },
  {
    id: 12,
    text: "Kamu tidak perlu punya semua jawaban sekarang. Hidup adalah perjalanan. 🗺️",
    emoji: "🗺️"
  },
  {
    id: 13,
    text: "Kesalahan adalah guru terbaik. Belajar darinya, lalu lepaskan. 📚",
    emoji: "📚"
  },
  {
    id: 14,
    text: "Hatimu yang lembut adalah kekuatanmu, bukan kelemahanmu. 💗",
    emoji: "💗"
  },
  {
    id: 15,
    text: "Kamu pantas mendapat kebahagiaan, cinta, dan kedamaian. 🕊️",
    emoji: "🕊️"
  },
  {
    id: 16,
    text: "Menangis bukan berarti lemah. Itu adalah cara hatimu untuk bernapas. 💧",
    emoji: "💧"
  },
  {
    id: 17,
    text: "Kamu tidak sendirian dalam perasaan ini. Banyak orang merasakan hal yang sama. 🤝",
    emoji: "🤝"
  },
  {
    id: 18,
    text: "Hari ini mungkin berat, tapi besok adalah halaman baru. 📖",
    emoji: "📖"
  },
  {
    id: 19,
    text: "Keberanianmu untuk terus melangkah adalah hal yang luar biasa. 👣",
    emoji: "👣"
  },
  {
    id: 20,
    text: "Kamu adalah karya yang sedang dalam proses—dan itu indah. 🎨",
    emoji: "🎨"
  }
];

// Get a random affirmation
export const getRandomAffirmation = () => {
  const randomIndex = Math.floor(Math.random() * affirmations.length);
  return affirmations[randomIndex];
};

// Get daily affirmation (same quote for the whole day based on date)
export const getDailyAffirmation = () => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  const index = dayOfYear % affirmations.length;
  return affirmations[index];
};

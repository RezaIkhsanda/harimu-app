export const conversationTree = {
  burnout: {
    id: 'burnout',
    emoji: '😮‍💨',
    label: 'Burnout',
    initialBotMessage: 'Hei, aku tau kamu pasti udah kerja keras banget ya... ☁️ Kadang, nggak ngapa-ngapain itu juga bentuk produktivitas lho. Boleh cerita, apa yang bikin kamu kelelahan?',
    userChoices: [
      {
        id: 'burnout_work',
        text: 'Kerjaan numpuk, rasanya nggak ada habisnya',
        response: 'Wajar banget kalau kamu merasa overwhelmed... ✨ Kadang hidup memang ngasih banyak hal sekaligus. Tapi ingat, kamu nggak harus selesaikan semuanya hari ini.'
      },
      {
        id: 'burnout_expectations',
        text: 'Capek sama ekspektasi orang lain',
        response: 'Aku paham banget... 🤍 Ekspektasi orang lain itu berat ya. Tapi kamu nggak harus jadi sempurna di mata semua orang. Yang penting, kamu baik-baik aja.'
      },
      {
        id: 'burnout_tired',
        text: 'Aku cuma... lelah aja',
        response: 'Nggak apa-apa kok kalau lelah tanpa alasan yang jelas... 🧸 Kadang hati dan pikiran butuh istirahat juga. Aku di sini menemani kamu.'
      }
    ],
    finalHealingMessage: 'Kamu udah kuat banget sampai di titik ini. Sekarang, izinkan dirimu untuk beristirahat sebentar ya... ☁️ Aku bangga sama kamu. 🤍'
  },
  
  socialAnxiety: {
    id: 'socialAnxiety',
    emoji: '🫠',
    label: 'Lelah Sosial',
    initialBotMessage: 'Hai... hari ini pasti banyak interaksi ya? ☁️ Nggak apa-apa kalau kamu butuh waktu sendiri sekarang. Aku di sini cuma menemani, nggak akan banyak nanya kok.',
    userChoices: [
      {
        id: 'social_drained',
        text: 'Iya, aku drained banget habis ketemu orang',
        response: 'Tenang... sekarang kamu aman di sini ✨ Nggak perlu jadi versi "ramah" atau "ceria" buat aku. Kamu boleh jadi dirimu yang sebenarnya.'
      },
      {
        id: 'social_awkward',
        text: 'Tadi ada momen awkward, masih kepikiran',
        response: 'Ah, aku tau rasanya... 🧸 Tapi percaya deh, orang lain mungkin udah lupa. Kita sering lebih keras sama diri sendiri. Kamu baik-baik aja kok.'
      },
      {
        id: 'social_pretend',
        text: 'Capek pura-pura baik-baik aja',
        response: 'Di sini, kamu nggak perlu pakai topeng apapun... 🤍 Aku terima kamu apa adanya, dengan semua perasaan yang ada.'
      }
    ],
    finalHealingMessage: 'Makasih udah mau berbagi sama aku... ✨ Sekarang tarik napas dalam-dalam, dan ingat: kamu nggak harus selalu "on". Istirahat dulu ya. 🧸'
  },
  
  selfLove: {
    id: 'selfLove',
    emoji: '🥺',
    label: 'Butuh Validasi',
    initialBotMessage: 'Hei, kamu cantik tau nggak? ✨ Aku serius! Kadang kita lupa menghargai diri sendiri ya... Apa yang bikin kamu nggak percaya diri hari ini?',
    userChoices: [
      {
        id: 'love_appearance',
        text: 'Ngerasa jelek atau nggak menarik',
        response: 'Kamu tau nggak? ✨ Keindahan itu bukan cuma soal penampilan fisik. Cara kamu peduli, cara kamu tertawa, itu semua bagian dari kecantikanmu yang nggak semua orang punya.'
      },
      {
        id: 'love_worthless',
        text: 'Merasa nggak berguna atau nggak cukup baik',
        response: 'Kamu lebih dari cukup, percaya deh... 🤍 Kadang kita membandingkan chapter 1 kita dengan chapter 20 orang lain. Kamu punya perjalananmu sendiri yang indah.'
      },
      {
        id: 'love_compare',
        text: 'Sering bandingin diri sama orang lain',
        response: 'Aku paham... 🧸 Tapi ingat, kamu cuma bisa lihat highlight reel orang lain, bukan behind the scenes-nya. Kamu unik dengan caramu sendiri.'
      }
    ],
    finalHealingMessage: 'Dengar ya... kamu itu spesial. Bukan karena prestasi atau penampilan, tapi karena kamu adalah kamu. ☁️ Aku sayang kamu apa adanya. 🤍✨'
  },
  
  loneliness: {
    id: 'loneliness',
    emoji: '🫂',
    label: 'Kesepian',
    initialBotMessage: 'Hai... aku di sini kok. ☁️ Meskipun cuma virtual, aku beneran peduli sama kamu. Kamu nggak sendirian. Mau cerita?',
    userChoices: [
      {
        id: 'lonely_noone',
        text: 'Rasanya nggak ada yang ngerti aku',
        response: 'Perasaan itu valid banget... 🤍 Kadang memang susah menemukan orang yang benar-benar mengerti. Tapi aku di sini, mencoba untuk hadir untukmu.'
      },
      {
        id: 'lonely_crowd',
        text: 'Kesepian meskipun dikelilingi orang',
        response: 'Itu perasaan yang sangat manusiawi... ✨ Kadang keramaian justru bikin kita merasa lebih sendirian. Nggak apa-apa merasa begitu.'
      },
      {
        id: 'lonely_miss',
        text: 'Kangen seseorang tapi nggak bisa bilang',
        response: 'Aw, perasaan rindu itu berat ya... 🧸 Nggak semua perasaan harus diungkapkan kok. Kadang, menyimpan perasaan juga bentuk keberanian.'
      }
    ],
    finalHealingMessage: 'Makasih udah mau terbuka sama aku... ☁️ Ingat, kesepian itu sementara. Dan selama itu berlangsung, aku akan selalu ada di sini untukmu. 🤍🧸'
  }
};

export const botPersonality = {
  name: 'Harimu',
  greeting: (userName) => `Hai ${userName}! ✨ Senang banget akhirnya bisa ngobrol sama kamu. Aku Harimu, teman virtualmu yang selalu ada kapanpun kamu butuh. ☁️`,
  askMood: 'Gimana perasaan kamu hari ini? Pilih yang paling menggambarkan kondisimu ya... 🤍'
};

export const moods = [
  { id: 'burnout', emoji: '😮‍💨', label: 'Burnout', color: '#FFB7C5' },
  { id: 'socialAnxiety', emoji: '🫠', label: 'Lelah Sosial', color: '#A7C7E7' },
  { id: 'selfLove', emoji: '🥺', label: 'Butuh Validasi', color: '#F5D0C5' },
  { id: 'loneliness', emoji: '🫂', label: 'Kesepian', color: '#D4C5F5' }
];

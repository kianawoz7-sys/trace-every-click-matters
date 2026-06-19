import { StoryNode } from "../types";

export const storyData: Record<string, StoryNode> = {
  // --- PROLOGUE: DAY 1 START ---
  start: {
    id: "start",
    speaker: "Alya",
    text: "Baru saja pindah ke SMA TRACE, aku sudah menghabiskan hampir 8 jam sehari berselancar di media sosial InstaTRACE. Aku terus-terusan terobsesi memantau jumlah followers dan likes-ku. Takut banget ketinggalan gosip di angkatan baru sampai-sampai mataku perih tiap malam.",
    characterLeft: "none",
    characterRight: "none",
    background: "school_gate",
    bgmEffect: "ambient",
    sfxEffect: "beep",
    next: "start_2",
  },
  start_2: {
    id: "start_2",
    speaker: "Alya",
    text: "Ponselku serasa menyatu dengan tanganku, kuremas erat menanti asupan dopamine digital berikutnya. Tiiing! Getaran kencang beruntun berbunyi. Wah, rupanya Fino—sekretaris kelas yang dinamis—baru saja memasukkanku ke grup utama angkatan kelas X-A.",
    characterLeft: "none",
    characterRight: "none",
    background: "school_gate",
    next: "grup_kelas_1",
  },

  // --- DAY 1: HOAKS ---
  grup_kelas_1: {
    id: "grup_kelas_1",
    speaker: "Grup Kelas X-A",
    text: "[Fino]: Guys! Ada info gawat banget nih! Gw dapet forward-an dari grup sebelah katanya ada kebocoran nilai seleksi beasiswa kelas kita! Katanya panitianya curang dan bakal ada pemotongan kuota sepihak! Yuk isi petisi protes massal di link ini!",
    characterLeft: "fino",
    characterLeftExpression: "smug",
    background: "chat_bg",
    bgmEffect: "ambient",
    next: "grup_kelas_2",
  },
  grup_kelas_2: {
    id: "grup_kelas_2",
    speaker: "Grup Kelas X-A",
    text: "[Rina]: Seriusan, Fin? Duh, aku kan bergantung banget sama beasiswa itu... Kalau beneran dipotong, gimana dong nasibku? Aku cemas banget nih.",
    characterLeft: "fino",
    characterLeftExpression: "default",
    characterRight: "rina",
    characterRightExpression: "sad",
    background: "chat_bg",
    next: "grup_kelas_3",
  },
  grup_kelas_3: {
    id: "grup_kelas_3",
    speaker: "Alya",
    text: "Aku melihat tautan petisi dan berita tersebut. Alamat webnya agak aneh, 'info-beasiswa-gratisankita.blogspot-secure.com'. Fino mendesak semua anggota grup untuk membagikan tautan tersebut secepatnya agar viral.",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    next: "event_1_1_choices",
  },
  event_1_1_choices: {
    id: "event_1_1_choices",
    speaker: "Alya",
    text: "Pesannya menyebar liar. Fino memintaku langsung untuk menyebarkannya juga ke grup ekstra kurikuler biar kompak. Apa tindakan yang akan kuambil?",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    choices: [
      {
        text: "Fact-Check: Periksa dulu ke situs resmi sekolah atau tanya langsung ke kakak OSIS panitia beasiswa.",
        nextNodeId: "day1_factcheck",
        achievementId: "fact_checker",
        reputationChange: 5,
        securityChange: 15,
        trustChange: 10,
        mentalChange: 5
      },
      {
        text: "Kirim Langsung: Biar kelihatan solid, cepat tanggap, dan membantu menyebarkan ke semua grup WA yang kuikuti.",
        nextNodeId: "day1_spreadhoax",
        reputationChange: -15,
        securityChange: -25,
        trustChange: -10,
        mentalChange: -10
      },
      {
        text: "Abaikan: Malis ikut campur, biarkan anak-anak lain berdebat sendiri di grup WA kelas.",
        nextNodeId: "day1_ignorehoax",
        reputationChange: -5,
        securityChange: 5,
        trustChange: -5,
        mentalChange: 10
      }
    ]
  },

  day1_factcheck: {
    id: "day1_factcheck",
    speaker: "Alya",
    text: "Aku memutuskan untuk tidak gegabah. Aku mencari tahu lewat akun resmi Humas SMA TRACE di Instasham dan mengonfirmasi ke Kak Diva, ketua OSIS. Ternyata kabar itu murni hoaks! Tautan petisi tersebut diduga bermuatan adware pencuri data.",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    bgmEffect: "tension",
    next: "day1_factcheck_speak",
  },
  day1_factcheck_speak: {
    id: "day1_factcheck_speak",
    speaker: "Alya",
    text: "Aku menulis di grup kelas: 'Guys, itu hoaks ya. Aku barusan tanya Kak OSIS dan cek web sekolah. Kabar kuota dipotong itu fitnah, dan jangan asal klik linknya, takutnya phishing.'",
    characterLeft: "none",
    characterRight: "none",
    background: "chat_bg",
    next: "day1_factcheck_reaction",
  },
  day1_factcheck_reaction: {
    id: "day1_factcheck_reaction",
    speaker: "Rina",
    text: "Ya ampun, untung kamu ingatkan, Alya! Aku hampir saja mengisi data diri dan password email di situs itu demi petisi. Makasih banyak ya!",
    characterRight: "rina",
    characterRightExpression: "blush",
    background: "classroom",
    next: "day1_event2_start",
  },

  day1_spreadhoax: {
    id: "day1_spreadhoax",
    speaker: "Alya",
    text: "Demi solidaritas kilat, aku memposting ulang pesan Fino ke 5 grup WA ekskul lainnya. Beberapa menit kemudian, HP-ku dibanjiri notifikasi serangan protes. Tiba-tiba salah satu admin grup menyemprotku.",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    bgmEffect: "tension",
    next: "day1_spreadhoax_fail",
  },
  day1_spreadhoax_fail: {
    id: "day1_spreadhoax_fail",
    speaker: "Kak Diva (OSIS)",
    text: "Alya, tolong jangan sebar hoaks tak berdasar ini ya! Sekolah tidak pernah memotong kuota secara sepihak. Dan situs yang kamu bagikan itu bahaya sekali, mengandung skrip malware untuk membajak kontak WhatsApp! Tolong segera hapus!",
    characterLeft: "fino",
    characterLeftExpression: "shocked",
    background: "chat_bg",
    next: "day1_spreadhoax_regret",
  },
  day1_spreadhoax_regret: {
    id: "day1_spreadhoax_regret",
    speaker: "Alya",
    text: "Duh, aku panik dan merasa sangat malu. Reputasiku di mata senior langsung jatuh dicap penyebar kabar sesat. Bahkan HP-ku mulai terasa lambat karena mengklik link beracun itu.",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    next: "day1_event2_start",
  },

  day1_ignorehoax: {
    id: "day1_ignorehoax",
    speaker: "Alya",
    text: "Aku memilih menutup obrolan kelas, menyalakan mode hening (mute), dan fokus melanjutkan scroll video lucu. Biarlah orang lain sibuk ribut, keselamatanku dan ketenanganku yang utama.",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    next: "day1_ignore_result",
  },
  day1_ignore_result: {
    id: "day1_ignore_result",
    speaker: "Alya",
    text: "Beberapa jam kemudian, kegaduhan mereda setelah OSIS merilis bantahan resmi bahwa info itu hoaks. Aku selamat dari kepanikan, tapi beberapa teman menganggapku bersikap dingin dan kurang peduli pada nasib bersama.",
    characterLeft: "rina",
    characterLeftExpression: "sad",
    background: "classroom",
    next: "day1_event2_start",
  },

  // --- DAY 1: EVENT 1.2 (JAPRI RINA) ---
  day1_event2_start: {
    id: "day1_event2_start",
    speaker: "Alya",
    text: "Malam harinya di rumah. Saat aku bersiap untuk belajar, ada notifikasi chat masuk secara pribadi (PC) dari Rina. Dia tampak masih kebingungan dan ketakutan soal masa depannya di sekolah.",
    characterLeft: "none",
    characterRight: "none",
    background: "bed",
    bgmEffect: "ambient",
    next: "day1_event2_chat",
  },
  day1_event2_chat: {
    id: "day1_event2_chat",
    speaker: "Rina",
    text: "[Chat WA]: Alya, maaf banget ganggu malam-malam... Kamu percaya nggak sih soal rumor miring tadi siang? Aku kepikiran terus sampai nggak bisa makan nih. Soalnya kalau beasiswaku bermasalah, aku takut nggak bisa lanjut sekolah...",
    characterLeft: "rina",
    characterLeftExpression: "sad",
    background: "chat_bg",
    next: "day1_event2_choices",
  },
  day1_event2_choices: {
    id: "day1_event2_choices",
    speaker: "Alya",
    text: "Bagaimana caraku merespons kekhawatiran mendalam Rina demi ketenangannya?",
    characterLeft: "none",
    characterRight: "none",
    background: "bed",
    choices: [
      {
        text: "Kirim Kalimat Penenang: 'Rin, info itu udah fix hoaks kok. Jangan kepikiran ya, dapet info dari OSIS langsung. Kamu mending tidur, besok kita tanya guru BK bareng.'",
        nextNodeId: "day1_event2_comfort",
        reputationChange: 5,
        trustChange: 15,
        mentalChange: 15
      },
      {
        text: "Komporin: 'Duh Rin, kayaknya di sekolah ini emang rada mencurigakan sih. Mending kamu tetep waspada, siapa tahu ada benarnya loh.'",
        nextNodeId: "day1_event2_worry",
        reputationChange: -5,
        trustChange: -15,
        mentalChange: -15
      }
    ]
  },

  day1_event2_comfort: {
    id: "day1_event2_comfort",
    speaker: "Rina",
    text: "Ya ampun, makasih banyakk ya Al... Kata-kata kamu bikin aku jauh lebih tenang. Makasih udah mau meluangkan waktu dengerin curhatanku. Sampai jumpa besok pagi di sekolah!",
    characterRight: "rina",
    characterRightExpression: "laugh",
    background: "bed",
    next: "day2_start",
  },
  day1_event2_worry: {
    id: "day1_event2_worry",
    speaker: "Rina",
    text: "Duh... beneran ya? Kepalaku langsung pusing banget dengernya... Aku jadi gak bisa tidur malam ini membayangkan hal-hal buruk... Tapi makasih infonya ya Alya.",
    characterRight: "rina",
    characterRightExpression: "sad",
    background: "bed",
    next: "day2_start",
  },

  // --- DAY 2: CYBERBULLYING ---
  day2_start: {
    id: "day2_start",
    speaker: "Alya",
    text: "Hari 2 – Kecanduan dan Cyberbullying. Semalam aku cuma tidur 3 jam karena keasyikan scrolling feeds gosip tanpa henti sampai jam 2 pagi. Kepalaku pening dan mataku merah, tapi jariku reflek membuka InstaTRACE tiap ada waktu renggang. Begitu sampai di gerbang sekolah, lorong terasa sepi tapi sunyi digitalnya berisik sekali...",
    characterLeft: "none",
    characterRight: "none",
    background: "school_gate",
    bgmEffect: "tension",
    next: "day2_scene_1",
  },
  day2_scene_1: {
    id: "day2_scene_1",
    speaker: "Alya",
    text: "Sebuah akun gosip anonim sekolah bernama '@lambe_trace' baru saja mengunggah foto candid Rina yang sedang tertidur pulas dengan mulut agak terbuka di pojok kelas kemarin sore, lengkap dengan tulisan menghina.",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    next: "day2_scene_chat",
  },
  day2_scene_chat: {
    id: "day2_scene_chat",
    speaker: "Fino",
    text: "Hahaha, Al, cepetan liat postingan lambe! Sumpah itu komuk si Rina absurd abis! Kocak parah sih ini. Anak-anak di kolom komentar pada bikin meme dan nge-roast dia habis-habisan!",
    characterLeft: "fino",
    characterLeftExpression: "laugh",
    background: "classroom",
    next: "day2_comment_show",
  },
  day2_comment_show: {
    id: "day2_comment_show",
    speaker: "Alya",
    text: "Aku membaca komentar-komentar netizen sekolah: 'Mancing laler tuh', 'Dih jorok banget cewek kayak gitu', 'Gak ada anggun-anggunnya sama sekali'. Rina duduk di kursinya paling belakang, menelungkupkan kepalanya di atas meja, pundaknya bergetar pertanda dia sedang menangis.",
    characterLeft: "rina",
    characterLeftExpression: "sad",
    background: "classroom",
    next: "event_2_1_choices",
  },
  event_2_1_choices: {
    id: "event_2_1_choices",
    speaker: "Alya",
    text: "Fino dan Geng Populer mengajakku ikut berkomentar nyinyir agar ikut meramaikan suasana. Apa sikap yang akan kutunjukkan?",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    choices: [
      {
        text: "Laporkan & Dukung: Laporkan (report) postingan akun gosip itu, lalu hampiri Rina untuk menghiburnya.",
        nextNodeId: "day2_report_support",
        achievementId: "true_friend",
        reputationChange: 10,
        trustChange: 20,
        mentalChange: 15
      },
      {
        text: "Ikut Menertawakan: Beri komentar lelucon ringan atau emoji ngakak biar tidak dibilang 'kaku' oleh teman-teman populer.",
        nextNodeId: "day2_join_laugh",
        reputationChange: -10,
        trustChange: -25,
        mentalChange: -20
      },
      {
        text: "Hujat Balik Pelaku: Tulis komentar kasar menyerang dan memaki admin akun gosip tersebut di kolom komentar secara frontal.",
        nextNodeId: "day2_flame_war",
        reputationChange: -15,
        trustChange: 5,
        mentalChange: -10
      }
    ]
  },

  day2_report_support: {
    id: "day2_report_support",
    speaker: "Alya",
    text: "Aku segera menolak ajakan Fino dan malah menekan tombol 'Report Post' di aplikasi Instasham atas dasar perundungan. Setelah itu, aku menggeser kursiku mendekati meja Rina, mengusap pundaknya dengan tulus.",
    characterLeft: "rina",
    characterLeftExpression: "sad",
    background: "classroom",
    bgmEffect: "sad",
    next: "day2_support_rina",
  },
  day2_support_rina: {
    id: "day2_support_rina",
    speaker: "Alya",
    text: "'Rin, jangan dengerin mulut-mulut sampah itu ya. Foto itu cuma kecerobohan kecil, semua orang juga pernah tidur di kelas. Aku udah nge-report postingannya kok, semoga cepet di-take down.' Rina mendongak, matanya yang basah menatapku penuh rasa terima kasih.",
    characterLeft: "rina",
    characterLeftExpression: "blush",
    background: "classroom",
    next: "day2_event2_trigger",
  },

  day2_join_laugh: {
    id: "day2_join_laugh",
    speaker: "Alya",
    text: "Karena takut dikucilkan dari geng hits, aku ikut mengetik komentar: 'Wkwk laler ijo auto mendarat tuh 😂'. Fino menepuk bahuku gembira sambil memuji komentarku yang dibilang savage.",
    characterLeft: "fino",
    characterLeftExpression: "smug",
    background: "classroom",
    next: "day2_join_laugh_regret",
  },
  day2_join_laugh_regret: {
    id: "day2_join_laugh_regret",
    speaker: "Alya",
    text: "Namun sesaat kemudian, aku melihat Rina sempat melirik layar HP-nya, membaca komentarku, lalu menatapku dengan sorot mata terluka yang sangat dalam sebelum menangis tersedu-sedu. Dadaku mendadak terasa sesak oleh penyesalan.",
    characterLeft: "rina",
    characterLeftExpression: "serious",
    background: "classroom",
    next: "day2_event2_trigger",
  },

  day2_flame_war: {
    id: "day2_flame_war",
    speaker: "Alya",
    text: "Dengan penuh emosi, aku mengetik komentar kasar: 'Woi admin tolol miskin moral! Gak ada kerjaan ya selain sebar foto aib orang?! Otak ditaruh di mana hah?!'. Aku berniat membela, tapi caraku memicu ajang keributan baru.",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    next: "day2_flame_war_fail",
  },
  day2_flame_war_fail: {
    id: "day2_flame_war_fail",
    speaker: "Alya",
    text: "Kolom komentar berubah menjadi ajang perang kata-kata. Admin lambe_trace menyerangku balik dengan mempublikasikan profilku dan mengolok-olokku sebagai pahlawan kesiangan. Notifikasi HP-ku dibanjiri komentar jahat dari akun palsu, membuat mentalku sangat tertekan.",
    characterLeft: "fino",
    characterLeftExpression: "shocked",
    background: "classroom",
    next: "day2_event2_trigger",
  },

  // --- DAY 2: EVENT 2.2 Curhat Malam Rina ---
  day2_event2_trigger: {
    id: "day2_event2_trigger",
    speaker: "Alya",
    text: "Malam harinya di kamar. Kepalaku pening memikirkan kejadian cyberbullying di sekolah tadi siang. Beruntung, postingan tersebut akhirnya dihapus oleh admin setelah dilaporkan massal. Tiba-tiba Rina mengirim pesan teks panjang.",
    characterLeft: "none",
    characterRight: "none",
    background: "bed",
    bgmEffect: "sad",
    next: "day2_event2_chat_box",
  },
  day2_event2_chat_box: {
    id: "day2_event2_chat_box",
    speaker: "Rina",
    text: "[Chat WA]: Alya, aku kayaknya nggak kuat lagi bertahan di kelas itu... Rasanya besok aku mau pura-pura sakit aja biar nggak usah masuk sekolah. Aku malu banget, serasa seluruh koridor bakal ngetawain aku...",
    characterLeft: "rina",
    characterLeftExpression: "sad",
    background: "chat_bg",
    next: "day2_event2_choices",
  },
  day2_event2_choices: {
    id: "day2_event2_choices",
    speaker: "Alya",
    text: "Bagaimana tanggapanku untuk menolong kestabilan jiwa Rina dari depresi akibat bullying?",
    characterLeft: "none",
    characterRight: "none",
    background: "bed",
    choices: [
      {
        text: "Dampingi ke BK: 'Rin, jangan menyerah ya. Besok aku anterin kamu ke Bu Rahma Guru BK. Beliau baik banget, biar akun lambe itu diusut sekalian. Aku bakal nemenin kamu terus.'",
        nextNodeId: "day2_event2_comfort_step",
        reputationChange: 15,
        trustChange: 20,
        mentalChange: 15
      },
      {
        text: "Sikap Cuek/Meremehkan: 'Halah Rin, nggak usah baperan napa. Namanya juga sosmed, besok juga mereka udah lupa kalo ada gosip baru. Dibawa santai aja kali.'",
        nextNodeId: "day2_event2_dismiss_step",
        reputationChange: -5,
        trustChange: -20,
        mentalChange: -15
      }
    ]
  },

  day2_event2_comfort_step: {
    id: "day2_event2_comfort_step",
    speaker: "Rina",
    text: "Alya... kamu baik banget... Makasih banyak ya udah peduli sama aku di saat yang lain cuma mau ngetawain. Oke, besok pagi kita ke ruang BK bareng ya. Selamat istirahat.",
    characterRight: "rina",
    characterRightExpression: "blush",
    background: "bed",
    next: "day3_start",
  },
  day2_event2_dismiss_step: {
    id: "day2_event2_dismiss_step",
    speaker: "Rina",
    text: "Oh... begitu ya... Mungkin emang aku aja yang terlalu berlebihan. Maaf ya udah nyampah curhat sama kamu... Aku tidur duluan.",
    characterRight: "rina",
    characterRightExpression: "sad",
    background: "bed",
    next: "day3_start",
  },

  // --- DAY 3: PHISHING ---
  day3_start: {
    id: "day3_start",
    speaker: "Alya",
    text: "Hari 3 – Jebakan Dopamin Phishing. Pagi ini, bahkan sebelum mengusap mataku, tanganku langsung meraba mencari ponsel di samping bantal. Seperti terkena hipnotis, aku scroll feed InstaTRACE demi mendapatkan sedikit kepuasan angka likes. Tapi di sela-sela rasa ngantuk, muncul notifikasi Direct Message dari '@fino.trg01'. Sangat mirip dengan akun Fino.",
    characterLeft: "none",
    characterRight: "none",
    background: "street",
    bgmEffect: "ambient",
    next: "day3_scene_1",
  },
  day3_scene_1: {
    id: "day3_scene_1",
    speaker: "Sistem",
    text: "[DM Instasham]: Selamat! Akun Anda terpilih memenangkan Giveaway Diamond Game Online / Voucher Belanja Rp1.500.000 dari SMAN TRACE! Silakan verifikasi akun dengan klik link secure-trace-scholarship.com dan kirimkan kode verifikasi OTP yang masuk ke nomor WA Anda!",
    characterLeft: "none",
    characterRight: "none",
    background: "chat_bg",
    next: "day3_scene_2",
  },
  day3_scene_2: {
    id: "day3_scene_2",
    speaker: "Alya",
    text: "Aku baru saja menerima SMS di HP berisi kode transaksional 6 digit OTP. Pengirim pesan giveaway tersebut mendesakku: 'Kirim kodenya sekarang kak, kuota pemenang cuma sisa 1 orang lagi! Kalo telat angus!'",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    next: "event_3_1_choices",
  },
  event_3_1_choices: {
    id: "event_3_1_choices",
    speaker: "Alya",
    text: "Situs itu tampak memajang logo sekolah kita agar dipercaya. Namun kode OTP tersebut bertuliskan peringatan 'Jangan berikan kode ini kepada SIAPAPUN'. Apa tindakanku?",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    choices: [
      {
        text: "Curiga & Blokir: Abaikan DM tersebut, blokir akun penipu, dan langsung kabari Fino asli untuk klarifikasi akun kloningnya.",
        nextNodeId: "day3_block_phish",
        achievementId: "cyber_shield",
        reputationChange: 10,
        securityChange: 30,
        trustChange: 10,
        mentalChange: 10
      },
      {
        text: "Kirim OTP: Siapa cepat dia dapat! Segera masukkan nomor ponselku dan serahkan 6 digit kode OTP demi hadiah instan.",
        nextNodeId: "day3_give_otp",
        reputationChange: -10,
        securityChange: -45,
        trustChange: -15,
        mentalChange: -20
      }
    ]
  },

  day3_block_phish: {
    id: "day3_block_phish",
    speaker: "Alya",
    text: "Aku tidak termakan umpan manis tersebut. Aku segera mematikan tautan dan melapor ke Fino lewat sambungan telepon biasa. Fino kaget karena ternyata akun Instasham lamanya baru saja dibajak hacker.",
    characterLeft: "fino",
    characterLeftExpression: "shocked",
    background: "classroom",
    next: "day3_block_phish_speak",
  },
  day3_block_phish_speak: {
    id: "day3_block_phish_speak",
    speaker: "Fino",
    text: "Sumpah makasih banyak, Al! Berkat kamu ngasih tahu cepet, aku bisa bikin story klarifikasi di akun baruku biar anak angkatan nggak ada yang ketipu mengirimkan OTP. Rekening ortu temenku ada yang hampir kebobolan loh!",
    characterLeft: "fino",
    characterLeftExpression: "serious",
    background: "classroom",
    next: "day3_event2_start",
  },

  day3_give_otp: {
    id: "day3_give_otp",
    speaker: "Alya",
    text: "Tergiur khayalan voucher gratis, aku menyalin kode OTP tersebut ke dalam formulir situs gelap itu. Detik berikutnya... layarku berkedip merah gila-gilaan. Akses keluar dari WhatsAppku terputus total!",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    bgmEffect: "action",
    sfxEffect: "fail",
    next: "day3_give_otp_disaster",
  },
  day3_give_otp_disaster: {
    id: "day3_give_otp_disaster",
    speaker: "Alya",
    text: "Sial! Akun WhatsAppku berhasil dibajak komplotan penipu. Hacker tersebut menggunakan profilku untuk mengirimkan pesan penipuan pinjaman online dan spam pornografi kasar ke seluruh kontak di HP-ku, termasuk nomer guru-guru sekolah! Aku hancur seketika.",
    characterLeft: "fino",
    characterLeftExpression: "shocked",
    background: "classroom",
    next: "day3_event2_start",
  },

  // --- DAY 3: EVENT 3.2 (REKTORAT / SINKRONISASI BEASISWA) ---
  day3_event2_start: {
    id: "day3_event2_start",
    speaker: "Alya",
    text: "Beberapa jam setelah kegemparan phishing berlalu. Saat aku mencoba menstabilkan kembali akun-akun sosial mediaku, muncul pesan lain di SMS biasa. Kali ini pengirimnya menyamar sebagai 'Admin Pusat Data Beasiswa Diknas TRACE'.",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    bgmEffect: "tension",
    next: "day3_event2_chat",
  },
  day3_event2_chat: {
    id: "day3_event2_chat",
    speaker: "Penipu Penyamar",
    text: "[Pesan SMS]: Verifikasi data darurat! Akun beasiswa Anda akan dibekukan permanen malam ini jika Anda tidak menyetorkan NIK Orang Tua, Foto Kartu Keluarga, dan nama ibu kandung demi sinkronisasi sistem cloud.",
    characterLeft: "none",
    characterRight: "none",
    background: "chat_bg",
    next: "day3_event2_choices",
  },
  day3_event2_choices: {
    id: "day3_event2_choices",
    speaker: "Alya",
    text: "Ancaman pembekuan tersebut terlihat menakutkan, namun meminta informasi sangat sensitif (nama ibu kandung, KK). Apa keputusanku?",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    choices: [
      {
        text: "Tolak & Edukasi: Abaikan SMS itu, lalu buat postingan edukasi di status sosial mediaku agar teman-teman waspada bahaya social engineering.",
        nextNodeId: "day3_refuse_data",
        reputationChange: 15,
        securityChange: 20,
        trustChange: 15,
        mentalChange: 10
      },
      {
        text: "Kirim Data Identitas: Karena panik beasiswa hangus, aku mengirimkan foto Kartu Keluarga dan nama ibu kandung ke nomor tidak dikenal itu.",
        nextNodeId: "day3_send_data",
        reputationChange: -10,
        securityChange: -35,
        trustChange: -15,
        mentalChange: -20
      }
    ]
  },

  day3_refuse_data: {
    id: "day3_refuse_data",
    speaker: "Alya",
    text: "Aku menolak keras! Aku mengambil tangkapan layar (screenshot) SMS penipuan tersebut, memberi coretan tanda silang merah bertuliskan 'HOAKS / PHISHING', lalu membagikannya ke status WhatsApp dan Instasham.",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    next: "day3_refuse_success",
  },
  day3_refuse_success: {
    id: "day3_refuse_success",
    speaker: "Alya",
    text: "Banyak teman-teman seangkatan dan wali murid memposting ulang edukasiku. Komite sekolah mengapresiasi tindakanku yang berani menyebarkan literasi cyber secara nyata di kalangan siswa baru.",
    characterLeft: "rina",
    characterLeftExpression: "laugh",
    background: "classroom",
    next: "day4_start",
  },

  day3_send_data: {
    id: "day3_send_data",
    speaker: "Alya",
    text: "Di bawah tekanan cemas, aku memotret KK ayahku dan mengetik nama ibu kandungku lalu mengirimkannya. Keesokan harinya, malapetaka baru pecah.",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    bgmEffect: "action",
    sfxEffect: "fail",
    next: "day3_send_data_failure",
  },
  day3_send_data_failure: {
    id: "day3_send_data_failure",
    speaker: "Alya",
    text: "Data-data penting tersebut disalahgunakan penjahat untuk mendaftarkan pinjaman online (pinjol) ilegal jaringan internasional atas nama ibuku. Berondongan telepon penagih utang kejam meneror kontak keluarga kami, merusak kebahagiaan rumah dan membuat mentalku runtuh sehancur-hancurnya.",
    characterLeft: "fino",
    characterLeftExpression: "shocked",
    background: "classroom",
    next: "day4_start",
  },

  // --- DAY 4: JEJAK DIGITAL & KONSEKUENSI ---
  day4_start: {
    id: "day4_start",
    speaker: "Alya",
    text: "Hari 4 – Penat & Pertanggungjawaban. 4 hari berlalu, dan aku merasa sangat lelah fisik-mental karena online burnout. Keinginan konstan me-refresh feed tiap beberapa detik membuat dadaku sering berdegub kencang tanpa alasan. Di tengah kondisi penatku itu, tiba-tiba namaku dipanggil keras lewat pengeras suara sekolah oleh BK.",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    bgmEffect: "tension",
    next: "day4_bk_arrive",
  },
  day4_bk_arrive: {
    id: "day4_bk_arrive",
    speaker: "Alya",
    text: "Aku berjalan menuju ruang Bimbingan Konseling (BK) dengan langkah berat. Di dalam ruangan ber-AC dingin itu, duduk Bu Rahma—guru BK yang terkenal teliti namun objektif. Di atas meja kerjanya, sebuah laptop menyala menampilkan tab rekam jejak cyber.",
    characterLeft: "none",
    characterRight: "none",
    background: "bk_room",
    next: "day4_bk_session",
  },
  day4_bk_session: {
    id: "day4_bk_session",
    speaker: "Bu Rahma (Guru BK)",
    text: "Mari duduk, Alya. Ibu sengaja memanggilmu ke sini. Ibu sedang memantau profil siswa-siswi angkatan baru. Sebagai generasi digital, setiap ketukan jempolmu di media sosial membentuk profil kepribadianmu di dunia nyata. Mari kita evaluasi jejak karyamu.",
    characterRight: "gurubk",
    characterRightExpression: "serious",
    background: "bk_room",
    next: "day4_bk_choices",
  },
  day4_bk_choices: {
    id: "day4_bk_choices",
    speaker: "Alya",
    text: "Bu Rahma memperlihatkan beberapa cuplikan screenshoot aksi-aksi sosial mediaku beberapa hari ini. Beliau bertanya: 'Alya, bagaimana pandanganmu tentang tanggung jawab moral siswa terhadap jejak digital mereka sendiri?'",
    characterRight: "gurubk",
    characterRightExpression: "default",
    background: "bk_room",
    choices: [
      {
        text: "Jawab dengan Bijak & Jujur: 'Setiap klik adalah tanggung jawab murni kita, Bu. Saya sadar tindakan cyber kita berdampak nyata bagi orang lain dan diri sendiri.'",
        nextNodeId: "day4_bk_responsible",
        reputationChange: 15,
        trustChange: 10,
        mentalChange: 10
      },
      {
        text: "Egois & Defensif: 'Ah, kan itu cuma dunia maya gratisan, Bu. Gak ada hubungannya sama kepribadian nyata saya di sekolah. Sekolah lebay banget ngurusin sosmed siswa.'",
        nextNodeId: "day4_bk_defensive",
        reputationChange: -15,
        trustChange: -15,
        mentalChange: -15
      }
    ]
  },

  day4_bk_responsible: {
    id: "day4_bk_responsible",
    speaker: "Bu Rahma (Guru BK)",
    text: "Jawaban yang sangat dewasa, Alya. Ibu bangga mendengarnya. Sikap tanggung jawab dan kesadaran diri seperti inilah yang membedakan remaja berakal sehat dari sekadar pengguna internet musiman.",
    characterRight: "gurubk",
    characterRightExpression: "default",
    background: "bk_room",
    next: "day4_assessment_transit",
  },
  day4_bk_defensive: {
    id: "day4_bk_defensive",
    speaker: "Bu Rahma (Guru BK)",
    text: "Ibu sangat menyayangkan sudut pandang sempitmu itu, Alya. Dunia digital adalah cerminan karakter terdalam manusia. Jika di ruang maya kamu bisa sembrono dan merugikan orang lain, maka kamu tidak layak memegang amanah besar.",
    characterRight: "gurubk",
    characterRightExpression: "serious",
    background: "bk_room",
    next: "day4_assessment_transit",
  },

  day4_assessment_transit: {
    id: "day4_assessment_transit",
    speaker: "Bu Rahma (Guru BK)",
    text: "Baiklah... Ibu telah merekapitulasi seluruh skor reputasi cybersphere, kepatuhan keamanan digital, kepercayaan dari komunitas teman sekelasmu, dan stabilitas kesehatan mentalmu selama 4 hari ini di SMA TRACE.",
    characterRight: "gurubk",
    characterRightExpression: "serious",
    background: "bk_room",
    bgmEffect: "tension",
    next: "day4_assessment_calculation",
  },
  day4_assessment_calculation: {
    id: "day4_assessment_calculation",
    speaker: "Bu Rahma (Guru BK)",
    text: "Baiklah, sesi hari ini cukup dulu. Ibu harap kamu merenungkan semua yang kita diskusikan. Rekam jejak digitalmu terus terekam—setiap harinya. Kamu boleh kembali ke kelas dulu.",
    characterRight: "gurubk",
    characterRightExpression: "default",
    background: "bk_room",
    next: "day5_start",
  },

  // --- DAY 5: JEJAK DIGITAL — POSTINGAN LAMA MUNCUL KEMBALI ---
  day5_start: {
    id: "day5_start",
    speaker: "Alya",
    text: "Hari 5 – Jejak yang Tak Bisa Dihapus. Lima hari setelah semua kekacauan digital itu, aku mengira semuanya sudah terlupakan. Tapi pagi ini, saat membuka InstaTRACE seperti biasa, aku mendapati nama Alyaputri Zahran—namaku—tiba-tiba kembali ramai diperbincangkan.",
    characterLeft: "none",
    characterRight: "none",
    background: "bed",
    bgmEffect: "tension",
    sfxEffect: "phone_ring",
    next: "day5_discovery",
  },
  day5_discovery: {
    id: "day5_discovery",
    speaker: "Alya",
    text: "Seseorang membuat utas (thread) panjang yang mengarsipkan semua konten yang pernah aku posting sejak hari pertama: cuplikan saat aku sempat menyebar link hoaks, komentar sarkastis di postingan Rina, dan tangkapan layar chat yang sudah kuhapus sekalipun. Semuanya tersimpan rapi oleh orang asing.",
    characterLeft: "none",
    characterRight: "none",
    background: "chat_bg",
    bgmEffect: "tension",
    next: "day5_fino_message",
  },
  day5_fino_message: {
    id: "day5_fino_message",
    speaker: "Fino",
    text: "[Chat WA]: Al, lo udah lihat thread di InstaTRACE belum? Ada yang nge-recap semua 'highlight' minggu pertama kita. Dan... nama lo lumayan banyak muncul di sana. Beberapa anak angkatan ngomongin ini di grup yang lo gak ada di sana. Santai aja sih, tapi gw kasih tau dulu biar lo siap.",
    characterLeft: "fino",
    characterLeftExpression: "serious",
    background: "chat_bg",
    next: "day5_event1_setup",
  },
  day5_event1_setup: {
    id: "day5_event1_setup",
    speaker: "Alya",
    text: "Jantungku berdegub kencang. Aku membaca ulasan demi ulasan di thread tersebut. Mayoritas netizen sekolah menyoroti tindakanku di hari-hari awal. Ini adalah akibat nyata dari jejak digital yang tak pernah benar-benar hilang. Sekarang semua orang tahu—dan mereka menunggu responsiku.",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    choices: [
      {
        text: "Minta Maaf Terbuka: Buat postingan resmi meminta maaf secara tulus kepada Rina dan semua pihak yang terdampak, disertai penjelasan bahwa aku sudah belajar banyak dari kesalahan.",
        nextNodeId: "day5_apologize",
        reputationChange: 20,
        trustChange: 25,
        mentalChange: 10,
      },
      {
        text: "Menyalahkan Orang Lain: Reply thread tersebut dengan membela diri dan menyalahkan Fino yang pertama kali menyebar hoaks, agar perhatian beralih dari kesalahanku.",
        nextNodeId: "day5_deflect",
        reputationChange: -20,
        trustChange: -30,
        mentalChange: -15,
      },
    ],
  },

  // EVENT 5.1 — BRANCH A: Minta Maaf Terbuka
  day5_apologize: {
    id: "day5_apologize",
    speaker: "Alya",
    text: "Dengan tangan gemetar, aku mengetik permintaan maaf yang jujur di caption postingan InstaTRACE-ku. Aku menyebut nama Rina secara langsung, menjelaskan bahwa aku telah salah, dan menegaskan bahwa aku tidak akan mengulanginya. Tidak ada pembelaan diri, tidak ada 'tapi'.",
    characterLeft: "none",
    characterRight: "none",
    background: "bed",
    bgmEffect: "sad",
    next: "day5_apologize_response",
  },
  day5_apologize_response: {
    id: "day5_apologize_response",
    speaker: "Rina",
    text: "[DM InstaTRACE]: Alya... postinganmu tadi aku baca berkali-kali. Aku nangis, tapi bukan karena marah. Kamu satu-satunya yang berani minta maaf secara terbuka. Yang lain diam saja. Makasih sudah jujur.",
    characterLeft: "rina",
    characterLeftExpression: "blush",
    background: "chat_bg",
    next: "day5_lesson_reveal",
  },

  // EVENT 5.1 — BRANCH B: Menyalahkan Orang Lain
  day5_deflect: {
    id: "day5_deflect",
    speaker: "Alya",
    text: "Dengan panik, aku membalas thread itu: 'Yang mulai hoaks itu Fino duluan, bukan aku. Gue cuma ikutan. Salah sendiri percaya info abal-abal.' Nama Fino langsung ramai diserang di kolom komentar.",
    characterLeft: "fino",
    characterLeftExpression: "shocked",
    background: "chat_bg",
    bgmEffect: "action",
    next: "day5_deflect_consequence",
  },
  day5_deflect_consequence: {
    id: "day5_deflect_consequence",
    speaker: "Fino",
    text: "[Chat WA — Dibaca, Tapi Tidak Dibalas]. Aku mencoba menghubungi Fino untuk menjelaskan, tapi pesanku hanya centang dua—dibaca tanpa balasan. Di grup kelas, orang-orang mulai mempertanyakan karakterku yang melempar kesalahan kepada teman sendiri demi selamat.",
    characterLeft: "fino",
    characterLeftExpression: "sad",
    background: "chat_bg",
    next: "day5_lesson_reveal",
  },

  // EVENT 5.2 — BK MEMANGGIL (convergence node)
  day5_lesson_reveal: {
    id: "day5_lesson_reveal",
    speaker: "Alya",
    text: "Siang itu, pengeras suara kembali memanggil namaku ke ruang BK. Kali ini Bu Rahma sudah tahu soal thread viral tersebut. Laptop di mejanya terbuka menampilkan arsip postinganku. Inilah kenyataan jejak digital: ia tidak menghilang hanya karena kamu menekan tombol hapus.",
    characterLeft: "none",
    characterRight: "none",
    background: "school_gate",
    bgmEffect: "tension",
    next: "day5_bk_confrontation",
  },
  day5_bk_confrontation: {
    id: "day5_bk_confrontation",
    speaker: "Bu Rahma (Guru BK)",
    text: "Alya, Ibu sudah melihat thread yang beredar itu. Ibu ingin kamu tahu—konten yang pernah kamu unggah, bahkan yang sudah kamu hapus sekalipun, bisa tersimpan di cache browser, screenshot, atau diarsipkan oleh pihak ketiga. Ini yang disebut jejak digital permanen.",
    characterRight: "gurubk",
    characterRightExpression: "serious",
    background: "bk_room",
    next: "day5_bk_question",
  },
  day5_bk_question: {
    id: "day5_bk_question",
    speaker: "Bu Rahma (Guru BK)",
    text: "Pertanyaannya bukan 'apakah orang lain akan menemukannya', tapi 'apakah kamu siap bertanggung jawab atas setiap konten yang kamu buat?' Karena internet mengingat segalanya. Lalu, apa yang akan kamu lakukan mulai sekarang?",
    characterRight: "gurubk",
    characterRightExpression: "default",
    background: "bk_room",
    choices: [
      {
        text: "Berkomitmen Berubah: 'Saya akan berpikir minimal dua kali sebelum memposting apapun, Bu. Dan saya akan memastikan setiap konten yang saya buat mencerminkan nilai yang ingin saya tinggalkan sebagai jejak digital saya.'",
        nextNodeId: "day5_commit_change",
        reputationChange: 15,
        trustChange: 10,
        mentalChange: 15,
      },
      {
        text: "Mengelak & Pasrah: 'Ya mau gimana lagi Bu, nasi sudah jadi bubur. Lagian kalau mau dihapus juga percuma kan? Gak ada gunanya berusaha kalau jejak digitalnya sudah terlanjur ada.'",
        nextNodeId: "day5_give_up",
        reputationChange: -10,
        trustChange: -10,
        mentalChange: -20,
      },
    ],
  },

  // EVENT 5.2 — BRANCH A: Berkomitmen
  day5_commit_change: {
    id: "day5_commit_change",
    speaker: "Bu Rahma (Guru BK)",
    text: "Ibu senang mendengarnya, Alya. Kesadaran seperti itu adalah modal terbesar dalam dunia digital. Ingat: jejak digitalmu bisa menjadi portofolio karakter terbaik—atau terburuk—yang pernah ada. Pilihannya ada di tanganmu setiap kali jempolmu menyentuh layar.",
    characterRight: "gurubk",
    characterRightExpression: "default",
    background: "bk_room",
    bgmEffect: "ambient",
    next: "day5_closing",
  },

  // EVENT 5.2 — BRANCH B: Menyerah
  day5_give_up: {
    id: "day5_give_up",
    speaker: "Bu Rahma (Guru BK)",
    text: "Ibu sangat menyayangkan sikapmu itu. Justru karena jejak lama sudah ada, kamu punya tanggung jawab lebih besar untuk membangun jejak baru yang lebih baik. Kamu tidak bisa menghapus masa lalu, tapi kamu bisa mendefinisikan masa depan digitalmu.",
    characterRight: "gurubk",
    characterRightExpression: "serious",
    background: "bk_room",
    bgmEffect: "sad",
    next: "day5_closing",
  },

  // DAY 5 CLOSING — lanjut ke Hari 6
  day5_closing: {
    id: "day5_closing",
    speaker: "Alya",
    text: "Aku keluar dari ruang BK membawa beban yang berbeda dari sebelumnya. Bukan beban rasa malu—melainkan beban kesadaran. Satu semester di SMA TRACE hampir usai. Semua jejak digital yang kutinggalkan selama ini akan menjadi cerminan nyata siapa aku sebenarnya.",
    characterLeft: "none",
    characterRight: "none",
    background: "school_gate",
    bgmEffect: "tension",
    next: "day6_start",
  },

  // ══════════════════════════════════════════════════════════════════
  // --- DAY 6: KESEHATAN MENTAL & DOOMSCROLLING ---
  // Tema: FOMO, doom scrolling, perbandingan sosial, burnout digital
  // ══════════════════════════════════════════════════════════════════

  day6_start: {
    id: "day6_start",
    speaker: "Alya",
    text: "Hari 6 – Spiral Doomscrolling. Jam 23.47. Aku masih terjaga, rebahan di kasur dalam gelap total, dengan layar ponsel menyinari wajahku. Sudah 3 jam lebih aku scroll tanpa henti—video demi video, postingan demi postingan, stories demi stories. Tangan terus bergerak sendiri, bahkan saat mataku sudah terasa perih.",
    characterLeft: "none",
    characterRight: "none",
    background: "bed",
    bgmEffect: "sad",
    sfxEffect: "beep",
    next: "day6_fomo_trigger",
  },

  day6_fomo_trigger: {
    id: "day6_fomo_trigger",
    speaker: "Alya",
    text: "Di feedku muncul foto-foto teman sekelas yang nongkrong bareng di café malam ini—tanpa mengajakku. Fino, beberapa anak ekskul, bahkan Rina tampak tertawa lepas di sana. Caption-nya: 'Best squad, no cap 🔥'. Dadaku tiba-tiba terasa sesak.",
    characterLeft: "rina",
    characterLeftExpression: "laugh",
    background: "chat_bg",
    bgmEffect: "sad",
    next: "day6_inner_spiral",
  },

  day6_inner_spiral: {
    id: "day6_inner_spiral",
    speaker: "Alya",
    text: "Pikiranku mulai berputar liar: 'Kenapa aku tidak diajak? Apa mereka tidak menyukaiku? Apa aku terlalu aneh? Apa ini akibat semua drama digital minggu lalu?' Tanganku reflek membuka profil mereka satu per satu, membandingkan—likes mereka, followers mereka, kehidupan mereka.",
    characterLeft: "none",
    characterRight: "none",
    background: "bed",
    next: "day6_event1_choice",
  },

  // ── EVENT 6.1: FOMO & DOOMSCROLLING ─────────────────────────────
  day6_event1_choice: {
    id: "day6_event1_choice",
    speaker: "Alya",
    text: "Notifikasi ponselku berbunyi: baterai tinggal 15%. Sudah hampir tengah malam. Aku sadar aku sudah scroll selama lebih dari 3 jam dan belum belajar untuk ulangan besok. Tapi FOMO ini masih mencengkeramku kuat—takut ketinggalan update berikutnya.",
    characterLeft: "none",
    characterRight: "none",
    background: "bed",
    choices: [
      {
        text: "Terus Scroll: Abaikan baterai dan jam. Terus pantau update mereka—siapa tahu ada info penting yang ketinggalan. Belajar bisa besok pagi sebelum sekolah.",
        nextNodeId: "day6_keep_scrolling",
        mentalChange: -20,
        trustChange: -5,
      },
      {
        text: "Paksa Istirahat: Taruh ponsel menghadap bawah, colokkan charger, dan tutup mata. Reminder diri: kehidupan orang lain di media sosial bukan ukuran hidupmu.",
        nextNodeId: "day6_rest",
        mentalChange: 20,
        trustChange: 5,
      },
    ],
  },

  // ── BRANCH A: Terus Scroll ────────────────────────────────────────
  day6_keep_scrolling: {
    id: "day6_keep_scrolling",
    speaker: "Alya",
    text: "Aku terus scroll. Jam 01.30 dini hari. Makin banyak yang kulihat, makin besar rasa tidak cukupnya—kehidupan mereka terlihat sempurna, sementara aku sendirian di kamar gelap ini. Saat alarm berbunyi jam 05.30, mataku terasa berat sekali. Aku bahkan tidak ingat kapan tertidur.",
    characterLeft: "none",
    characterRight: "none",
    background: "bed",
    bgmEffect: "sad",
    sfxEffect: "fail",
    next: "day6_morning_crash",
  },

  day6_morning_crash: {
    id: "day6_morning_crash",
    speaker: "Alya",
    text: "Di kelas, kepalaku berdenyut. Pelajaran pertama terasa seperti suara di balik tembok kaca—samar dan tidak bermakna. Guru menanyakan sesuatu, tapi otakku kosong. Nilai kuis harianku hari ini paling buruk sejak masuk SMA TRACE.",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    bgmEffect: "tension",
    next: "day6_event2_setup",
  },

  // ── BRANCH B: Istirahat ───────────────────────────────────────────
  day6_rest: {
    id: "day6_rest",
    speaker: "Alya",
    text: "Aku meletakkan ponsel, mengambil napas panjang, dan mengingatkan diri sendiri: foto itu hanyalah highlight reel—bukan seluruh cerita kehidupan mereka. Aku mengatur alarm, menutup mata, dan akhirnya tertidur lebih cepat dari biasanya. Besok pagi, pikiranku terasa lebih jernih.",
    characterLeft: "none",
    characterRight: "none",
    background: "bed",
    bgmEffect: "ambient",
    next: "day6_morning_fresh",
  },

  day6_morning_fresh: {
    id: "day6_morning_fresh",
    speaker: "Alya",
    text: "Pagi harinya aku datang ke sekolah dengan kepala lebih ringan. Kuis harian berjalan lancar. Dan ternyata alasan mereka tidak mengajakku malam itu sederhana saja—itu acara mendadak dan grupnya keliru. Rina bahkan sudah mengirim pesan minta maaf sejak semalam.",
    characterLeft: "rina",
    characterLeftExpression: "blush",
    background: "classroom",
    bgmEffect: "ambient",
    next: "day6_event2_setup",
  },

  // ── EVENT 6.2: CURHAT KE TEMAN (convergence) ─────────────────────
  day6_event2_setup: {
    id: "day6_event2_setup",
    speaker: "Alya",
    text: "Jam istirahat. Rina menghampiriku di kantin dengan ekspresi sedikit bersalah. 'Al, gue ngerasa kamu akhir-akhir ini agak menarik diri. Lo baik-baik aja gak?' Tiba-tiba tenggorokanku tercekat. Pertanyaan sederhana itu menyentuh sesuatu yang sudah lama aku tahan.",
    characterLeft: "rina",
    characterLeftExpression: "serious",
    background: "classroom",
    bgmEffect: "sad",
    next: "day6_event2_choice",
  },

  day6_event2_choice: {
    id: "day6_event2_choice",
    speaker: "Alya",
    text: "Rina menatapku dengan tulus. Ini mungkin satu-satunya kesempatanku untuk jujur tentang apa yang selama ini kurasakan—tekanan sosial media, FOMO, insomnia, dan spiral perbandingan diri yang tidak ada habisnya. Atau aku bisa menutupnya dan pura-pura baik-baik saja.",
    characterLeft: "rina",
    characterLeftExpression: "default",
    background: "classroom",
    choices: [
      {
        text: "Curhat Jujur: Ceritakan semua pada Rina—tentang doomscrolling, FOMO malam tadi, dan betapa lelahnya terus membanding-bandingkan diri di sosial media. Minta sarannya.",
        nextNodeId: "day6_open_up",
        mentalChange: 25,
        trustChange: 20,
      },
      {
        text: "Tutup Diri: Pasang senyum palsu dan jawab 'Gak kenapa-kenapa kok, Rin. Gue baik-baik aja.' Kemudian ganti topik pembicaraan agar tidak dikejar pertanyaan lebih lanjut.",
        nextNodeId: "day6_shut_down",
        mentalChange: -15,
        trustChange: -10,
      },
    ],
  },

  // ── BRANCH A: Curhat Jujur ────────────────────────────────────────
  day6_open_up: {
    id: "day6_open_up",
    speaker: "Alya",
    text: "Aku menarik napas, lalu—untuk pertama kalinya—jujur sepenuhnya. Kuceritakan tentang malam-malam doomscrolling, FOMO yang menyiksa, dan bagaimana aku sering merasa tidak cukup baik dibanding orang lain di sosmed. Rina mendengarkan tanpa memotong satu kata pun.",
    characterLeft: "rina",
    characterLeftExpression: "serious",
    background: "classroom",
    bgmEffect: "sad",
    next: "day6_rina_wisdom",
  },

  day6_rina_wisdom: {
    id: "day6_rina_wisdom",
    speaker: "Rina",
    text: "'Al... gue juga ngerasain hal yang sama. Semua orang ngerasain itu—tapi gak ada yang mau ngaku duluan. Sosmed itu kayak kompetisi yang gak ada finish line-nya. Makasih udah percaya sama gue. Dan please, kalau lagi kayak gitu lagi, chat gue dulu sebelum scroll sampai pagi.'",
    characterLeft: "rina",
    characterLeftExpression: "blush",
    background: "classroom",
    bgmEffect: "ambient",
    next: "day6_closing",
  },

  // ── BRANCH B: Menutup Diri ────────────────────────────────────────
  day6_shut_down: {
    id: "day6_shut_down",
    speaker: "Alya",
    text: "'Gak kenapa-kenapa kok, Rin. Gue baik-baik aja.' Aku paksakan senyum. Rina menatapku sebentar dengan ekspresi tidak percaya, lalu mengangguk pelan. Obrolan kami menjadi canggung dan berakhir dalam beberapa menit. Aku merasa makin sepi—padahal bantuan ada di depan mata.",
    characterLeft: "rina",
    characterLeftExpression: "sad",
    background: "classroom",
    bgmEffect: "sad",
    next: "day6_closing",
  },

  // ── DAY 6 CLOSING ────────────────────────────────────────────────
  day6_closing: {
    id: "day6_closing",
    speaker: "Alya",
    text: "Hari ini mengajarkanku sesuatu yang tidak ada di buku pelajaran manapun: kesehatan mentalmu lebih berharga dari jumlah likes, followers, atau rasa takut ketinggalan postingan orang lain. Semester ini hampir berakhir—dan saatnya melihat apa yang sudah kutinggalkan sebagai jejak digital hidupku.",
    characterLeft: "none",
    characterRight: "none",
    background: "school_gate",
    bgmEffect: "tension",
    next: "day7_start",
  },

  // ══════════════════════════════════════════════════════════════════
  // --- DAY 7: UJIAN SEKOLAH & DISTRAKSI MEDIA SOSIAL ---
  // Tema: prioritas, manajemen waktu, konsekuensi kecanduan digital
  // ══════════════════════════════════════════════════════════════════

  day7_start: {
    id: "day7_start",
    speaker: "Alya",
    text: "Hari 7 – Malam Sebelum Ujian. Besok adalah Ujian Akhir Semester mata pelajaran Informatika dan Bahasa Indonesia—dua pelajaran yang selama ini paling banyak kusepelekan karena sibuk drama sosial media. Jam 20.00. Buku catatanku masih tertutup rapi di sudut meja.",
    characterLeft: "none",
    characterRight: "none",
    background: "bed",
    bgmEffect: "tension",
    sfxEffect: "beep",
    next: "day7_notif_flood",
  },

  day7_notif_flood: {
    id: "day7_notif_flood",
    speaker: "Alya",
    text: "Tiba-tiba HP-ku bergetar tanpa henti. InstaTRACE, grup kelas, Twitter, TikTok—semua meledak bersamaan. Ternyata ada drama besar: influencer sekolah terkena skandal pemalsuan nilai dan seluruh angkatan membahasnya. Feed-ku penuh cuplikan bukti, teori, dan hot takes. FOMO akademis vs FOMO sosial.",
    characterLeft: "none",
    characterRight: "none",
    background: "chat_bg",
    bgmEffect: "tension",
    sfxEffect: "phone_ring",
    next: "day7_fino_ping",
  },

  day7_fino_ping: {
    id: "day7_fino_ping",
    speaker: "Fino",
    text: "[Chat WA]: Bro Al, lo udah lihat skandal si influencer itu belum?! Sumpah rame banget, ini bakal jadi legend. Btw lo udah belajar buat ujian besok? Gue baru inget ada ujian wkwk. Mau voice call bareng gak?",
    characterLeft: "fino",
    characterLeftExpression: "smug",
    background: "chat_bg",
    next: "day7_event1_choice",
  },

  // ── EVENT 7.1: BELAJAR ATAU SCROLL ───────────────────────────────
  day7_event1_choice: {
    id: "day7_event1_choice",
    speaker: "Alya",
    text: "Aku menatap buku catatan yang belum tersentuh, lalu menatap layar HP yang penuh notifikasi. Drama itu memang menggiurkan untuk diikuti—tapi ujian besok nyata adanya. Jam 20.15. Aku masih punya waktu. Keputusan ada di tanganku.",
    characterLeft: "none",
    characterRight: "none",
    background: "bed",
    choices: [
      {
        text: "Belajar Serius: Matikan notifikasi, aktifkan mode fokus, dan buka catatan. Drama sosmed bisa dikejar besok—nilai ujian tidak bisa diulang semalam.",
        nextNodeId: "day7_study_hard",
        reputationChange: 15,
        mentalChange: 10,
      },
      {
        text: "Scroll Dulu Sebentar: Ikuti dulu drama influencer sampai tuntas—paling 30 menit, setelah itu baru belajar. Lagipula materi ujian sudah pernah dipelajari sebelumnya.",
        nextNodeId: "day7_scroll_first",
        reputationChange: -10,
        mentalChange: -15,
      },
    ],
  },

  // ── BRANCH A: Belajar Serius ──────────────────────────────────────
  day7_study_hard: {
    id: "day7_study_hard",
    speaker: "Alya",
    text: "Aku menghela napas, menutup semua aplikasi sosmed, dan mengaktifkan Do Not Disturb. Buku catatan terbuka. Highlighter kupegang. Dua jam ke depan aku habiskan benar-benar belajar—merangkum, mengulang, dan mengerjakan soal latihan sampai mataku terasa berat.",
    characterLeft: "none",
    characterRight: "none",
    background: "bed",
    bgmEffect: "ambient",
    next: "day7_study_result",
  },

  day7_study_result: {
    id: "day7_study_result",
    speaker: "Alya",
    text: "Jam 22.30. Aku akhirnya menutup buku dengan perasaan puas. Drama influencer itu masih ramai di notifikasi, tapi aku sudah tidak terlalu peduli. Ada sesuatu yang lebih penting yang baru saja kuselesaikan. Aku tidur dengan tenang malam itu.",
    characterLeft: "none",
    characterRight: "none",
    background: "bed",
    bgmEffect: "ambient",
    next: "day7_exam_morning",
  },

  // ── BRANCH B: Scroll Dulu ─────────────────────────────────────────
  day7_scroll_first: {
    id: "day7_scroll_first",
    speaker: "Alya",
    text: "'30 menit saja.' Ternyata 30 menit menjadi 2 jam. Drama influencer itu membawaku ke rabbit hole—video reaksi, klarifikasi palsu, counter-thread, live streaming dadakan. Saat aku sadar, jam sudah menunjukkan 22.40. Panik menghantam dadaku seperti tembok beton.",
    characterLeft: "none",
    characterRight: "none",
    background: "bed",
    bgmEffect: "action",
    sfxEffect: "fail",
    next: "day7_panic_study",
  },

  day7_panic_study: {
    id: "day7_panic_study",
    speaker: "Alya",
    text: "Aku membuka buku catatan dengan tangan gemetar, mencoba menjejalkan semua materi dalam waktu kurang dari satu jam. Tanganku menulis cepat-cepat tapi otakku sudah lelah. Jam 00.15, aku tertidur di atas buku dengan lampu meja masih menyala.",
    characterLeft: "none",
    characterRight: "none",
    background: "bed",
    bgmEffect: "sad",
    next: "day7_exam_morning",
  },

  // ── CONVERGENCE: PAGI UJIAN ───────────────────────────────────────
  day7_exam_morning: {
    id: "day7_exam_morning",
    speaker: "Alya",
    text: "Pagi ujian tiba. Di depan lembar soal, semua keputusan malam lalu terasa nyata akibatnya. Beberapa soal terasa familiar—beberapa terasa asing. Ini bukan soal apakah aku pintar atau tidak. Ini soal apakah aku membuat pilihan yang tepat ketika tidak ada yang mengawasi.",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    bgmEffect: "tension",
    next: "day7_event2_choice",
  },

  // ── EVENT 7.2: GODAAN SAAT UJIAN ─────────────────────────────────
  day7_event2_choice: {
    id: "day7_event2_choice",
    speaker: "Alya",
    text: "Di tengah ujian, teman sebangku mencolek tanganku dengan kertas kecil: jawaban soal nomor 8-12. Pengawas sedang membelakangi. Di saat yang sama, hapeku bergetar di dalam tas—notifikasi baru dari drama semalam yang belum selesai. Fokus atau tergoda?",
    characterLeft: "fino",
    characterLeftExpression: "smug",
    background: "classroom",
    choices: [
      {
        text: "Tolak & Fokus: Abaikan kertas contekan dan notifikasi HP. Kerjakan ujian dengan kemampuanmu sendiri—hasilnya mungkin tidak sempurna, tapi ini milikmu sepenuhnya.",
        nextNodeId: "day7_honest_exam",
        reputationChange: 20,
        mentalChange: 15,
      },
      {
        text: "Ambil Contekan: Lirik jawaban dari kertas itu sekilas—toh semua orang melakukannya. Yang penting nilainya bagus dan tidak ketahuan pengawas.",
        nextNodeId: "day7_cheat_exam",
        reputationChange: -25,
        mentalChange: -10,
      },
    ],
  },

  // ── BRANCH A: Jujur ───────────────────────────────────────────────
  day7_honest_exam: {
    id: "day7_honest_exam",
    speaker: "Alya",
    text: "Aku menggeleng pelan ke arah teman sebangku dan meletakkan tanganku kembali ke lembar jawaban. Mungkin ada beberapa soal yang tidak bisa kujawab, tapi setiap angka yang kutuliskan adalah hasil pikiranku sendiri. Tidak ada rasa bersalah yang perlu kubawa pulang.",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    bgmEffect: "ambient",
    next: "day7_post_exam",
  },

  // ── BRANCH B: Curang ──────────────────────────────────────────────
  day7_cheat_exam: {
    id: "day7_cheat_exam",
    speaker: "Alya",
    text: "Dengan jantung berdegub kencang, aku mencuri pandang ke kertas kecil itu. Jawaban nomor 8-12 kusalin dengan cepat. Pengawas tidak melihat—tapi seseorang di barisan belakang melihat. Aku tidak tahu itu, tapi rekam jejak perbuatan tidak selalu butuh kamera untuk terekam.",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    bgmEffect: "tension",
    sfxEffect: "fail",
    next: "day7_post_exam",
  },

  // ── DAY 7 CLOSING ─────────────────────────────────────────────────
  day7_post_exam: {
    id: "day7_post_exam",
    speaker: "Alya",
    text: "Lembar ujian dikumpulkan. Aku berjalan keluar kelas dengan langkah yang terasa berbeda dari biasanya. Satu semester penuh keputusan digital telah berakhir. Setiap pilihan—dari menyebar hoaks di hari pertama, melindungi atau mengkhianati teman, menjaga keamanan akun, hingga cara menghadapi ujian—semuanya kini membentuk siapa aku di mata dunia.",
    characterLeft: "none",
    characterRight: "none",
    background: "school_gate",
    bgmEffect: "tension",
    next: "day7_closing",
  },

  day7_closing: {
    id: "day7_closing",
    speaker: "Bu Rahma (Guru BK)",
    text: "Alya, Ibu sudah memantau perjalananmu selama satu semester ini. Kini saatnya sistem merekap semua rekam jejak digital dan keputusanmu. Ingat: di dunia nyata maupun digital, karakter seseorang paling terlihat bukan saat dipuji—melainkan saat tidak ada yang mengawasi.",
    characterRight: "gurubk",
    characterRightExpression: "serious",
    background: "bk_room",
    bgmEffect: "tension",
    next: "ending_branching_node",
  },


  // --- BRANCHING TO ENDS BASED ON IN-GAME STATS ---
  ending_branching_node: {
    id: "ending_branching_node",
    speaker: "Sistem Pelacak Jejak",
    text: "Sistem sedang mengalkulasi data digital Anda. Silakan klik pilihan di bawah ini untuk melihat vonis dari rekam jejak digital kehidupan SMA Anda di TRACE.",
    characterLeft: "none",
    characterRight: "none",
    background: "black",
    choices: [
      {
        text: "[LIHAT HASIL EVALUASI DIRI]",
        nextNodeId: "trigger_results_check"
      }
    ]
  },

  trigger_results_check: {
    id: "trigger_results_check",
    speaker: "Sistem",
    // This node's next destination is dynamically calculated by the NovelScreen or handled by standard choice routing
    text: "Mengevaluasi variabel takdir digital Anda...",
    background: "black",
    next: "calculated_final_ending_checker" // Fallback or route handler
  },

  // --- THE ENDINGS NODES ---

  // 1. DIGITAL AMBASSADOR (The Best Ending)
  end_digital_ambassador: {
    id: "end_digital_ambassador",
    speaker: "Bu Rahma (Guru BK)",
    text: "Luar biasa! Rekam jejak digitalmu benar-benar cemerlang, Alya. Kamu bukan saja berhasil mengamankan diri dari berbagai kejahatan digital, tetapi juga berperan aktif membela teman dari bullying dan mengedukasi masyarakat.",
    characterRight: "gurubk",
    characterRightExpression: "default",
    background: "bk_room",
    achievementToUnlock: "digital_ambassador_end",
    next: "end_digital_ambassador_2",
  },
  end_digital_ambassador_2: {
    id: "end_digital_ambassador_2",
    speaker: "Alya",
    text: "Dengan bangga, SMAN TRACE menganugerahiku piagam penghargaan emas sebagai 'Digital Ambassador 2026'. Rina tersenyum lebar di bangku audiens, merasa bersyukur memiliki sahabat sejati sepertiku.",
    characterLeft: "rina",
    characterLeftExpression: "laugh",
    background: "classroom",
    next: "end_digital_ambassador_3",
  },
  end_digital_ambassador_3: {
    id: "end_digital_ambassador_3",
    speaker: "Alya",
    text: "Dengan reputasi murni, keamanan maksimal, serta kepedulian yang tinggi pada privasi dan kemanusiaan, masa depan cerah di dunia cyber menantimu. Setiap klikmu membawa kebaikan!",
    characterLeft: "none",
    characterRight: "none",
    background: "school_gate",
    isEndingScreen: true,
    endingMeta: {
      title: "Digital Ambassador",
      subtitle: "Kamu menjadi teladan internet sehat dan literasi digital di sekolah. Setiap klik membawa kebaikan.",
      colorAccent: "indigo",
      icon: "Star",
      isGoodEnding: true,
    },
  },

  // 5. AKTIVIS ANTI HOAKS (The Truth Ending)
  // Dicapai jika: reputation >= 70, security >= 70, dan
  // pemain konsisten memilih jalur fact-check tanpa sekalipun menyebar hoaks.
  end_anti_hoaks: {
    id: "end_anti_hoaks",
    speaker: "Bu Rahma (Guru BK)",
    text: "Alya, data rekam jejakmu menunjukkan sesuatu yang luar biasa. Setiap kali ada hoaks, kamu memilih untuk verifikasi dulu. Setiap kali ada penipuan, kamu memilih untuk memperingatkan orang lain. Kamu bukan hanya selamat—kamu melindungi orang-orang di sekitarmu.",
    characterRight: "gurubk",
    characterRightExpression: "default",
    background: "bk_room",
    achievementToUnlock: "anti_hoax_activist_end",
    next: "end_anti_hoaks_2",
  },
  end_anti_hoaks_2: {
    id: "end_anti_hoaks_2",
    speaker: "Alya",
    text: "Sekolah menominasikanku sebagai 'Duta Literasi Digital' kelas X. Bersama Rina, aku membentuk komunitas fact-checking pertama di SMA TRACE bernama 'TRACE Cek Fakta'. Postingan verifikasi kami dibagikan ratusan kali oleh wali murid dan guru.",
    characterLeft: "rina",
    characterLeftExpression: "laugh",
    characterRight: "fino",
    characterRightExpression: "default",
    background: "classroom",
    next: "end_anti_hoaks_3",
  },
  end_anti_hoaks_3: {
    id: "end_anti_hoaks_3",
    speaker: "Alya",
    text: "Satu semester ini mengajarkanku bahwa keberanian terbesar bukan menjadi yang paling viral—melainkan menjadi yang paling berani berkata 'tunggu dulu, ini perlu diverifikasi.' Di dunia yang penuh kebisingan informasi, suara yang paling berharga adalah suara kebenaran.",
    characterLeft: "none",
    characterRight: "none",
    background: "school_gate",
    isEndingScreen: true,
    endingMeta: {
      title: "Aktivis Anti Hoaks",
      subtitle: "Konsistensi memilih kebenaran di setiap persimpangan menjadikanmu penjaga ruang digital yang sehat. Kamu membuktikan bahwa satu orang bisa membuat perbedaan.",
      colorAccent: "emerald",
      icon: "ShieldCheck",
      isGoodEnding: true,
    },
  },

  end_influencer: {
    id: "end_influencer",
    speaker: "Bu Rahma (Guru BK)",
    text: "Alya, kamu memiliki pengaruh yang sangat besar di kalangan siswa. Followers sosmedmu tinggi dan gaya bicaramu disukai anak muda. Ibu harap kamu bisa terus mempertahankan etika ini saat memposting sesuatu di masa depan.",
    characterRight: "gurubk",
    characterRightExpression: "default",
    background: "bk_room",
    next: "end_influencer_2",
  },
  end_influencer_2: {
    id: "end_influencer_2",
    speaker: "Alya",
    text: "Aku terpilih sebagai kreator konten sekolah ternama. Teman-teman sekelas sering menjadikanku trendsetter, namun kini aku tahu batasan etika antara mencari 'viewers' dan melindungi kebenaran fakta.",
    characterLeft: "fino",
    characterLeftExpression: "smug",
    background: "classroom",
    next: "end_influencer_3",
  },
  end_influencer_3: {
    id: "end_influencer_3",
    speaker: "Alya",
    text: "Kamu membuktikan bahwa menjadi tenar di internet tidak harus diiringi dengan drama murahan atau penyebaran hoaks. Popularitasmu digunakan untuk kebaikan bersama.",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    isEndingScreen: true,
    endingMeta: {
      title: "Influencer Bertanggung Jawab",
      subtitle: "Popularitas tinggi tanpa kehilangan kompas moral. Kamu membuktikan bahwa tenar dan beretika bisa berjalan beriringan.",
      colorAccent: "amber",
      icon: "Zap",
      isGoodEnding: true,
    },
  },

  // 3. KORBAN PENIPUAN DIGITAL (The Bad Ending)
  end_hacker_victim: {
    id: "end_hacker_victim",
    speaker: "Bu Rahma (Guru BK)",
    text: "Alya, Ibu sangat prihatin mendengar musibah kebocoran data dan peretasan WhatsApp yang menimpa keluargamu. Ini adalah contoh nyata akibat kurangnya pemahaman perlindungan data sensitif di internet.",
    characterRight: "gurubk",
    characterRightExpression: "serious",
    background: "bk_room",
    achievementToUnlock: "hacker_victim_end",
    next: "end_hacker_victim_2",
  },
  end_hacker_victim_2: {
    id: "end_hacker_victim_2",
    speaker: "Alya",
    text: "Akun-akun sosmedku lumpuh. Yang paling menyakitkan, nama baik keluargaku terpuruk karena dituduh berutang di pinjol gelap padahal data kami dibajak orang. Aku meratapi kecerobohanku menyetorkan kode OTP demi iming-iming gratisan tempo hari.",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    next: "end_hacker_victim_3",
  },
  end_hacker_victim_3: {
    id: "end_hacker_victim_3",
    speaker: "Alya",
    text: "Akun dan privasimu dieksploitasi sindikat pencuri identitas. Keamanan digital tidak boleh dibarter dengan hadiah instan apa pun. Jadikan ini pengalaman berharga.",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    isEndingScreen: true,
    endingMeta: {
      title: "Korban Penipuan Digital",
      subtitle: "Kurangnya kewaspadaan terhadap phishing dan social engineering berdampak sangat besar pada privasi dan keluargamu.",
      colorAccent: "red",
      icon: "Skull",
      isGoodEnding: false,
    },
  },

  // 4. KEHILANGAN KEPERCAYAAN (The Sad Ending)
  end_social_pariah: {
    id: "end_social_pariah",
    speaker: "Bu Rahma (Guru BK)",
    text: "Ibu menerima banyak sekali aduan dan bukti dari siswa-siswi lain. Kamu terbukti sering menjadi kompor penyebar rumor tidak jelas serta ikut memberikan komentar toksik yang merugikan mental teman sekelas kita, Rina.",
    characterRight: "gurubk",
    characterRightExpression: "serious",
    background: "bk_room",
    achievementToUnlock: "social_pariah_end",
    next: "end_social_pariah_2",
  },
  end_social_pariah_2: {
    id: "end_social_pariah_2",
    speaker: "Alya",
    text: "Aku mencoba menjelaskan, tetapi tak ada gunanya lagi. Kursiku di kelas dijauhi oleh teman-teman. Rina menatapku dengan kebencian dan kekecewaan mendalam atas segala pengkhianatanku. Fino pun enggan bertegur sapa denganku.",
    characterLeft: "rina",
    characterLeftExpression: "serious",
    background: "classroom",
    next: "end_social_pariah_3",
  },
  end_social_pariah_3: {
    id: "end_social_pariah_3",
    speaker: "Alya",
    text: "Kamu tersisih dari komunitas karena menyebarkan hoaks atau berpartisipasi dalam cyberbullying. Ingatlah, jejak digitalmu adalah reputasimu yang sesungguhnya.",
    characterLeft: "none",
    characterRight: "none",
    background: "classroom",
    isEndingScreen: true,
    endingMeta: {
      title: "Kehilangan Kepercayaan",
      subtitle: "Kata-kata di internet memiliki dampak nyata. Sikapmu di dunia maya mencerminkan karaktermu di dunia nyata.",
      colorAccent: "orange",
      icon: "BookOpen",
      isGoodEnding: false,
    },
  },

  // --- FALLBACK ENDING NODE (jika ending branching tidak dikenali) ---
  // Node ini tidak lagi menggunakan choices redirect ke "start".
  // NovelScreen mendeteksi isEndingScreen:true dan memanggil onExitToMenu().
  game_completed_node: {
    id: "game_completed_node",
    speaker: "Sistem TRACE",
    text: "Kamu telah menyelesaikan satu semester di TRACE. Setiap klik yang kamu buat telah meninggalkan jejak digital. Terima kasih sudah bermain!",
    characterLeft: "none",
    characterRight: "none",
    background: "black",
    isEndingScreen: true,
    endingMeta: {
      title: "Tamat",
      subtitle: "Terima kasih sudah bermain TRACE: Every Click Matters. Setiap klik adalah keputusan, setiap keputusan meninggalkan jejak.",
      colorAccent: "indigo",
      icon: "Star",
      isGoodEnding: true,
    },
  }
};

export const INITIAL_ACHIEVEMENTS = [
  {
    id: "fact_checker",
    title: "Detektif Fakta SMA",
    description: "Pertama kali melakukan verifikasi kredibel terhadap berita hoaks dan menghentikan rantai penyebaran di grup kelas.",
    category: "story",
    iconName: "Zap"
  },
  {
    id: "true_friend",
    title: "Sahabat Sejati Rina",
    description: "Membela Rina dari cyberbullying akun gosip sekolah dan mengantarnya ke ruang BK.",
    category: "story",
    iconName: "Heart"
  },
  {
    id: "cyber_shield",
    title: "Tameng Cyber TRACE",
    description: "Mendeteksi penipuan phishing giveaway palsu, mengamankan kode OTP, dan memperingatkan Fino.",
    category: "secret",
    iconName: "Compass"
  },
  {
    id: "digital_ambassador_end",
    title: "Digital Ambassador",
    description: "Mencapai ending legendaris Duta Digital dengan melestarikan rekam jejak digital yang sempurna.",
    category: "secret",
    iconName: "Star"
  },
  {
    id: "hacker_victim_end",
    title: "Hacked & Scammed",
    description: "Mengalami pahitnya menjadi korban penipuan cyber/phishing akibat kelalaian data pribadi.",
    category: "joke",
    iconName: "Skull"
  },
  {
    id: "social_pariah_end",
    title: "Sosial Terkucilkan",
    description: "Memetik buah dari menyebarkan hoaks atau membully teman lain demi gengsi populer.",
    category: "joke",
    iconName: "BookOpen"
  },
  {
    id: "anti_hoax_activist_end",
    title: "Aktivis Anti Hoaks",
    description: "Mencapai ending langka dengan konsisten memverifikasi informasi dan tidak sekalipun menyebarkan hoaks sepanjang game.",
    category: "secret",
    iconName: "ShieldCheck"
  }
];



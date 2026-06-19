export interface Choice {
  text: string;
  nextNodeId: string;
  achievementId?: string;
  phoneRequired?: boolean;
  reputationChange?: number;
  securityChange?: number;
  trustChange?: number;
  mentalChange?: number;
}

export interface DMailOption {
  id: string; // post ID or chat reply ID
  subject: string; // App name / Context
  body: string; // Social Media post draft / reply text
  destination: string; // target app or platform (e.g. "Instasham", "Chat Kelas", "DM")
  reputationChange?: number;
  securityChange?: number;
  trustChange?: number;
  mentalChange?: number;
  nextNodeId: string;
  description: string;
}

export interface PhoneTriggerData {
  availableDMails: DMailOption[]; // Available Social Media actions (e.g., Post, Chat reply)
  promptText: string; // Prompt alerting player of new notification
}

export interface EndingMeta {
  title: string;       // Judul ending, contoh: "Digital Ambassador"
  subtitle: string;    // Sub-kalimat pesan moral
  colorAccent: string; // Warna tema Tailwind (e.g. "indigo", "amber", "red")
  icon: string;        // Nama icon lucide (e.g. "Star", "Skull", "Shield")
  isGoodEnding: boolean;
}

export interface StoryNode {
  id: string;
  speaker: string;
  text: string;
  characterLeft?: "rina" | "fino" | "gurubk" | "alya" | "none";
  characterLeftExpression?: "default" | "smug" | "blush" | "shocked" | "sad" | "laugh" | "serious";
  characterRight?: "rina" | "fino" | "gurubk" | "alya" | "none";
  characterRightExpression?: "default" | "smug" | "blush" | "shocked" | "sad" | "laugh" | "serious";
  background: "classroom" | "bed" | "bk_room" | "black" | "chat_bg" | "school_gate" | "street";
  choices?: Choice[];
  phoneTrigger?: PhoneTriggerData;
  next?: string;
  bgmEffect?: "ambient" | "tension" | "sad" | "action" | "none";
  sfxEffect?: "click" | "phone_ring" | "steiner" | "beep" | "tutturu_vo" | "fail";
  achievementToUnlock?: string;
  /** Jika true, NovelScreen akan menampilkan EndingScreen overlay setelah teks selesai. */
  isEndingScreen?: boolean;
  /** Metadata yang ditampilkan di EndingScreen (judul, pesan, warna, ikon). */
  endingMeta?: EndingMeta;
}

export interface SaveSlot {
  id: number;
  dateTime: string;
  nodeId: string;
  reputation: number;
  security: number;
  trust: number;
  mental: number;
  summaryText: string;
  activeAchievements: string[];
  chosenDecisionIds?: string[]; // Persistent historical selected choice IDs
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt?: string;
  category: "story" | "secret" | "joke";
  iconName: string;
}

export interface GameState {
  currentNodeId: string;
  reputation: number;
  security: number;
  trust: number;
  mental: number;
  history: string[]; // text backlogs
  unlockedAchievements: string[];
  currentBgm: string;
  phoneOpen: boolean;
  phoneUnread: boolean;
  textSpeed: number; // ms per char
  isMuted: boolean;
  textLog: { speaker: string; text: string }[];
}


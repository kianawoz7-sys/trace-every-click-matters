/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  Save, FolderOpen, RotateCcw, Volume2, VolumeX, Menu, ChevronRight, 
  FastForward, Play, Pause, FileText, X, Sparkles, Phone, HelpCircle, ShieldAlert 
} from "lucide-react";
import { StoryNode, Choice, DMailOption, GameState } from "../types";
import { storyData } from "../data/story";
import { gameAudio } from "./AudioEngine";
import DivergenceMeter from "./DivergenceMeter";
import CharacterAsset from "./CharacterAsset";
import PhoneTrigger from "./PhoneTrigger";
import SaveLoadModal from "./SaveLoadModal";
import EndingScreen from "./EndingScreen";

interface NovelScreenProps {
  initialNodeId: string;
  initialReputation: number;
  initialSecurity: number;
  initialTrust: number;
  initialMental: number;
  initialChosenDecisionIds?: string[];
  unlockedAchievements: string[];
  onUnlockAchievement: (id: string) => void;
  onExitToMenu: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export default function NovelScreen({
  initialNodeId,
  initialReputation,
  initialSecurity,
  initialTrust,
  initialMental,
  initialChosenDecisionIds,
  unlockedAchievements,
  onUnlockAchievement,
  onExitToMenu,
  isMuted,
  onToggleMute
}: NovelScreenProps) {
  // Game states (TRACE core statistics baseline averages)
  const [currentNodeId, setCurrentNodeId] = useState<string>(initialNodeId);
  const [reputation, setReputation] = useState<number>(initialReputation);
  const [security, setSecurity] = useState<number>(initialSecurity);
  const [trust, setTrust] = useState<number>(initialTrust);
  const [mental, setMental] = useState<number>(initialMental);
  const [chosenDecisionIds, setChosenDecisionIds] = useState<string[]>(initialChosenDecisionIds || []);

  // Sync internal state when parent loads a session
  useEffect(() => {
    setCurrentNodeId(initialNodeId);
    setReputation(initialReputation);
    setSecurity(initialSecurity);
    setTrust(initialTrust);
    setMental(initialMental);
    setChosenDecisionIds(initialChosenDecisionIds || []);
    setTextLog([]);
  }, [initialNodeId, initialReputation, initialSecurity, initialTrust, initialMental, initialChosenDecisionIds]);

  
  // Script and text typing states
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  
  // Custom interface toggles
  const [phoneOpen, setPhoneOpen] = useState<boolean>(false);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [isSkipMode, setIsSkipMode] = useState<boolean>(false);
  const [showLogDrawer, setShowLogDrawer] = useState<boolean>(false);
  const [saveLoadMode, setSaveLoadMode] = useState<"save" | "load" | "none">("none");
  const [textLog, setTextLog] = useState<{ speaker: string; text: string }[]>([]);

  // Refs for typing timers
  const typingTimerRef = useRef<any>(null);
  const autoPlayTimerRef = useRef<any>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  const currentNode: StoryNode = storyData[currentNodeId] || storyData["start"];

  // --- TYPING TEXT ANIMATION ---
  useEffect(() => {
    if (!currentNode) return;

    // Reset typing process
    setIsTypingComplete(false);
    setDisplayedText("");
    
    // Auto-update log history
    setTextLog(prev => {
      const exists = prev.some(l => l.text === currentNode.text && l.speaker === currentNode.speaker);
      if (exists) return prev;
      return [...prev, { speaker: currentNode.speaker, text: currentNode.text }];
    });

    // Check for achievement unlock trigger
    if (currentNode.achievementToUnlock) {
      onUnlockAchievement(currentNode.achievementToUnlock);
    }

    // Check for BGM transition effects
    if (currentNode.bgmEffect && currentNode.bgmEffect !== "none") {
      gameAudio.playBgm(currentNode.bgmEffect);
    }

    // Check for SFX sound triggers
    if (currentNode.sfxEffect) {
      gameAudio.playSfx(currentNode.sfxEffect);
    }

    let charIndex = 0;
    const textTarget = currentNode.text;

    if (isSkipMode) {
      // Instant display in skip mode
      setDisplayedText(textTarget);
      setIsTypingComplete(true);
      return;
    }

    const speed = 18; // ms per letter (slightly faster for comfortable pacing)
    typingTimerRef.current = setInterval(() => {
      if (charIndex < textTarget.length) {
        setDisplayedText(textTarget.substring(0, charIndex + 1));
        charIndex++;
      }

      if (charIndex >= textTarget.length) {
        clearInterval(typingTimerRef.current);
        setIsTypingComplete(true);
      }
    }, speed);

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [currentNodeId, isSkipMode]);

  // --- AUTO-PLAY / SKIP SYSTEM CONTROLLER ---
  useEffect(() => {
    if (isTypingComplete && isAutoPlay && !currentNode.choices && !currentNode.phoneTrigger) {
      autoPlayTimerRef.current = setTimeout(() => {
        handleNextClick();
      }, 2000);
    }

    if (isTypingComplete && isSkipMode && !currentNode.choices && !currentNode.phoneTrigger) {
      autoPlayTimerRef.current = setTimeout(() => {
        handleNextClick();
      }, 100);
    }

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [isTypingComplete, isAutoPlay, isSkipMode, currentNodeId]);

  // Scroll backlog logs to bottom on changes
  useEffect(() => {
    if (showLogDrawer && logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showLogDrawer, textLog]);

  // --- HANDLERS ---
  const handleNextClick = () => {
    if (!isTypingComplete) {
      // Fast-forward typing to the end
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      setDisplayedText(currentNode.text);
      setIsTypingComplete(true);
      gameAudio.playSfx("click");
      return;
    }

    if (currentNode.choices && currentNode.choices.length > 0) return;
    if (currentNode.phoneTrigger) return;

    if (currentNode.next) {
      gameAudio.playSfx("click");
      
      // Dynamic route branching trick for final evaluation checker
      if (currentNode.next === "calculated_final_ending_checker") {
        // Node IDs yang mencerminkan pilihan pro-kebenaran (fact-check / anti-hoaks)
        const factCheckNodes = [
          "day1_factcheck",       // Verifikasi hoaks beasiswa hari 1
          "day3_block_phish",     // Blokir phishing hari 3
          "day3_refuse_data",     // Tolak bagi data pribadi hari 3
          "day5_apologize",       // Minta maaf terbuka hari 5
          "day5_commit_change",   // Berkomitmen berubah hari 5
          "day7_study_hard",      // Belajar serius hari 7
          "day7_honest_exam",     // Tolak contekan hari 7
        ];
        // Node IDs yang mencerminkan pilihan pro-hoaks / tidak etis
        const hoaxNodes = [
          "day1_spreadhoax",      // Sebar hoaks beasiswa hari 1
          "day3_give_otp",        // Berikan OTP ke phisher hari 3
          "day3_send_data",       // Kirim data pribadi hari 3
          "day5_deflect",         // Salahkan orang lain hari 5
          "day7_cheat_exam",      // Contek saat ujian hari 7
        ];

        const factCheckCount = factCheckNodes.filter(id => chosenDecisionIds.includes(id)).length;
        const hoaxCount      = hoaxNodes.filter(id => chosenDecisionIds.includes(id)).length;

        let finalEnding = "end_social_pariah";

        // Prioritas 1 — Aktivis Anti Hoaks (konsisten, tidak pernah hoaks)
        if (reputation >= 70 && security >= 70 && factCheckCount >= 3 && hoaxCount === 0) {
          finalEnding = "end_anti_hoaks";
        // Prioritas 2 — Digital Ambassador (semua stat tinggi)
        } else if (reputation >= 75 && security >= 75 && trust >= 75) {
          finalEnding = "end_digital_ambassador";
        // Prioritas 3 — Korban Penipuan
        } else if (security < 50) {
          finalEnding = "end_hacker_victim";
        // Prioritas 4 — Influencer
        } else if (reputation >= 65 && trust >= 50 && mental >= 50) {
          finalEnding = "end_influencer";
        // Prioritas 5 — Kehilangan Kepercayaan
        } else if (trust < 50 || reputation < 50 || mental < 50) {
          finalEnding = "end_social_pariah";
        } else {
          finalEnding = "end_influencer";
        }
        
        setCurrentNodeId(finalEnding);
      } else {
        setCurrentNodeId(currentNode.next);
      }
    }
  };

  const handleChoiceSelect = (choice: Choice) => {
    gameAudio.playSfx("click");
    setIsSkipMode(false); // turn off skip on choices
    setPhoneOpen(false); // Close smartphone screen automatically on decision selected
    
    if (choice.achievementId) {
      onUnlockAchievement(choice.achievementId);
    }

    // Record chosen route
    setChosenDecisionIds(prev => {
      if (prev.includes(choice.nextNodeId)) return prev;
      return [...prev, choice.nextNodeId];
    });

    // Process stats modifiers with boundaries
    if (choice.reputationChange) setReputation(prev => Math.max(0, Math.min(100, prev + choice.reputationChange!)));
    if (choice.securityChange) setSecurity(prev => Math.max(0, Math.min(100, prev + choice.securityChange!)));
    if (choice.trustChange) setTrust(prev => Math.max(0, Math.min(100, prev + choice.trustChange!)));
    if (choice.mentalChange) setMental(prev => Math.max(0, Math.min(100, prev + choice.mentalChange!)));

    // Handle end-game calculations on CTA action
    if (choice.nextNodeId === "trigger_results_check") {
      // Node IDs yang mencerminkan pilihan pro-kebenaran (fact-check / anti-hoaks)
      const factCheckNodes = [
        "day1_factcheck",       // Verifikasi hoaks beasiswa hari 1
        "day3_block_phish",     // Blokir phishing hari 3
        "day3_refuse_data",     // Tolak bagi data pribadi hari 3
        "day5_apologize",       // Minta maaf terbuka hari 5
        "day5_commit_change",   // Berkomitmen berubah hari 5
        "day7_study_hard",      // Belajar serius hari 7
        "day7_honest_exam",     // Tolak contekan hari 7
      ];
      // Node IDs yang mencerminkan pilihan pro-hoaks / tidak etis
      const hoaxNodes = [
        "day1_spreadhoax",      // Sebar hoaks beasiswa hari 1
        "day3_give_otp",        // Berikan OTP ke phisher hari 3
        "day3_send_data",       // Kirim data pribadi hari 3
        "day5_deflect",         // Salahkan orang lain hari 5
        "day7_cheat_exam",      // Contek saat ujian hari 7
      ];

      // Gunakan updatedIds yang sudah termasuk pilihan saat ini
      const updatedIds = [...chosenDecisionIds, choice.nextNodeId];
      const factCheckCount = factCheckNodes.filter(id => updatedIds.includes(id)).length;
      const hoaxCount      = hoaxNodes.filter(id => updatedIds.includes(id)).length;

      let finalEnding = "end_social_pariah";

      // Prioritas 1 — Aktivis Anti Hoaks (konsisten, tidak pernah hoaks)
      if (reputation >= 70 && security >= 70 && factCheckCount >= 3 && hoaxCount === 0) {
        finalEnding = "end_anti_hoaks";
      // Prioritas 2 — Digital Ambassador (semua stat tinggi)
      } else if (reputation >= 75 && security >= 75 && trust >= 75) {
        finalEnding = "end_digital_ambassador";
      // Prioritas 3 — Korban Penipuan
      } else if (security < 50) {
        finalEnding = "end_hacker_victim";
      // Prioritas 4 — Influencer
      } else if (reputation >= 65 && trust >= 50 && mental >= 50) {
        finalEnding = "end_influencer";
      // Prioritas 5 — Kehilangan Kepercayaan
      } else if (trust < 50 || reputation < 50 || mental < 50) {
        finalEnding = "end_social_pariah";
      } else {
        finalEnding = "end_influencer";
      }
      
      setCurrentNodeId(finalEnding);
    } else {
      setCurrentNodeId(choice.nextNodeId);
    }
  };

  const handleDMailTransmitted = (dmail: DMailOption) => {
    setIsSkipMode(false);
    setPhoneOpen(false);

    // Record chosen route
    setChosenDecisionIds(prev => {
      if (prev.includes(dmail.nextNodeId)) return prev;
      return [...prev, dmail.nextNodeId];
    });
    
    if (dmail.reputationChange) setReputation(prev => Math.max(0, Math.min(100, prev + dmail.reputationChange!)));
    if (dmail.securityChange) setSecurity(prev => Math.max(0, Math.min(100, prev + dmail.securityChange!)));
    if (dmail.trustChange) setTrust(prev => Math.max(0, Math.min(100, prev + dmail.trustChange!)));
    if (dmail.mentalChange) setMental(prev => Math.max(0, Math.min(100, prev + dmail.mentalChange!)));
    
    setCurrentNodeId(dmail.nextNodeId);
  };

  const handleLoadSlotAction = (
    nodeId: string, 
    savedRep: number, 
    savedSec: number, 
    savedTru: number, 
    savedMnt: number, 
    unlocked: string[],
    savedChosenDecisionIds?: string[]
  ) => {
    setIsSkipMode(false);
    setIsAutoPlay(false);
    setCurrentNodeId(nodeId);
    setReputation(savedRep);
    setSecurity(savedSec);
    setTrust(savedTru);
    setMental(savedMnt);
    setChosenDecisionIds(savedChosenDecisionIds ?? []);
    setTextLog([]);
    unlocked.forEach(id => onUnlockAchievement(id));
  };

  const toggleSkipMode = () => {
    gameAudio.playSfx("click");
    setIsAutoPlay(false);
    setIsSkipMode(prev => !prev);
  };

  const toggleAutoPlay = () => {
    gameAudio.playSfx("click");
    setIsSkipMode(false);
    setIsAutoPlay(prev => !prev);
  };

  // --- RESTART HANDLER (dipakai oleh EndingScreen) ---
  const handleRestart = () => {
    setCurrentNodeId("start");
    setReputation(60);
    setSecurity(80);
    setTrust(60);
    setMental(60);
    setChosenDecisionIds([]);
    setTextLog([]);
    setIsAutoPlay(false);
    setIsSkipMode(false);
    setPhoneOpen(false);
  };

  // Render CSS Background Scenes representing Indo SMA locations
  const renderBackgroundScene = () => {
    const bg = currentNode.background;
    
    if (bg === "black") {
      return <div className="absolute inset-0 bg-black z-0 transition-all duration-500" />;
    }

    if (bg === "school_gate") {
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900 via-neutral-900 to-emerald-950/20 z-0 transition-all duration-500 flex flex-col justify-between p-12">
          {/* School gate vector artwork */}
          <div className="w-full flex justify-between opacity-15 max-w-4xl mx-auto border-t border-dashed border-stone-600 pt-3">
            <span className="font-mono text-[9px] tracking-widest text-[#00ff41]">SMAN 1 TRACE // ACCREDITED A</span>
            <span className="font-mono text-[9px] text-[#00ff41]">GATEWAY SYSTEM</span>
          </div>
          <div className="relative w-full h-40 max-w-xl mx-auto opacity-10 flex items-end justify-center">
            {/* Gate pillar */}
            <div className="w-10 h-full bg-stone-500 rounded-sm" />
            <div className="flex-1 h-24 border-y-4 border-stone-600 mx-4 border-dashed" />
            <div className="w-10 h-full bg-stone-500 rounded-sm" />
          </div>
        </div>
      );
    }

    if (bg === "classroom") {
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-slate-900/90 to-[#0e1726]/40 z-0 transition-all duration-500 flex flex-col justify-between p-8">
          <div className="w-full flex justify-between opacity-10">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] text-[#00ff41]">RUANG BELAJAR KELAS X-A</span>
              <div className="w-40 h-1 bg-stone-500" />
            </div>
            <div className="text-[9px] font-mono text-stone-500 text-right">SMA TRACE</div>
          </div>
          {/* Blackboards grids */}
          <div className="w-full max-w-3xl mx-auto h-32 bg-stone-900/60 border border-stone-800 rounded p-4 opacity-5 flex flex-col justify-between mb-28">
            <div className="border-b border-stone-800 pb-2 flex justify-between text-[11px] font-mono">
              <span>HARI INI: BAHASA & LITERASI DIGITAL</span>
              <span>15.00 WIB</span>
            </div>
            <div className="text-[10px] italic">"Jejak digitalmu adalah karakter sejatimu di era cybernetika."</div>
          </div>
        </div>
      );
    }

    if (bg === "bk_room") {
      return (
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/40 via-zinc-950 to-neutral-950 z-0 transition-all duration-500 flex flex-col justify-between p-8">
          <div className="w-full flex justify-between opacity-20 max-w-4xl mx-auto">
            <span className="font-mono text-[9px] tracking-wider text-cyan-400">RUANG BIMBINGAN KONSELING (BK)</span>
            <span className="font-mono text-[9px] text-cyan-500">KONFIDENSIAL</span>
          </div>
          <div className="w-full max-w-xl mx-auto h-28 border border-cyan-500/10 bg-black/40 rounded-lg p-3.5 opacity-10 flex flex-col gap-2 mb-20">
            <div className="h-4 bg-cyan-500/20 rounded w-1/3" />
            <div className="h-2 bg-stone-700 rounded w-full" />
            <div className="h-2 bg-stone-700 rounded w-3/4" />
          </div>
        </div>
      );
    }

    if (bg === "bed") {
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-[#0d0c16]/95 to-black z-0 transition-all duration-500 flex flex-col justify-between p-8">
          <div className="w-full flex justify-between opacity-15">
            <span className="font-mono text-[9px] text-purple-400 uppercase">Alya's Night Chamber</span>
            <span className="font-mono text-[9px] text-stone-600">HOME DEPARTURE</span>
          </div>
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-purple-500/5 blur-2xl rounded-full" />
        </div>
      );
    }

    if (bg === "street") {
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-[#13111c] to-[#04020a] z-0 transition-all duration-500 flex flex-col justify-between p-8">
          <div className="w-full flex justify-between opacity-10">
            <span className="font-mono text-[9px] text-stone-500 uppercase">LORONG SMA TRACE</span>
            <span className="font-mono text-[9px] text-stone-600">ACTIVE CAMERA PASS</span>
          </div>
        </div>
      );
    }

    if (bg === "chat_bg") {
      return (
        <div className="absolute inset-0 bg-[#090b11] z-0 transition-all duration-500 overflow-hidden">
          {/* Cyber glowing mesh tiles for chat application vibe */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06)_1px,transparent_1px)] bg-[size:16px_16px] opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/15 via-black to-[#050508] pointer-events-none" />
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full" />
        </div>
      );
    }

    return <div className="absolute inset-0 bg-zinc-950 z-0" />;
  };

  return (
    <div 
      id="novel_viewport"
      className="relative w-full h-screen flex flex-col justify-between overflow-hidden bg-[#0a0a0c] select-none text-[#e0e0e0]"
    >
      {/* Background Canvas */}
      {renderBackgroundScene()}

      {/* --- UPPER HUD PANEL --- */}
      <nav 
        id="novel_hud_header"
        className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 bg-gradient-to-b from-black via-black/40 to-transparent"
      >
        <DivergenceMeter reputation={reputation} security={security} trust={trust} mental={mental} />

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 font-mono">
          <button
            onClick={() => { gameAudio.playSfx("click"); setSaveLoadMode("save"); }}
            className="flex items-center gap-1 px-3 py-1.5 bg-black/80 hover:bg-black border border-indigo-500/20 hover:border-indigo-400 rounded text-[10px] tracking-wider text-stone-300 font-bold transition cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-indigo-400" />
            <span>SAVE</span>
          </button>
          
          <button
            onClick={() => { gameAudio.playSfx("click"); setSaveLoadMode("load"); }}
            className="flex items-center gap-1 px-3 py-1.5 bg-black/80 hover:bg-black border border-indigo-500/20 hover:border-indigo-400 rounded text-[10px] tracking-wider text-stone-300 font-bold transition cursor-pointer"
          >
            <FolderOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>LOAD</span>
          </button>

          <button
            onClick={() => { gameAudio.playSfx("click"); setShowLogDrawer(true); }}
            className="flex items-center gap-1 px-3 py-1.5 bg-black/80 hover:bg-black border border-indigo-500/20 hover:border-indigo-400 rounded text-[10px] tracking-wider text-stone-300 font-bold transition cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>LOG</span>
          </button>

          <button
            onClick={() => { gameAudio.playSfx("click"); onToggleMute(); }}
            className="p-1.5 bg-black/80 hover:bg-black border border-indigo-500/20 hover:border-indigo-400 rounded transition text-stone-400 hover:text-indigo-400 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => { gameAudio.playSfx("click"); onExitToMenu(); }}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-900/40 rounded text-[10px] tracking-wider text-red-200 font-bold transition cursor-pointer"
          >
            <Menu className="w-3.5 h-3.5" />
            <span>MENU</span>
          </button>
        </div>
      </nav>

      {/* --- CHARACTER STAGE PANEL --- */}
      <div 
        id="character_visuals_panel"
        className="relative z-10 flex-1 flex items-end justify-center px-4 sm:px-12 pointer-events-none"
      >
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0a0c]/85 to-transparent z-0 pointer-events-none" />

        <div className="w-full max-w-5xl flex justify-between items-end relative z-10">
          <div className="w-1/2 flex justify-start items-end">
            {currentNode.characterLeft && currentNode.characterLeft !== "none" && (
              <CharacterAsset
                name={currentNode.characterLeft}
                expression={currentNode.characterLeftExpression}
                side="left"
              />
            )}
          </div>

          <div className="w-1/2 flex justify-end items-end">
            {currentNode.characterRight && currentNode.characterRight !== "none" && (
              <CharacterAsset
                name={currentNode.characterRight}
                expression={currentNode.characterRightExpression}
                side="right"
              />
            )}
          </div>
        </div>
      </div>

      {/* --- CONSOLE SPEAKER DIALOGUE BOX (BOTTOM) --- */}
      <div 
        id="dialogue_console_wrapper"
        className="relative z-20 w-full bg-black/95 border-t border-indigo-500/30 px-4 py-5 sm:px-10 shadow-[0_0_50px_rgba(0,0,0,0.95)]"
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-3.5 relative">

          {/* Quick skipping tags */}
          <div className="absolute -top-11 right-0 flex items-center gap-2">
            <button
              onClick={toggleSkipMode}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider transition uppercase cursor-pointer ${
                isSkipMode 
                  ? "bg-red-950/80 text-red-400 border border-red-500 blink" 
                  : "bg-black/80 text-stone-400 border border-indigo-500/20 hover:border-indigo-400"
              }`}
            >
              <FastForward className="w-3 h-3" />
              <span>SKIP {isSkipMode ? "ON" : "OFF"}</span>
            </button>

            <button
              onClick={toggleAutoPlay}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider transition uppercase cursor-pointer ${
                isAutoPlay 
                  ? "bg-amber-950/80 text-amber-400 border border-amber-500" 
                  : "bg-black/80 text-stone-400 border border-indigo-500/20 hover:border-indigo-400"
              }`}
            >
              {isAutoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>AUTO {isAutoPlay ? "ON" : "OFF"}</span>
            </button>
          </div>

          {/* Active Speaker Name Tag Badge */}
          <div className="inline-flex">
            <span 
              className="px-4 py-1.5 rounded-sm bg-indigo-500/10 border border-indigo-500/30 text-[10px] font-mono font-bold tracking-widest text-indigo-300 uppercase flex items-center gap-1.5"
              style={{ textShadow: "0 0 5px rgba(99,102,241,0.25)" }}
            >
              <Sparkles className="w-3 h-3 text-pink-400" />
              {currentNode.speaker}
            </span>
          </div>

          {/* Subtyped dynamic text box */}
          <div 
            onClick={handleNextClick}
            className="min-h-[85px] py-1 cursor-pointer select-text"
          >
            <p className="text-stone-100 text-xs sm:text-sm font-sans font-medium leading-relaxed whitespace-pre-line">
              {displayedText}
              {isTypingComplete && (
                <span className="inline-block w-2 h-3.5 bg-indigo-400 ml-1.5 animate-pulse">▼</span>
              )}
            </p>
          </div>          {/* DIALOGUE CHOICES REDIRECTED TO SMARTPHONE */}
          {currentNode.choices && isTypingComplete && (
            <div 
              id="choices_phone_redirect_banner"
              className="my-3 p-3.5 bg-red-950/20 border-2 border-red-500/50 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-200 animate-[fadeInUp_0.3s_ease-out_forwards]"
            >
              <div className="flex items-center gap-3 text-left">
                <Phone className="w-5 h-5 text-pink-400 shrink-0 animate-bounce" />
                <div>
                  <span className="font-bold text-[#22d3ee] block uppercase text-[10px] tracking-wider mb-0.5">⚠️ PILIHAN TINDAKAN AKTIF</span>
                  <span className="text-[11.5px] font-sans text-stone-300 leading-relaxed">Setiap keputusan penting hanya bisa dijalankan lewat smartphone Alya. Silakan klik tombol Buka Ponsel di sebelah kanan!</span>
                </div>
              </div>
              <button 
                onClick={() => { gameAudio.playSfx("click"); setPhoneOpen(true); }}
                className="w-full sm:w-auto px-4.5 py-2.5 bg-red-600 hover:bg-red-500 text-white border border-red-400 rounded-sm text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.4)] cursor-pointer transition active:scale-95 duration-100 whitespace-nowrap shrink-0"
              >
                Buka Ponsel
              </button>
            </div>
          )}

          {/* Quick phone alerts trigger highlights */}
          {currentNode.phoneTrigger && !currentNode.choices && isTypingComplete && (
            <div className="my-1.5 p-2.5 bg-indigo-950/40 border border-indigo-500/30 rounded-sm flex items-center justify-between text-[10.5px] font-mono text-indigo-300 animate-pulse">
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="w-4.5 h-4.5 text-pink-400 shrink-0" />
                <span>{currentNode.phoneTrigger.promptText}</span>
              </span>
              <button 
                onClick={() => { gameAudio.playSfx("click"); setPhoneOpen(true); }}
                className="px-3.5 py-1.5 bg-indigo-600 text-white border border-indigo-400 rounded-sm text-[9.5px] font-bold hover:bg-indigo-550 cursor-pointer uppercase tracking-wider"
              >
                Buka Ponsel
              </button>
            </div>
          )}

        </div>
      </div>

      {/* --- PHONE DEVICE LAYOUT --- */}
      <PhoneTrigger
        currentNodeId={currentNodeId}
        choices={currentNode.choices}
        onSelectChoice={handleChoiceSelect}
        triggerData={currentNode.phoneTrigger}
        onSendDMail={handleDMailTransmitted}
        onClose={() => setPhoneOpen(false)}
        isOpen={phoneOpen}
        onToggleOpen={() => setPhoneOpen(prev => !prev)}
        chosenDecisionIds={chosenDecisionIds}
      />

      {/* --- TRANSCRIBER BACKLOG DRAWER (LOG) --- */}
      {showLogDrawer && (
        <div 
          id="backlog_log_drawer"
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-end animate-[fadeIn_0.2s]"
          onClick={() => { gameAudio.playSfx("click"); setShowLogDrawer(false); }}
        >
          <div 
            className="w-full max-w-md h-full bg-[#0a0a0c] border-l border-indigo-500/20 flex flex-col justify-between shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Log Header */}
            <div className="bg-black px-5 py-4 border-b border-indigo-500/10 flex justify-between items-center font-mono">
              <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 uppercase tracking-wide">
                <FileText className="w-4 h-4 text-pink-400" />
                <span>Transkrip Obrolan TRACE</span>
              </span>
              <button 
                onClick={() => { gameAudio.playSfx("click"); setShowLogDrawer(false); }}
                className="text-stone-400 hover:text-indigo-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrolling panels */}
            <div id="log_drawer_scroll" className="flex-1 overflow-y-auto p-5 space-y-4 select-text bg-[#030305]">
              {textLog.length === 0 ? (
                <div className="h-full flex items-center justify-center text-stone-600 text-xs italic font-mono uppercase tracking-widest">
                  Log kosong...
                </div>
              ) : (
                textLog.map((log, index) => (
                  <div key={index} className="space-y-1 border-b border-stone-900 pb-3">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest block">
                      {log.speaker}
                    </span>
                    <p className="text-stone-300 font-sans text-xs leading-relaxed">
                      {log.text}
                    </p>
                  </div>
                ))
              )}
              <div ref={logEndRef} />
            </div>

            <div className="bg-black p-4 border-t border-indigo-500/10 text-[9px] font-mono text-stone-500 text-center uppercase">
              REKAM JEJAK DI SEPANJANG SISTEM TRACE OS.
            </div>
          </div>
        </div>
      )}

      {/* --- IN-GAME SAVE & LOAD MODAL --- */}
      {saveLoadMode !== "none" && (
        <SaveLoadModal
          mode={saveLoadMode}
          currentNodeId={currentNodeId}
          currentReputation={reputation}
          currentSecurity={security}
          currentTrust={trust}
          currentMental={mental}
          currentSummaryText={currentNode.text}
          unlockedAchievements={unlockedAchievements}
          chosenDecisionIds={chosenDecisionIds}
          onClose={() => setSaveLoadMode("none")}
          onLoadSlot={handleLoadSlotAction}
        />
      )}

      {/* --- ENDING SCREEN OVERLAY ---
           Muncul saat currentNode.isEndingScreen === true.
           Tombol di dalamnya langsung memanggil onExitToMenu() atau handleRestart(),
           BUKAN melalui nextNodeId, sehingga game tidak pernah looping balik ke "start". */}
      {currentNode.isEndingScreen && currentNode.endingMeta && (
        <EndingScreen
          endingMeta={currentNode.endingMeta}
          reputation={reputation}
          security={security}
          trust={trust}
          mental={mental}
          chosenDecisionIds={chosenDecisionIds}
          onExitToMenu={onExitToMenu}
          onRestart={handleRestart}
        />
      )}

    </div>
  );
}

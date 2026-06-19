/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import MainMenu from "./components/MainMenu";
import NovelScreen from "./components/NovelScreen";
import SaveLoadModal from "./components/SaveLoadModal";
import { gameAudio } from "./components/AudioEngine";
import { INITIAL_ACHIEVEMENTS } from "./data/story";
import { Award, ShieldCheck } from "lucide-react";

export default function App() {
  const [screen, setScreen] = useState<"menu" | "novel">("menu");
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showLoadModal, setShowLoadModal] = useState<boolean>(false);
  
  // Loaded stats state profile to pass to NovelScreen
  const [gameLoadSession, setGameLoadSession] = useState<{
    nodeId: string;
    reputation: number;
    security: number;
    trust: number;
    mental: number;
    chosenDecisionIds?: string[];
  } | null>(null);

  // Custom Achievement Pop-up Toast State
  const [activeToast, setActiveToast] = useState<{ title: string; desc: string } | null>(null);

  // Load preferences and achievements on boot
  useEffect(() => {
    const savedAch = localStorage.getItem("trace_ach_v1");
    if (savedAch) {
      try {
        setUnlockedAchievements(JSON.parse(savedAch));
      } catch (e) {
        console.error("Failed to parse achievements");
      }
    }

    const savedMute = localStorage.getItem("trace_mute_v1");
    if (savedMute) {
      const parsedMute = savedMute === "true";
      setIsMuted(parsedMute);
      gameAudio.setMute(parsedMute);
    }
  }, []);

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    gameAudio.setMute(nextMute);
    localStorage.setItem("trace_mute_v1", nextMute ? "true" : "false");
  };

  const handleUnlockAchievement = (id: string) => {
    if (unlockedAchievements.includes(id)) return;

    const updated = [...unlockedAchievements, id];
    setUnlockedAchievements(updated);
    localStorage.setItem("trace_ach_v1", JSON.stringify(updated));

    // Retrieve achievement details
    const found = INITIAL_ACHIEVEMENTS.find(ach => ach.id === id);
    if (found) {
      // Unlocked chime!
      gameAudio.playSfx("tutturu_vo");
      
      // Trigger toast slide-in overlay
      setActiveToast({ title: found.title, desc: found.description });
      
      // Auto fade-out after 4.5 seconds
      setTimeout(() => {
        setActiveToast(null);
      }, 4500);
    }
  };

  const handleStartNewGame = () => {
    // Reset to initial baseline of Day 1
    setGameLoadSession({
      nodeId: "start",
      reputation: 60,
      security: 80,
      trust: 60,
      mental: 60,
      chosenDecisionIds: []
    });
    setScreen("novel");
  };

  const handleLoadSlotDirect = (
    nodeId: string, 
    reputation: number, 
    security: number, 
    trust: number, 
    mental: number, 
    unlocked: string[],
    chosenDecisionIds?: string[]
  ) => {
    // Sync loaded achievements
    unlocked.forEach(id => {
      if (!unlockedAchievements.includes(id)) {
        handleUnlockAchievement(id);
      }
    });
    
    setGameLoadSession({
      nodeId,
      reputation,
      security,
      trust,
      mental,
      chosenDecisionIds: chosenDecisionIds ?? []
    });
    
    setShowLoadModal(false);
    setScreen("novel");
  };

  return (
    <div className="relative w-full min-h-[100dvh] bg-[#070709] text-[#e2e8f0] font-sans overflow-x-hidden">
      
      {/* Cool cyber Scanline grid overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(99,102,241,0.03),rgba(6,182,212,0.02),rgba(244,63,94,0.03))] bg-[length:100%_2px,3px_100%] z-50 opacity-[0.4]" />

      {/* --- RENDER ACTIVE SCREEN --- */}
      {screen === "menu" ? (
        <MainMenu
          unlockedAchievements={unlockedAchievements}
          onStartGame={handleStartNewGame}
          onOpenLoadModal={() => setShowLoadModal(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      ) : (
        <NovelScreen
          initialNodeId={gameLoadSession?.nodeId ?? "start"}
          initialReputation={gameLoadSession?.reputation ?? 60}
          initialSecurity={gameLoadSession?.security ?? 80}
          initialTrust={gameLoadSession?.trust ?? 60}
          initialMental={gameLoadSession?.mental ?? 60}
          initialChosenDecisionIds={gameLoadSession?.chosenDecisionIds ?? []}
          unlockedAchievements={unlockedAchievements}
          onUnlockAchievement={handleUnlockAchievement}
          onExitToMenu={() => {
            gameAudio.stopBgm();
            setScreen("menu");
          }}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* --- MENU-ONLY LOAD MODAL --- */}
      {showLoadModal && (
        <SaveLoadModal
          mode="load"
          currentNodeId="start"
          currentReputation={60}
          currentSecurity={80}
          currentTrust={60}
          currentMental={60}
          currentSummaryText="Menu Utama"
          unlockedAchievements={unlockedAchievements}
          chosenDecisionIds={[]}
          onClose={() => setShowLoadModal(false)}
          onLoadSlot={handleLoadSlotDirect}
        />
      )}

      {/* --- FLOATING ACHIEVEMENT TOAST NOTIFICATION --- */}
      {activeToast && (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
          <div 
            id="achievement_popup_toast"
            className="flex items-center gap-3.5 bg-black/95 border-2 border-indigo-500 p-4 rounded shadow-[0_0_30px_rgba(99,102,241,0.35)] w-full max-w-sm animate-[fadeInDown_0.4s_ease-out_forwards] pointer-events-auto"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black flex items-center justify-center border border-indigo-500/40 animate-pulse">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex-col text-left font-sans">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-indigo-400">
              PENCAPAIAN DIKUNCI
            </span>
            <h4 className="text-xs font-bold text-white leading-tight font-mono mt-0.5">
              {activeToast.title}
            </h4>
            <p className="text-[10px] text-stone-300 font-medium leading-relaxed mt-0.5 line-clamp-1">
              {activeToast.desc}
            </p>
          </div>
        </div>
        </div>
      )}

      {/* GLOBAL ANIMATION INJECTIONS */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .blink {
          animation: textBlink 1.2s step-end infinite;
        }
        @keyframes textBlink {
          50% { opacity: 0.4; }
        }
      `}</style>

    </div>
  );
}

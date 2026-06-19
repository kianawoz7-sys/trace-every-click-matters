/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Play, FolderOpen, Award, BookOpen, Volume2, VolumeX, ShieldAlert, Zap, Compass, Skull, Heart, Star } from "lucide-react";
import { INITIAL_ACHIEVEMENTS, storyData } from "../data/story";
import { gameAudio } from "./AudioEngine";

interface MainMenuProps {
  unlockedAchievements: string[];
  onStartGame: () => void;
  onOpenLoadModal: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export default function MainMenu({
  unlockedAchievements,
  onStartGame,
  onOpenLoadModal,
  isMuted,
  onToggleMute
}: MainMenuProps) {
  const [activeSubView, setActiveSubView] = useState<"none" | "achievements" | "help">("none");

  useEffect(() => {
    // Start ambient menu screen music on mount
    gameAudio.playBgm("ambient");
  }, []);

  const handleStartClick = () => {
    gameAudio.playSfx("click");
    gameAudio.stopBgm();
    onStartGame();
  };

  const handleLoadClick = () => {
    gameAudio.playSfx("click");
    onOpenLoadModal();
  };

  const handleSubToggle = (view: "achievements" | "help") => {
    gameAudio.playSfx("click");
    setActiveSubView(prev => prev === view ? "none" : view);
  };

  // Maps custom icon strings to actual Lucide component rendering
  const getAchievementIcon = (iconName: string, unlocked: boolean) => {
    const props = { className: `w-6 h-6 ${unlocked ? "text-amber-500" : "text-stone-700"}` };
    switch (iconName) {
      case "Zap": return <Zap {...props} />;
      case "Compass": return <Compass {...props} />;
      case "Skull": return <Skull {...props} />;
      case "Heart": return <Heart {...props} />;
      case "BookOpen": return <BookOpen {...props} />;
      case "Star": return <Star {...props} />;
      default: return <Award {...props} />;
    }
  };

  return (
    <div 
      id="main_menu_viewport"
      className="relative w-full min-h-screen bg-[#0a0a0c] text-[#e0e0e0] flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none"
    >
      {/* Absolute Background Mesh Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1a1a1e_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.9)) pointer-events-none z-0" />

      {/* Cyber animated decorative gears/waves in background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 border border-[#22d3ee]/5 rounded-full animate-[spin_60s_linear_infinite] z-0" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] border border-[#6366f1]/5 rounded-full animate-[spin_85s_linear_infinite] z-0" />

      {/* HEADER: Sound Control & System Timeline info */}
      <header className="relative flex justify-between items-center z-10 w-full max-w-5xl mx-auto border-b border-indigo-500/10 pb-4">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-widest text-[#6366f1] font-mono">Current Simulation</span>
          <span className="text-lg sm:text-xl font-bold tracking-tighter italic text-white font-mono">TRACE // DIGITAL_OS v2.0</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center space-x-2 bg-black px-4 py-1.5 border border-indigo-500/40 rounded-sm shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <span className="text-indigo-400 font-mono text-sm tracking-[0.1em] font-bold">REKAM JEJAK: AKTIF</span>
          </div>

          <button
            onClick={() => { gameAudio.playSfx("click"); onToggleMute(); }}
            className="p-2 border border-indigo-500/20 hover:border-indigo-400 bg-black/40 hover:bg-black/80 rounded text-stone-400 hover:text-indigo-400 transition duration-200 cursor-pointer flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.05)]"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* MAIN VIEWPORT BODY */}
      <main className="relative flex-1 flex flex-col items-center justify-center z-10 py-12 max-w-5xl w-full mx-auto">
        
        {activeSubView === "none" && (
          <div className="flex flex-col items-center justify-center text-center max-w-lg">
            {/* Title Logo representation (TRACE Cyberpunk look) */}
            <div className="relative mb-8 group animate-[bounce_3s_ease-out_infinite]">
              <div className="absolute -inset-1.5 bg-indigo-500/20 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-500" />
              <div className="relative px-8 py-5 bg-black border-2 border-indigo-500 rounded-sm leading-none flex flex-col items-center shadow-[0_0_20px_rgba(99,102,241,0.25)]">
                <span className="text-[10px] font-mono tracking-[0.25em] text-indigo-400/80 mb-1.5 uppercase">SMA DIGITAL CITIZENSHIP SIMULATOR</span>
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-widest">
                  T<span className="text-pink-500 animate-pulse">R</span>A<span className="text-cyan-400">C</span>E
                </span>
                <span className="text-[10px] font-mono font-bold text-pink-500 tracking-[0.3em] mt-3 uppercase pl-1.5">
                  EVERY CLICK MATTERS
                </span>
              </div>
            </div>

            {/* Sub description */}
            <p className="text-xs sm:text-sm font-sans text-stone-400/80 leading-relaxed mb-10 px-4">
              Setiap interaksi sosial, ketukan jempol, dan penyebaran informasi membentuk reputasi, keamanan data diri, serta masa depan akademikmu di SMAN TRACE.
            </p>

            {/* Menu options buttons */}
            <nav id="main_menu_nav" className="flex flex-col gap-3.5 w-72">
              <button
                onClick={handleStartClick}
                className="group relative px-6 py-3.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-white font-mono font-bold text-xs rounded-sm shadow-[0_0_15px_rgba(99,102,241,0.15)] border border-indigo-500 flex items-center justify-center gap-2.5 transition duration-150 cursor-pointer uppercase tracking-widest hover:scale-[1.03]"
              >
                <span className="font-mono text-indigo-400/60 mr-1 text-[10px]">01.</span>
                <Play className="w-3.5 h-3.5 group-hover:animate-ping text-indigo-400" fill="currentColor" />
                <span>MULAI SIMULASI TRACE</span>
              </button>

              <button
                onClick={handleLoadClick}
                className="relative px-6 py-3 bg-black/40 border border-indigo-500/20 hover:border-indigo-500/60 text-stone-300 hover:text-indigo-400 font-mono font-bold text-xs rounded-sm transition-all duration-150 cursor-pointer uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <span className="font-mono text-stone-600 mr-1 text-[10px]">02.</span>
                <FolderOpen className="w-3.5 h-3.5 text-indigo-400/60" />
                <span>PULIHKAN JALUR WAKTU (LOAD)</span>
              </button>

              <button
                onClick={() => handleSubToggle("achievements")}
                className="relative px-6 py-3 bg-black/40 border border-indigo-500/20 hover:border-indigo-500/60 text-stone-300 hover:text-indigo-400 font-mono font-bold text-xs rounded-sm transition-all duration-150 cursor-pointer uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <span className="font-mono text-stone-600 mr-1 text-[10px]">03.</span>
                <Award className="w-3.5 h-3.5 text-pink-500/70" />
                <span>PENCAPAIAN MILESTONE ({unlockedAchievements.length}/6)</span>
              </button>

              <button
                onClick={() => handleSubToggle("help")}
                className="relative px-6 py-3 bg-black/40 border border-indigo-500/20 hover:border-indigo-500/60 text-stone-300 hover:text-indigo-400 font-mono font-bold text-xs rounded-sm transition-all duration-150 cursor-pointer uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <span className="font-mono text-stone-600 mr-1 text-[10px]">04.</span>
                <BookOpen className="w-3.5 h-3.5 text-indigo-400/40" />
                <span>PANDUAN BIJAK BER-SOSMED</span>
              </button>
            </nav>
          </div>
        )}

        {/* --- ACHIEVEMENTS GALLERY VIEW --- */}
        {activeSubView === "achievements" && (
          <div className="w-full max-w-2xl bg-[#0a0a0c]/95 border border-indigo-500/30 rounded-sm p-6 backdrop-blur-md flex flex-col justify-between h-[450px] shadow-[0_0_30px_rgba(99,102,241,0.15)] animate-[fadeInUp_0.3s_ease-out]">
            <div>
              <div className="flex justify-between items-center border-b border-indigo-500/20 pb-3 mb-4">
                <h2 className="font-mono text-sm font-bold text-indigo-400 uppercase flex items-center gap-2 tracking-wider">
                  <Award className="w-5 h-5 text-pink-500" />
                  <span>Daftar Milestone Keputusan & Karier TRACE</span>
                </h2>
                <span className="text-xs font-mono text-stone-400">Unlocked: {unlockedAchievements.length} / 6</span>
              </div>

              <div id="ach_list_scroll" className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
                {INITIAL_ACHIEVEMENTS.map(ach => {
                  const unlocked = unlockedAchievements.includes(ach.id);
                  return (
                    <div 
                      key={ach.id}
                      className={`flex gap-3 p-3 rounded-sm border transition ${
                        unlocked 
                          ? "bg-indigo-500/5 border-indigo-500/40 text-[#white]"
                          : "bg-black/50 border-stone-900 text-stone-500 opacity-60"
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {getAchievementIcon(ach.iconName, unlocked)}
                      </div>
                      <div className="flex-col">
                        <h4 className={`text-xs font-bold font-mono ${unlocked ? "text-indigo-400" : "text-stone-600"}`}>
                          {unlocked ? ach.title : "?? DIKUNCI ??"}
                        </h4>
                        <p className="text-[10px] font-sans mt-0.5 leading-relaxed text-stone-400">
                          {unlocked ? ach.description : "Kondisi pemicu tersembunyi di dalam putaran jejak digitalmu."}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => handleSubToggle("achievements")}
              className="mt-4 py-2 border border-indigo-500/30 hover:border-indigo-400 text-indigo-400 hover:bg-indigo-500/10 transition-all duration-150 cursor-pointer font-mono text-[11px] uppercase tracking-widest text-center rounded-sm"
            >
              Kembali ke Menu Awal
            </button>
          </div>
        )}

        {/* --- HELP / PLAY GUIDE VIEW --- */}
        {activeSubView === "help" && (
          <div className="w-full max-w-2xl bg-[#0a0a0c]/95 border border-indigo-500/30 rounded-sm p-6 backdrop-blur-md flex flex-col justify-between h-[450px] shadow-[0_0_30px_rgba(99,102,241,0.15)] animate-[fadeInUp_0.3s_ease-out]">
            <div>
              <div className="flex justify-between items-center border-b border-indigo-500/20 pb-3 mb-4">
                <h2 className="font-mono text-sm font-bold text-indigo-400 uppercase flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  <span>Panduan Bimbingan Literasi SMA TRACE</span>
                </h2>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto font-mono text-[11px] leading-relaxed text-stone-300 pr-1 select-text">
                <div className="p-3 bg-black/60 border border-stone-800 rounded-sm">
                  <h3 className="text-indigo-400 font-bold mb-1 uppercase text-xs">🚀 1. Mekanika Keputusan</h3>
                  <p className="font-sans text-stone-400">Pilihan Anda dinilai berdasarkan 4 pilar data: <b>Reputasi</b> (citra sosial), <b>Keamanan</b> (perlindungan data draf), <b>Kepercayaan</b> (hubungan pertemanan), dan <b>Mental</b> (kesehatan jiwa). Jaga keseimbangan statistik agar tidak berakhir tragis.</p>
                </div>

                <div className="p-3 bg-black/60 border border-stone-800 rounded-sm">
                  <h3 className="text-pink-400 font-bold mb-1 uppercase text-xs">📱 2. Integrasi Smartphone</h3>
                  <p className="font-sans text-stone-400">Untuk mengambil tindakan strategis, Anda <b>WAJIB membuka smartphone</b> (dengan menekan tombol HP di kanan bawah) dan memilih opsi keputusan langsung di dalam aplikasi sosial media milik Alya (baik WhatsApp, InstaTRACE, atau Portal Diknas Info) untuk merespons cerita.</p>
                </div>

                <div className="p-3 bg-black/60 border border-stone-800 rounded-sm">
                  <h3 className="text-cyan-400 font-bold mb-1 uppercase text-xs">🔒 3. Menghadapi Ancaman Cyber</h3>
                  <p className="font-sans text-stone-400">Hati-hati dengan situs palsu, pesan berisi paksaan verifikasi mendesak, transfer kode OTP, malware, dan kampanye bullying. Bantu Rina dari ejekan koridor dan pertahankan reputasi prima untuk meraih gelar legendaris <b>Digital Ambassador</b>.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSubToggle("help")}
              className="mt-4 py-2 border border-indigo-500/30 hover:border-indigo-400 text-indigo-400 hover:bg-indigo-500/10 transition-all duration-150 cursor-pointer font-mono text-[11px] uppercase tracking-widest text-center rounded-sm"
            >
              Kembali ke Menu Awal
            </button>
          </div>
        )}

      </main>

      {/* FOOTER STATS PANEL */}
      <footer className="relative flex flex-col sm:flex-row justify-between items-center gap-2 border-t border-indigo-500/10 pt-6 z-10 w-full max-w-5xl mx-auto text-stone-600 font-mono text-[9px] uppercase select-none">
        <span>© 2026 SMAN TRACE // CORE SYSTEM: ONLINE</span>
        <span>React_TRACE Engine v2.0 // Every Click Matters</span>
      </footer>
    </div>
  );
}

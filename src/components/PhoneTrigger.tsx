/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Phone, Mail, X, ArrowLeft, Send, MessageSquare, Instagram, 
  ShieldAlert, Sparkles, User, Bell, ChevronRight, Lock, 
  Smartphone, AlertTriangle, HelpCircle, FileText
} from "lucide-react";
import { PhoneTriggerData, DMailOption, Choice } from "../types";
import { gameAudio } from "./AudioEngine";

interface PhoneTriggerProps {
  currentNodeId: string;
  choices?: Choice[];
  onSelectChoice?: (choice: Choice) => void;
  triggerData?: PhoneTriggerData;
  onSendDMail: (dmail: DMailOption) => void;
  onClose: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  chosenDecisionIds?: string[];
}

export default function PhoneTrigger({
  currentNodeId,
  choices,
  onSelectChoice,
  triggerData,
  onSendDMail,
  onClose,
  isOpen,
  onToggleOpen,
  chosenDecisionIds
}: PhoneTriggerProps) {
  const [activeTab, setActiveTab] = useState<"desktop" | "whatsapp" | "instatrace" | "sms">("desktop");
  const [selectedAction, setSelectedAction] = useState<DMailOption | null>(null);
  const [waScreen, setWaScreen] = useState<"list" | "group" | "rina">("list");
  const [instaScreen, setInstaScreen] = useState<"list" | "feed" | "direct">("list");
  const [diknasScreen, setDiknasScreen] = useState<"list" | "inbox" | "guide">("list");

  // Sound cue when opening
  useEffect(() => {
    if (isOpen) {
      gameAudio.playSfx("beep");
    }
  }, [isOpen]);

  // Escape key listener to close the phone easily (solves closing bug)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        gameAudio.playSfx("click");
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Whenever a new triggerData comes (D-Mail or push notifications), pre-open the correct tab
  useEffect(() => {
    if (triggerData && triggerData.availableDMails.length > 0) {
      const firstAction = triggerData.availableDMails[0];
      setSelectedAction(firstAction);
      if (firstAction.destination.includes("Instasham") || firstAction.destination.includes("InstaTRACE")) {
        setActiveTab("instatrace");
        setInstaScreen("direct");
      } else if (firstAction.destination.includes("Chat") || firstAction.destination.includes("WA")) {
        setActiveTab("whatsapp");
        setWaScreen("group");
      } else {
        setActiveTab("sms");
        setDiknasScreen("inbox");
      }
    }
  }, [triggerData]);

  // Auto route tabs depending on decision context to make UI natural
  useEffect(() => {
    if (choices && choices.length > 0) {
      if (currentNodeId.includes("1_1") || currentNodeId.includes("day1_event2")) {
        setActiveTab("whatsapp");
        if (currentNodeId.includes("1_1")) {
          setWaScreen("group");
        } else {
          setWaScreen("rina");
        }
      } else if (currentNodeId.includes("2_1")) {
        setActiveTab("instatrace");
        setInstaScreen("feed");
      } else if (currentNodeId.includes("day2_event2")) {
        setActiveTab("whatsapp");
        setWaScreen("rina");
      } else if (currentNodeId.includes("3_1")) {
        setActiveTab("instatrace");
        setInstaScreen("direct");
      } else if (currentNodeId.includes("day3_event2")) {
        setActiveTab("sms");
        setDiknasScreen("inbox");
      } else {
        setActiveTab("desktop");
      }
    }
  }, [choices, currentNodeId]);

  const handleTransactAction = (dmail: DMailOption) => {
    gameAudio.playSfx("click");
    onSendDMail(dmail);
    setActiveTab("desktop");
    setSelectedAction(null);
  };

  const handleChoiceSelection = (choice: Choice) => {
    if (onSelectChoice) {
      onSelectChoice(choice);
    }
  };

  // Determine current "Day"/state folder to show relative chat history
  const isDay1 = currentNodeId.startsWith("start") || currentNodeId.startsWith("grup_kelas") || currentNodeId.startsWith("day1_") || currentNodeId.startsWith("event_1_1");
  const isDay2 = currentNodeId.startsWith("day2_") || currentNodeId.startsWith("event_2_1");
  const isDay3 = currentNodeId.startsWith("day3_") || currentNodeId.startsWith("event_3_1");
  const isDay4 = currentNodeId.startsWith("day4_") || currentNodeId.startsWith("ending_") || currentNodeId.startsWith("game_completed");

  if (!isOpen) {
    return (
      <button
        id="phone_trigger_button"
        onClick={onToggleOpen}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-4 bg-indigo-950/95 hover:bg-indigo-900 text-white font-mono text-xs font-bold rounded-full shadow-[0_4px_30px_rgba(99,102,241,0.5)] border border-indigo-500 animate-bounce transition duration-200 uppercase tracking-widest cursor-pointer"
      >
        <span className="relative flex h-2.5 w-2.5">
          {(triggerData || choices) && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          )}
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
        </span>
        <Phone className="w-4 h-4 text-pink-400" />
        {choices ? "PILIH TINDAKAN!" : triggerData ? "ADA NOTIFIKASI!" : "BUKA PHONE"}
      </button>
    );
  }

  return (
    <div 
      id="phone_modern_overlay"
      onClick={(e) => {
        // Close phone if clicking outside phone_hardware overlay frame
        if (e.target === e.currentTarget) {
          gameAudio.playSfx("click");
          onClose();
        }
      }}
      className="fixed inset-0 sm:inset-y-0 sm:left-auto sm:right-0 sm:w-100 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300"
    >
      {/* Floating Red Close Button next to phone design (helps touch & mouse click departures) */}
      <button
        id="phone_floating_close_btn"
        onClick={() => { gameAudio.playSfx("click"); onClose(); }}
        className="absolute top-4 right-4 sm:top-10 sm:-left-16 w-12 h-12 bg-red-600 hover:bg-red-500 text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white hover:scale-105 transition-all cursor-pointer z-50"
        title="Tutup Ponsel (ESC)"
      >
        <X className="w-5 h-5 font-bold" />
      </button>

      <div 
        id="phone_hardware"
        className="relative w-[350px] h-[650px] bg-[#121214] border-[5px] border-[#2d2d30] rounded-[48px] shadow-[0_0_60px_rgba(0,0,0,0.95)] p-4 flex flex-col justify-between overflow-hidden border-indigo-900/20"
        style={{ boxShadow: "0 0 45px rgba(99, 102, 241, 0.35)" }}
      >
        {/* Dynamic Island Screen Notch with a micro status indicator */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-32 h-5.5 bg-black rounded-full z-30 flex items-center justify-between px-4">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/80 animate-pulse" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 border border-zinc-800" />
        </div>

        {/* --- SMARTPHONE SCREEN --- */}
        <div className="relative w-full h-[570px] bg-[#0c0c0e] rounded-[34px] overflow-hidden flex flex-col border border-stone-850">
          
          {/* Subtle Cyber Wallpaper backdrop mesh */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#05060f] via-[#090b14] to-[#120e1c] z-0 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none z-0" />
          
          {/* Status bar */}
          <div className="relative z-10 flex justify-between items-center px-6 pt-3.5 pb-1 select-none font-sans font-semibold text-[10px] text-stone-400">
            <span>08:15 WIB</span>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-[#22d3ee] font-mono font-bold">LTS SECURE</span>
              <span>📶 5G</span>
              <span className="w-5 h-2.5 border border-stone-500 rounded-xs flex items-center p-0.5"><span className="w-full h-full bg-emerald-500 rounded-2xs" /></span>
            </div>
          </div>

          {/* Core Apps Window Container */}
          <div className="relative z-10 flex-1 flex flex-col mt-2.5 overflow-hidden text-stone-100 font-sans">
            
            {/* ==================== SCREEN 1: DESKTOP HOME VIEW ==================== */}
            {activeTab === "desktop" && (
              <div className="flex-1 flex flex-col justify-between p-4.5">
                
                {/* Clean user greeting widget */}
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl backdrop-blur-xl">
                  <div className="text-[9px] text-pink-400 font-bold uppercase tracking-widest flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>ALYA'S DIGITAL CORE</span>
                  </div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5 mt-1">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                    <span>SMAN TRACE Student ID</span>
                  </h3>
                  <p className="text-[10px] text-stone-300 mt-1 leading-relaxed">
                    Setiap interaksi sosial, klik tautan, dan penyebaran opini akan dinilai secara otomatis oleh program reputasi digital OS BK.
                  </p>
                </div>

                {/* Priority decision alert box (Fulfills story decisions on phone) */}
                {choices && (
                  <div className="bg-red-950/20 border-2 border-red-500/60 p-3 rounded-2xl backdrop-blur-md text-left my-2 animate-pulse">
                    <div className="text-[9px] text-red-400 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1.5 animate-bounce">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>KATA KUNCI KEPUTUSAN</span>
                    </div>
                    <p className="text-[10px] text-stone-200 mb-2 font-medium leading-relaxed">
                      Silakan buka aplikasi yang berkedip di menu bawah untuk tanggapan formal. Atau pilih keputusan langsung di bawah ini:
                    </p>
                    <div className="space-y-1.5">
                      {choices.map((choice, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleChoiceSelection(choice)}
                          className="w-full text-left p-2 bg-black/90 hover:bg-neutral-800 border border-red-500/30 hover:border-red-400 rounded-lg text-[9.5px] font-sans font-medium text-stone-300 flex items-center justify-between gap-1 transition-all cursor-pointer"
                        >
                          <span className="truncate max-w-[210px]">{choice.text}</span>
                          <ChevronRight className="w-3 h-3 text-red-500 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notifications alert bar if push action active */}
                {triggerData && !choices && (
                  <div 
                    onClick={() => {
                      gameAudio.playSfx("click");
                      const dest = triggerData.availableDMails[0].destination;
                      if (dest.includes("Instasham") || dest.includes("InstaTRACE")) setActiveTab("instatrace");
                      else if (dest.includes("Chat") || dest.includes("WA")) setActiveTab("whatsapp");
                      else setActiveTab("sms");
                    }}
                    className="bg-indigo-900/30 border border-indigo-700/50 p-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer animate-[pulse_2s_infinite]"
                  >
                    <Bell className="w-4 h-4 text-[#22d3ee] animate-bounce shrink-0" />
                    <div className="text-left">
                      <span className="text-[8px] font-mono font-bold text-gray-400 block uppercase">Pemberitahuan Sistem (SMS/Chat)</span>
                      <p className="text-[9.5px] text-stone-200 truncate font-semibold w-[200px]">
                        {triggerData.promptText}
                      </p>
                    </div>
                  </div>
                )}

                {/* --- PHONE APP LAUNCHER DESKTOP SQUARES --- */}
                <div 
                  id="launcher_app_grid"
                  className="grid grid-cols-3 gap-y-5 gap-x-4 px-2 py-4 mt-auto border-t border-white/5 bg-zinc-950/40 rounded-3xl"
                >
                  {/* APP 1: WHATSAPP GREEN CHAT */}
                  <button 
                    onClick={() => { gameAudio.playSfx("click"); setActiveTab("whatsapp"); setWaScreen("list"); }}
                    className="group flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <div className="relative w-11 h-11 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg border border-emerald-400/20 group-hover:scale-105 transition">
                      <MessageSquare className="w-5.5 h-5.5 text-white" />
                      {((choices && (currentNodeId.includes("1_1") || currentNodeId.includes("day1_event2") || currentNodeId.includes("day2_event2"))) || (selectedAction && (selectedAction.destination.includes("Chat") || selectedAction.destination.includes("WA")))) && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border border-white rounded-full animate-ping" />
                      )}
                    </div>
                    <span className="text-[9px] text-stone-300 font-semibold group-hover:text-white">WhatsApp</span>
                  </button>

                  {/* APP 2: INSTATRACE PINK MEDIA */}
                  <button 
                    onClick={() => { gameAudio.playSfx("click"); setActiveTab("instatrace"); setInstaScreen("list"); }}
                    className="group flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <div className="relative w-11 h-11 bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg border border-pink-450/20 group-hover:scale-105 transition">
                      <Instagram className="w-5.5 h-5.5 text-white" />
                      {((choices && (currentNodeId.includes("2_1") || currentNodeId.includes("3_1"))) || (selectedAction && (selectedAction.destination.includes("Instasham") || selectedAction.destination.includes("InstaTRACE")))) && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border border-white rounded-full animate-ping" />
                      )}
                    </div>
                    <span className="text-[9px] text-stone-300 font-semibold group-hover:text-white">InstaTRACE</span>
                  </button>

                  {/* APP 3: DIKNAS PORTAL BLUE INFO */}
                  <button 
                    onClick={() => { gameAudio.playSfx("click"); setActiveTab("sms"); setDiknasScreen("list"); }}
                    className="group flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <div className="relative w-11 h-11 bg-sky-600 rounded-2xl flex items-center justify-center shadow-lg border border-sky-400/20 group-hover:scale-105 transition">
                      <Mail className="w-5.5 h-5.5 text-white" />
                      {((choices && (currentNodeId.includes("day3_event2"))) || (selectedAction && selectedAction.destination.includes("Diknas"))) && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border border-white rounded-full animate-ping" />
                      )}
                    </div>
                    <span className="text-[9px] text-stone-300 font-semibold group-hover:text-white">Diknas Info</span>
                  </button>

                </div>
              </div>
            )}

            {/* ==================== SCREEN 2: WHATSAPP CHAT CHANNELS ==================== */}
            {activeTab === "whatsapp" && (
              <div className="flex-1 flex flex-col bg-[#111] h-full text-left">
                {waScreen === "list" ? (
                  <div className="flex-grow flex flex-col bg-[#111] h-full">
                    {/* List Header */}
                    <div className="bg-[#121b1f] px-3.5 py-3 border-b border-stone-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => { gameAudio.playSfx("click"); setActiveTab("desktop"); }}
                          className="text-emerald-500 mr-1 flex items-center gap-0.5 font-bold cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-bold text-[#e9edef]">WhatsApp</span>
                      </div>
                      <div className="flex gap-2.5 text-zinc-400">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Chat Rows */}
                    <div className="flex-1 overflow-y-auto bg-[#0b141a]">
                      {/* Class Group Row */}
                      <div 
                        onClick={() => { gameAudio.playSfx("click"); setWaScreen("group"); }}
                        className="flex items-center justify-between p-3 border-b border-stone-900 hover:bg-zinc-900/40 cursor-pointer transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center text-xs font-bold text-white shadow font-mono">
                            GK
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-bold text-[#e9edef]">Grup Kelas X-A</span>
                            <span className="text-[9px] text-zinc-400 truncate max-w-[150px]">
                              {isDay4 ? "Bu Rahma BK: Selamat pagi..." : 
                               isDay3 ? "Fino: Guys, AKUN IG..." :
                               isDay2 ? "Fino: Hahaha, Al, cepetan..." :
                                        "Fino: Guys! Ada info..."}
                            </span>
                          </div>
                        </div>
                        {((choices && (currentNodeId.includes("1_1"))) || (selectedAction && selectedAction.destination.includes("Kelas"))) && (
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                      </div>

                      {/* Rina Private Row */}
                      <div 
                        onClick={() => { gameAudio.playSfx("click"); setWaScreen("rina"); }}
                        className="flex items-center justify-between p-3 border-b border-stone-900 hover:bg-zinc-900/40 cursor-pointer transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-pink-700 flex items-center justify-center text-xs font-bold text-white shadow font-sans">
                            R
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-bold text-[#e9edef]">Rina Classmate</span>
                            <span className="text-[9px] text-zinc-400 truncate max-w-[150px]">
                              {isDay4 ? "Rina: Makasih banyak..." :
                               isDay3 ? "Rina: Alya! WA kamu..." :
                               isDay2 ? "Rina: Alya, aku beneran..." :
                                        "Rina: Alya, maaf banget..."}
                            </span>
                          </div>
                        </div>
                        {((choices && (currentNodeId.includes("day1_event2") || currentNodeId.includes("day2_event2"))) || (selectedAction && selectedAction.destination.includes("Rina"))) && (
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                      </div>
                    </div>
                  </div>
                ) : waScreen === "group" ? (
                  <div className="flex-1 flex flex-col h-full">
                    {/* Chat App Header */}
                    <div className="bg-[#121b1f] px-3.5 py-3 border-b border-stone-800 flex items-center gap-2">
                      <button 
                        onClick={() => { gameAudio.playSfx("click"); setWaScreen("list"); }}
                        className="text-emerald-500 mr-2 flex items-center gap-0.5 font-bold cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-[#e9edef] truncate">WhatsApp Kelas X-A</h4>
                        <span className="text-[8px] text-emerald-400 font-mono block uppercase">Online: Rina, Fino, Alya</span>
                      </div>
                    </div>

                    {/* Messages feeds relative to day development */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-[#0b141a] flex flex-col justify-between">
                      <div id="wa_chat_scroll" className="space-y-3.5 overflow-y-auto max-h-[300px]">
                        {/* Day 1 Messages */}
                        {true && (
                          <>
                            <div className="bg-[#121b22] px-3 py-2 rounded-xl rounded-tl-none max-w-[85%] border border-[#1a2d3b] text-left">
                              <span className="text-[9px] font-extrabold text-[#53bdeb] block">Fino (Sekretaris)</span>
                              <p className="text-[#e9edef] text-[10px] mt-0.5 leading-relaxed font-sans">
                                Guys! Ada info gawat banget nih! Gw dapet forward-an dari grup sebelah katanya ada kebocoran nilai seleksi beasiswa kelas kita! Katanya panitianya curang dan bakal ada pemotongan kuota sepihak! Yuk isi petisi protes massal di link ini!
                              </p>
                              <span className="text-[8px] text-zinc-500 block text-right mt-1">info-beasiswa-gratisankita.blogspot-secure.com</span>
                            </div>

                            <div className="bg-[#121b22] px-3 py-2 rounded-xl rounded-tl-none max-w-[85%] border border-[#1a2d3b] text-left">
                              <span className="text-[9px] font-extrabold text-[#e15987] block">Rina Classmate</span>
                              <p className="text-[#e9edef] text-[10px] mt-0.5 leading-relaxed font-sans">
                                Seriusan, Fin? Duh, aku kan bergantung banget sama beasiswa itu... Kalau beneran dipotong, gimana dong nasibku? Aku cemas banget nih.
                              </p>
                              <span className="text-[8px] text-[#e15987] block text-right mt-1">Duh kepikiran... 😭</span>
                            </div>

                            {(chosenDecisionIds?.includes("day1_factcheck") || currentNodeId.startsWith("day1_factcheck") || !isDay1) && (
                              <div className="bg-[#005c4b] px-3 py-2 rounded-xl rounded-tr-none max-w-[85%] self-end ml-auto text-left">
                                <span className="text-[9px] font-bold text-emerald-300 block">Alya (Kamu)</span>
                                <p className="text-white text-[10px] mt-0.5 leading-relaxed font-sans">
                                  Guys, itu hoaks ya. Aku barusan tanya Kak OSIS dan cek web sekolah. Kabar kuota dipotong itu fitnah, dan jangan asal klik linknya, takutnya phishing.
                                </p>
                                <span className="text-[8px] text-emerald-200 block text-right">08:17 WIB ✓✓</span>
                              </div>
                            )}

                            {(chosenDecisionIds?.includes("day1_spreadhoax") || currentNodeId.startsWith("day1_spreadhoax")) && (
                              <div className="bg-[#005c4b] px-3 py-2 rounded-xl rounded-tr-none max-w-[85%] self-end ml-auto text-left">
                                <span className="text-[9px] font-bold text-emerald-300 block">Alya (Kamu)</span>
                                <p className="text-white text-[10px] mt-0.5 leading-relaxed font-sans">
                                  Ayo sebarin guys biar solid dan viral ke grup-grup ekskul lainnya!
                                </p>
                                <span className="text-[8px] text-emerald-200 block text-right">08:17 WIB ✓✓</span>
                              </div>
                            )}
                          </>
                        )}

                        {/* Day 2 Messages */}
                        {(!isDay1) && (
                          <>
                            <div className="bg-[#121b22] px-3 py-2 rounded-xl rounded-tl-none max-w-[85%] border border-[#1a2d3b] text-left mt-4 border-t border-indigo-500/10">
                              <span className="text-[8px] font-mono text-zinc-500 block uppercase border-b border-indigo-500/5 pb-1 mb-1.5 font-bold">HARI 2</span>
                              <span className="text-[9px] font-extrabold text-[#53bdeb] block">Fino (Sekretaris)</span>
                              <p className="text-[#e9edef] text-[10px] mt-0.5 leading-relaxed font-sans">
                                Hahaha, Al, cepetan liat postingan @lambe_trace wkwk komuk si Rina tidur pas pelajaran sejarah absurd abis! Laler ijo otw hinggap 😂
                              </p>
                              <span className="text-[8px] text-zinc-500 block text-right mt-1">Link: lambe_trace/rina-sleep</span>
                            </div>

                            <div className="bg-[#121b22] px-3 py-2 rounded-xl rounded-tl-none max-w-[85%] border border-[#1a2d3b] text-left">
                              <span className="text-[9px] font-extrabold text-[#e15987] block">Rina Classmate</span>
                              <p className="text-[#e9edef] text-[10px] mt-0.5 leading-relaxed font-sans">
                                Kenapa ya ada orang se-jahat itu foto diem-diem pas aku lagi pusing... Malu banget mau masuk kelas.
                              </p>
                            </div>
                          </>
                        )}

                        {/* Day 3 Messages */}
                        {(!isDay1 && !isDay2) && (
                          <>
                            <div className="bg-[#121b22] px-3 py-2 rounded-xl rounded-tl-none max-w-[85%] border border-[#1a2d3b] text-left mt-4 border-t border-indigo-500/10">
                              <span className="text-[8px] font-mono text-zinc-500 block uppercase border-b border-indigo-500/5 pb-1 mb-1.5 font-bold">HARI 3</span>
                              <span className="text-[9px] font-extrabold text-[#53bdeb] block">Fino (Sekretaris)</span>
                              <p className="text-[#e9edef] text-[10px] mt-0.5 leading-relaxed font-sans">
                                Guys, AKUN IG LAMAKU KEBAJAK ya! Tolong jangan percaya kalau dapet DM minta OTP free-fire atau subsidi, itu penipu hack. Gara-gara kemarin gw isi data sembarangan.
                              </p>
                            </div>

                            {(chosenDecisionIds?.includes("day3_give_otp") || currentNodeId.startsWith("day3_give_otp")) && (
                              <>
                                <div className="bg-[#005c4b] px-3 py-2 rounded-xl rounded-tr-none max-w-[85%] self-end ml-auto text-left">
                                  <span className="text-[9px] font-bold text-emerald-300 block">Alya (Kamu)</span>
                                  <p className="text-white text-[10px] mt-0.5 leading-relaxed font-mono font-bold text-pink-400">
                                    🚀 PROMO GEBYAR BULANAN DIAMOND 5000+! Klik link ini login ID kamu sekarang: trace-hacker-petisi-indonesia.com
                                  </p>
                                  <span className="text-[8px] text-red-300 block text-right font-mono">⚠️ SPAM AUTOMATED BY BOT</span>
                                </div>
                                <div className="bg-[#121b22] px-3 py-2 rounded-xl rounded-tl-none max-w-[85%] border border-[#1a2d3b] text-left">
                                  <span className="text-[9px] font-extrabold text-[#e15987] block">Rina Classmate</span>
                                  <p className="text-[#e9edef] text-[10px] mt-0.5 leading-relaxed font-sans">
                                    Alya! WA kamu kenapa kok tiba-tiba nge-spam iklan penipuan kayak Fino kemarin? Kamu kena hack juga ya?!
                                  </p>
                                </div>
                              </>
                            )}
                          </>
                        )}

                        {/* Day 4 Messages */}
                        {isDay4 && (
                          <>
                            <div className="bg-[#121b22] px-3 py-2 rounded-xl rounded-tl-none max-w-[85%] border border-[#1a2d3b] text-left mt-4 border-t border-indigo-500/10">
                              <span className="text-[8px] font-mono text-zinc-500 block uppercase border-b border-indigo-500/5 pb-1 mb-1.5 font-bold">HARI 4</span>
                              <span className="text-[9px] font-extrabold text-[#e8a317] block">Bu Rahma BK</span>
                              <p className="text-[#e9edef] text-[10px] mt-0.5 leading-relaxed font-sans">
                                Selamat pagi anak-anak kelas X-A. Hari ini kami akan melakukan pemanggilan beberapa siswa terkait laporan rekam jejak digital dan penilaian beasiswa. Harap diperhatikan keseimbangannya di etika berinternet.
                              </p>
                            </div>
                            <div className="bg-[#121b22] px-3 py-2 rounded-xl rounded-tl-none max-w-[85%] border border-[#1a2d3b] text-left">
                              <span className="text-[9px] font-extrabold text-[#53bdeb] block">Fino (Sekretaris)</span>
                              <p className="text-[#e9edef] text-[10px] mt-0.5 leading-relaxed font-sans">
                                Waduh, mampus deh gw! Kemarin abis sebar link aneh sama ngejek di lambe. Semoga ga kena suspend 😭 Enak ya Alya kayaknya catatannya bersih.
                              </p>
                            </div>
                          </>
                        )}
                      </div>

                      {/* ACTIVE ACTION DECISION BOX FOR GROUP CHAT */}
                      {choices && currentNodeId.includes("1_1") ? (
                        <div className="bg-[#182229] border border-emerald-500/50 rounded-xl p-3 shadow-xl max-w-full z-10 sticky bottom-0 text-left">
                          <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-emerald-400 mb-1.5 uppercase">
                            <ShieldAlert className="w-4 h-4 shrink-0" />
                            <span>Kirim Balasan Grup Kelas:</span>
                          </div>
                          <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                            {choices.map((choice, index) => (
                              <button
                                key={index}
                                onClick={() => handleChoiceSelection(choice)}
                                className="w-full text-left p-2.5 bg-black/90 hover:bg-neutral-800 border border-emerald-500/20 hover:border-emerald-400 rounded-lg text-[9px] leading-snug text-stone-200 hover:text-white transition cursor-pointer"
                              >
                                <span className="text-emerald-400 font-bold font-mono text-[8px] block uppercase">Opsi Balasan 0{index+1}:</span>
                                <span>{choice.text}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : selectedAction && selectedAction.destination.includes("Kelas") ? (
                        <div className="bg-[#182229] border-2 border-emerald-500/60 rounded-xl p-3 shadow-xl max-w-full sticky bottom-0 z-10 text-left">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 mb-1.5">
                            <ShieldAlert className="w-4 h-4" />
                            <span>KIRIM BALASAN D-MAIL:</span>
                          </div>
                          <div className="p-2 bg-black/60 rounded border border-stone-850 mb-2">
                            <p className="text-[10px] font-serif text-stone-200">{selectedAction.body}</p>
                          </div>
                          <button
                            onClick={() => handleTransactAction(selectedAction)}
                            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 rounded text-xs font-bold uppercase transition cursor-pointer"
                          >
                            Kirim Balasan
                          </button>
                        </div>
                      ) : (
                        <div className="py-2.5 px-3 bg-[#1f2c34] text-[#8696a0] rounded-xl text-[10px] flex items-center justify-between mt-3 select-none">
                          <span>Ketik pesan...</span>
                          <Send className="w-3.5 h-3.5 opacity-40" />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-grow flex flex-col h-full">
                    {/* Chat Header RINA */}
                    <div className="bg-[#121b1f] px-3.5 py-3 border-b border-stone-800 flex items-center gap-2">
                      <button 
                        onClick={() => { gameAudio.playSfx("click"); setWaScreen("list"); }}
                        className="text-emerald-500 mr-2 flex items-center gap-0.5 font-bold cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-[#e9edef] truncate">Rina Classmate</h4>
                        <span className="text-[8px] text-emerald-400 font-mono block uppercase">Online</span>
                      </div>
                    </div>

                    {/* Private Rina conversation */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-[#0b141a] flex flex-col justify-between">
                      <div id="wa_rina_scroll" className="space-y-3.5 overflow-y-auto max-h-[300px]">
                        {/* Day 1 Private messages */}
                        {true && (
                          <>
                            <div className="bg-[#121b22] px-3 py-2 rounded-xl rounded-tl-none max-w-[85%] border border-[#1a2d3b] text-left">
                              <span className="text-[9px] font-extrabold text-[#e15987] block">Rina Classmate</span>
                              <p className="text-[#e9edef] text-[10px] mt-0.5 leading-relaxed font-sans">
                                Alya, maaf banget ganggu malam-malam... Kamu percaya nggak sih info seleksi kuota itu dipotong? Dari sore dadaku panas banget kepikiran...
                              </p>
                            </div>

                            {(chosenDecisionIds?.includes("day1_event2_comfort") || currentNodeId.startsWith("day1_event2_comfort") || (!isDay1 && chosenDecisionIds?.every(id => id !== "day1_event2_worry"))) && (
                              <>
                                <div className="bg-[#005c4b] px-3 py-2 rounded-xl rounded-tr-none max-w-[85%] self-end ml-auto text-left">
                                  <span className="text-[9px] font-bold text-emerald-300 block">Alya (Kamu)</span>
                                  <p className="text-white text-[10px] mt-0.5 leading-relaxed font-sans">
                                    Rin, info itu udah fix hoaks kok. Jangan kepikiran ya, dapet info dari OSIS langsung. Kamu mending tidur, besok kita tanya guru BK bareng.
                                  </p>
                                </div>
                                <div className="bg-[#121b22] px-3 py-2 rounded-xl rounded-tl-none max-w-[85%] border border-[#1a2d3b] text-left">
                                  <span className="text-[9px] font-extrabold text-[#e15987] block">Rina Classmate</span>
                                  <p className="text-[#e9edef] text-[10px] mt-0.5 leading-relaxed font-sans">
                                    Ya ampun, makasih banyakk ya Al... Kata-kata kamu bikin aku jauh lebih tenang. Makasih udah mau meluangkan waktu dengerin curhatanku. Sampai jumpa besok pagi di sekolah!
                                  </p>
                                </div>
                              </>
                            )}

                            {(chosenDecisionIds?.includes("day1_event2_worry") || currentNodeId.startsWith("day1_event2_worry")) && (
                              <>
                                <div className="bg-[#005c4b] px-3 py-2 rounded-xl rounded-tr-none max-w-[85%] self-end ml-auto text-left">
                                  <span className="text-[9px] font-bold text-emerald-300 block">Alya (Kamu)</span>
                                  <p className="text-white text-[10px] mt-0.5 leading-relaxed font-sans">
                                    Duh Rin, kayaknya di sekolah ini emang rada mencurigakan sih. Mending kamu tetep waspada, siapa tahu ada benarnya loh.
                                  </p>
                                </div>
                                <div className="bg-[#121b22] px-3 py-2 rounded-xl rounded-tl-none max-w-[85%] border border-[#1a2d3b] text-left">
                                  <span className="text-[9px] font-extrabold text-[#e15987] block">Rina Classmate</span>
                                  <p className="text-[#e9edef] text-[10px] mt-0.5 leading-relaxed font-sans">
                                    Duh... beneran ya? Kepalaku langsung pusing banget dengernya... Aku jadi gak bisa tidur malam ini membayangkan hal-hal buruk... But thanks anyway.
                                  </p>
                                </div>
                              </>
                            )}
                          </>
                        )}

                        {/* Day 2 Private messages */}
                        {(!isDay1) && (
                          <>
                            <div className="bg-[#121b22] px-3 py-2 rounded-xl rounded-tl-none max-w-[85%] border border-[#1a2d3b] text-left mt-4 border-t border-indigo-500/10">
                              <span className="text-[8px] font-mono text-zinc-500 block uppercase border-b border-indigo-500/5 pb-1 mb-1.5 font-bold">HARI 2</span>
                              <span className="text-[9px] font-extrabold text-[#e15987] block">Rina Classmate</span>
                              <p className="text-[#e9edef] text-[10px] mt-0.5 leading-relaxed font-sans">
                                Alya, aku beneran pusing. Rasanya nggak kuat lagi bertahan di kelas itu besok. Malu ditunjuk-tunjuk di kantin. Aku pura-pura sakit aja ya besok?
                              </p>
                            </div>

                            {(chosenDecisionIds?.includes("day2_event2_comfort_step") || currentNodeId.startsWith("day2_event2_comfort_step") || (!isDay1 && !isDay2 && chosenDecisionIds?.every(id => id !== "day2_event2_dismiss_step"))) && (
                              <>
                                <div className="bg-[#005c4b] px-3 py-2 rounded-xl rounded-tr-none max-w-[85%] self-end ml-auto text-left">
                                  <span className="text-[9px] font-bold text-emerald-300 block">Alya (Kamu)</span>
                                  <p className="text-white text-[10px] mt-0.5 leading-relaxed font-sans">
                                    Rin, jangan menyerah ya. Besok aku anterin kamu ke Bu Rahma Guru BK. Beliau baik banget, biar diusut pelakunya. Aku nemenin.
                                  </p>
                                </div>
                                <div className="bg-[#121b22] px-3 py-2 rounded-xl rounded-tl-none max-w-[85%] border border-[#1a2d3b] text-left">
                                  <span className="text-[9px] font-extrabold text-[#e15987] block">Rina Classmate</span>
                                  <p className="text-[#e9edef] text-[10px] mt-0.5 leading-relaxed font-sans font-semibold">
                                    Alya... kamu baik banget... Makasih banyak ya udah peduli sama aku. Besok pagi kita ke ruang BK bareng ya. Selamat istirahat.
                                  </p>
                                </div>
                              </>
                            )}

                            {(chosenDecisionIds?.includes("day2_event2_dismiss_step") || currentNodeId.startsWith("day2_event2_dismiss_step")) && (
                              <>
                                <div className="bg-[#005c4b] px-3 py-2 rounded-xl rounded-tr-none max-w-[85%] self-end ml-auto text-left">
                                  <span className="text-[9px] font-bold text-emerald-300 block">Alya (Kamu)</span>
                                  <p className="text-white text-[10px] mt-0.5 leading-relaxed font-sans">
                                    Halah Rin, nggak usah baperan napa. Namanya juga sosmed, besok juga mereka udah lupa kalo ada gosip baru. Dibawa santai aja kali.
                                  </p>
                                </div>
                                <div className="bg-[#121b22] px-3 py-2 rounded-xl rounded-tl-none max-w-[85%] border border-[#1a2d3b] text-left">
                                  <span className="text-[9px] font-extrabold text-[#e15987] block">Rina Classmate</span>
                                  <p className="text-[#e9edef] text-[10px] mt-0.5 leading-relaxed font-sans">
                                    Oh... begitu ya... Mungkin emang aku aja yang terlalu berlebihan. Maaf ya udah nyampah curhat sama kamu... Aku tidur duluan.
                                  </p>
                                </div>
                              </>
                            )}
                          </>
                        )}

                        {/* Day 3 Warning if hacked */}
                        {(!isDay1 && !isDay2 && (chosenDecisionIds?.includes("day3_give_otp") || currentNodeId.startsWith("day3_give_otp"))) && (
                          <div className="bg-[#121b22] px-3 py-2 rounded-xl rounded-tl-none max-w-[85%] border border-[#1a2d3b] text-left mt-4 border-t border-indigo-500/10">
                            <span className="text-[8px] font-mono text-zinc-500 block uppercase border-b border-indigo-500/5 pb-1 mb-1.5 font-bold">HARI 3</span>
                            <span className="text-[9px] font-extrabold text-[#e15987] block">Rina Classmate</span>
                            <p className="text-[#e9edef] text-[10px] mt-0.5 leading-relaxed font-sans font-semibold">
                              Alya! WA kamu kenapa kok tiba-tiba spam pinjol fiktif dan konten penipuan ke kontakku? Kamu kena hack?! Tolong amanin HP-mu ya, ngeri banget!
                            </p>
                          </div>
                        )}
                      </div>

                      {/* ACTIVE ACTION DECISION BOX FOR RINA PRIVATE CHAT */}
                      {choices && (currentNodeId.includes("day1_event2") || currentNodeId.includes("day2_event2")) ? (
                        <div className="bg-[#182229] border border-emerald-500/50 rounded-xl p-3 shadow-xl max-w-full z-10 sticky bottom-0 text-left">
                          <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-emerald-400 mb-1.5 uppercase">
                            <ShieldAlert className="w-4 h-4 shrink-0" />
                            <span>Kirim Chat Pribadi ke Rina:</span>
                          </div>
                          <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                            {choices.map((choice, index) => (
                              <button
                                key={index}
                                onClick={() => handleChoiceSelection(choice)}
                                className="w-full text-left p-2.5 bg-black/90 hover:bg-neutral-800 border border-emerald-500/20 hover:border-emerald-400 rounded-lg text-[9px] leading-snug text-stone-200 hover:text-white transition cursor-pointer"
                              >
                                <span className="text-emerald-400 font-bold font-mono text-[8px] block uppercase">Tanggapan 0{index+1}:</span>
                                <span>{choice.text}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : selectedAction && selectedAction.destination.includes("Rina") ? (
                        <div className="bg-[#182229] border-2 border-emerald-500/60 rounded-xl p-3 shadow-xl max-w-full sticky bottom-0 z-10 text-left">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#10b981] mb-1.5">
                            <ShieldAlert className="w-4 h-4" />
                            <span>KIRIM JAPRI D-MAIL:</span>
                          </div>
                          <div className="p-2 bg-black/60 rounded border border-stone-850 mb-2">
                            <p className="text-[10px] font-serif text-stone-200">{selectedAction.body}</p>
                          </div>
                          <button
                            onClick={() => handleTransactAction(selectedAction)}
                            className="w-full py-2 bg-[#10b981] hover:bg-emerald-500 rounded text-xs font-bold uppercase transition cursor-pointer"
                          >
                            Kirim Japri
                          </button>
                        </div>
                      ) : (
                        <div className="py-2.5 px-3 bg-[#1f2c34] text-[#8696a0] rounded-xl text-[10px] flex items-center justify-between mt-3 select-none">
                          <span>Ketik pesan...</span>
                          <Send className="w-3.5 h-3.5 opacity-40" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
                      {/* ==================== SCREEN 3: INSTATRACE SOCIAL NEWS & DMS ==================== */}
            {activeTab === "instatrace" && (
              <div className="flex-1 flex flex-col bg-[#111] h-full text-left">
                {instaScreen === "list" ? (
                  <div className="flex-grow flex flex-col bg-[#111] h-full">
                    {/* Instatrace Main Header */}
                    <div className="bg-[#18181b] px-3.5 py-3 border-b border-stone-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => { gameAudio.playSfx("click"); setActiveTab("desktop"); }}
                          className="text-pink-500 flex items-center cursor-pointer font-bold mr-1"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 bg-clip-text text-transparent font-serif italic tracking-wide">
                          InstaTRACE
                        </span>
                      </div>
                      <User className="w-4 h-4 text-stone-400" />
                    </div>

                    {/* Channel / Area List */}
                    <div className="flex-1 overflow-y-auto bg-black p-3.5 space-y-3">
                      {/* Feeds Card */}
                      <div 
                        onClick={() => { gameAudio.playSfx("click"); setInstaScreen("feed"); }}
                        className="flex items-center justify-between p-3.5 bg-zinc-900/60 hover:bg-zinc-900 border border-stone-850 hover:border-pink-500/30 rounded-xl cursor-pointer transition select-none"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center text-white shadow shadow-pink-500/20">
                            <Instagram className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-bold text-stone-200">Beranda Berita (Feed)</span>
                            <span className="text-[9px] text-zinc-400">Gosip hangat & kabar resmi angkatan SMA TRACE</span>
                          </div>
                        </div>
                        {((choices && (currentNodeId.includes("2_1"))) || isDay2) && (
                          <div className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
                        )}
                      </div>

                      {/* Direct Messages Card */}
                      <div 
                        onClick={() => { gameAudio.playSfx("click"); setInstaScreen("direct"); }}
                        className="flex items-center justify-between p-3.5 bg-zinc-900/60 hover:bg-zinc-900 border border-stone-850 hover:border-pink-500/30 rounded-xl cursor-pointer transition select-none"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-550 flex items-center justify-center text-white shadow shadow-purple-500/20">
                            <MessageSquare className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-bold text-stone-200">Pesan Masuk (DMs)</span>
                            <span className="text-[9px] text-zinc-400">Pemberitahuan giveaway & chat pribadi</span>
                          </div>
                        </div>
                        {((choices && (currentNodeId.includes("3_1"))) || isDay3) && (
                          <div className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
                        )}
                      </div>
                    </div>
                  </div>
                ) : instaScreen === "feed" ? (
                  <div className="flex-grow flex flex-col bg-[#111] h-full">
                    {/* Instatrace Header */}
                    <div className="bg-[#18181b] px-3.5 py-3 border-b border-stone-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => { gameAudio.playSfx("click"); setInstaScreen("list"); }}
                          className="text-pink-500 flex items-center cursor-pointer font-bold mr-1"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-bold text-stone-300 font-serif italic tracking-wide">
                          Beranda Berita
                        </span>
                      </div>
                      <User className="w-4 h-4 text-stone-400" />
                    </div>

                    {/* Feed content scroll */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-4 bg-black flex flex-col justify-between">
                      <div id="insta_scroll_body" className="space-y-4 overflow-y-auto max-h-[300px] w-full">
                        {/* Day 1: Humas info posts */}
                        {isDay1 && (
                          <div className="border border-stone-900 bg-[#0c0c0e] rounded-xl overflow-hidden p-2.5">
                            <div className="flex items-center gap-2 mb-2">
                              <img 
                                src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=80&q=80" 
                                className="w-5.5 h-5.5 rounded-full object-cover border border-indigo-500/20"
                                alt="Humas"
                                referrerPolicy="no-referrer"
                              />
                              <span className="text-[10px] font-bold text-zinc-200">@sman1_trace_info ✓</span>
                            </div>
                            <div className="w-full h-24 bg-gradient-to-br from-indigo-950/20 to-stone-950 rounded-md flex flex-col items-center justify-center p-3 text-center text-[10px] border border-indigo-950/40">
                              <ShieldAlert className="w-5 h-5 text-indigo-400 mb-1" />
                              <span className="font-bold text-white text-[9.5px]">HOAKS BEASISWA</span>
                              <span className="text-zinc-400 text-[8px] mt-0.5">Kabid Humas SMAN TRACE</span>
                            </div>
                            <p className="text-[9.5px] text-stone-300 mt-2 leading-relaxed text-left">
                              Pemberitahuan resmi: Tautan eksternal petisi kuota beasiswa adalah bermuatan hoaks dan malware. Lindungi kredensial akun media sosial sekolah Anda.
                            </p>
                          </div>
                        )}

                        {/* Day 2: Cyberbullying Case study - photo of Rina */}
                        {isDay2 && (
                          <div className="border border-stone-900 bg-[#0c0c0e] rounded-xl overflow-hidden p-2.5 text-left">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-5.5 h-5.5 rounded-full bg-pink-500/20 border border-pink-500 flex items-center justify-center text-[8px] text-pink-400 font-bold font-serif">L</div>
                              <span className="text-[10px] font-bold text-stone-200">@lambe_trace</span>
                            </div>
                            
                            {/* Mock sleepy photo photo illustration block */}
                            <div className="w-full h-32 bg-stone-900 rounded-md flex flex-col items-center justify-center relative p-3 text-center border border-pink-950/40">
                              <div className="absolute top-2 right-2 bg-black/60 px-2 py-0.5 rounded text-[8px] font-mono text-pink-400">#VIRAL</div>
                              <User className="w-8 h-8 text-zinc-650 opacity-40 mb-1" />
                              <span className="text-[9px] font-semibold text-zinc-400">[Foto Rina tidur mangap di meja kayu kelas X-A]</span>
                            </div>

                            <p className="text-[9.5px] text-stone-300 mt-2.5 leading-relaxed text-left">
                              TERCIDUK! Siswi teladan X-A mangap hoki pas pelajaran sejarah. Laler ijo otw hinggap nih guys 😂 #LambeTrace #SmaHitz #GossipSekolah
                            </p>

                            {/* Interactive comments logs below */}
                            <div className="mt-3.5 border-t border-stone-850 pt-2 space-y-1.5 text-[9px]">
                              <div className="text-stone-400 text-left">
                                <span className="font-bold text-stone-300">@fino.trg:</span> Wkwk epic fail parah! 😂
                              </div>
                              
                              {/* Player Comment show results */}
                              {(chosenDecisionIds?.includes("day2_report_support") || currentNodeId.startsWith("day2_report_support")) && (
                                <div className="text-emerald-400 bg-emerald-950/10 p-1 border-l-2 border-emerald-500 pl-1.5 text-left">
                                  <span className="font-bold text-emerald-300">@alya.digital (Kamu):</span> Sumpah ga sopan banget foto orang tidur disebar tanpa izin. Report massal akun ini guys!
                                </div>
                              )}

                              {(chosenDecisionIds?.includes("day2_join_laugh") || currentNodeId.startsWith("day2_join_laugh")) && (
                                <div className="text-red-400 bg-red-950/10 p-1 border-l-2 border-red-500 pl-1.5 text-left">
                                  <span className="font-bold text-red-300">@alya.digital (Kamu):</span> Wkwk laler ijo auto mendarat sih itu 😂
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Day 3 / Default Information feed */}
                        {isDay3 && (
                          <div className="border border-stone-900 bg-[#0c0c0e] rounded-xl overflow-hidden p-2.5">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-[9.5px] font-bold text-stone-200">@sman1_trace_info ✓</span>
                            </div>
                            <p className="text-[9px] text-[#22d3ee] font-sans leading-relaxed text-left">
                              Peringatan Keamanan Kampus: Akun Fino (@fino.trg01) baru saja diretas. Harap abaikan pesan mencurigakan yang mengatasnamakan undian beasiswa.
                            </p>
                          </div>
                        )}

                        {/* Day 4: Cyber awareness */}
                        {isDay4 && (
                          <div className="border border-stone-900 bg-[#0c0c0e] rounded-xl overflow-hidden p-2.5">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-[9.5px] font-bold text-stone-200">@cyber_security_club</span>
                            </div>
                            <p className="text-[9px] text-[#22d3ee] font-serif leading-relaxed text-left">
                              "Kebocoran satu OTP saja berpeluang merusak reputasi seluruh kontak digitalmu." Tetap waspada rekayasa sosiologis!
                            </p>
                          </div>
                        )}
                      </div>

                      {/* ACTIVE ACTION COMMENT OR ATTACH BOX (InstaTRACE decisions context Day 2) */}
                      {choices && currentNodeId.includes("2_1") ? (
                        <div className="bg-stone-900 border border-pink-500/50 rounded-xl p-3 shadow-xl max-w-full sticky bottom-0 z-10 text-left">
                          <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-pink-400 mb-1.5 uppercase">
                            <Instagram className="w-4 h-4 shrink-0" />
                            <span>Pilih Reaksi Post:</span>
                          </div>
                          
                          <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                            {choices.map((choice, index) => (
                              <button
                                key={index}
                                onClick={() => handleChoiceSelection(choice)}
                                className="w-full text-left p-2.5 bg-black hover:bg-zinc-900 border border-pink-500/20 hover:border-pink-400 rounded-lg text-[9px] leading-snug text-stone-200 hover:text-white transition cursor-pointer"
                              >
                                <span className="text-pink-400 font-bold font-mono text-[8px] block uppercase">Tanggapan 0{index+1}:</span>
                                <span>{choice.text}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="py-2.5 px-3 bg-stone-900 text-stone-500 rounded-xl text-[9px] uppercase tracking-wider text-center select-none border border-stone-850 font-semibold mt-auto">
                          Komentar telah dibatasi oleh admin
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-grow flex flex-col bg-[#111] h-full">
                    {/* Instatrace DM Header */}
                    <div className="bg-[#18181b] px-3.5 py-3 border-b border-stone-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => { gameAudio.playSfx("click"); setInstaScreen("list"); }}
                          className="text-pink-500 flex items-center cursor-pointer font-bold mr-1"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-bold text-stone-300 font-mono tracking-wide">
                          Pesan Masuk DM
                        </span>
                      </div>
                      <User className="w-4 h-4 text-stone-400" />
                    </div>

                    {/* Direct message content scroll */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-4 bg-[#0a0a0c] flex flex-col justify-between">
                      <div id="insta_dm_scroll" className="space-y-4 overflow-y-auto max-h-[300px] w-full text-left">
                        {/* Day 3: DM Phishing message from Fake Fino */}
                        <div className="border border-stone-900 bg-[#0c0c0e] rounded-xl p-3">
                          <div className="flex items-center gap-2 border-b border-stone-850 pb-2 mb-2">
                            <div className="w-5 h-5 rounded-full bg-indigo-900 border border-indigo-400 flex items-center justify-center text-[8px] text-indigo-300 font-bold font-mono">F</div>
                            <div className="flex-col">
                              <span className="text-[9.5px] font-bold text-stone-200 block">@fino.trg01</span>
                              <span className="text-[7.5px] text-pink-500 block">Pesan Pribadi Terbuka (Direct Message)</span>
                            </div>
                          </div>

                          <div className="p-2.5 bg-zinc-950 border border-zinc-850 rounded-lg text-[9.5px] leading-relaxed text-zinc-300">
                            <p className="font-bold text-pink-300 mb-1">🎁 GIVEAWAY DIAMOND & SUBSIDI BEASISWA!</p>
                            Alya! Selamat ya akun kamu terpilih menang giveaway Diamond 5000 + subsidi beasiswa SMAN TRACE! Biar hadiah langsung dikirim malam ini, tolong klik link <span className="text-indigo-400 underline animate-pulse">secure-trace-giveaway.net</span> dan kirimkan kode verifikasi OTP 4 digit yang masuk ke nomor SMS kamu ya! Gampang banget kan?
                          </div>
                        </div>

                        {/* Player Comment show results */}
                        {(chosenDecisionIds?.includes("day3_protect_reina") || currentNodeId.startsWith("day3_protect_reina")) && (
                          <div className="text-[#10b981] bg-emerald-950/20 p-2.5 border-l-2 border-emerald-500 rounded-md">
                            <span className="font-bold text-emerald-400 text-[8.5px] block uppercase">PILIHAN KAMU:</span>
                            <span className="text-[9.5px]">Melaporkan penipuan giveaway ini ke Bu BK/Keluarga & menolak membagikan kode OTP. Akun kamu Aman!</span>
                          </div>
                        )}

                        {(chosenDecisionIds?.includes("day3_give_otp") || currentNodeId.startsWith("day3_give_otp")) && (
                          <div className="text-red-400 bg-red-950/20 p-2.5 border-l-2 border-red-500 rounded-md">
                            <span className="font-bold text-red-300 text-[8.5px] block uppercase">PILIHAN KAMU:</span>
                            <span className="text-[9.5px]">Memberikan 4 Digit Kode OTP WA ke penipu. Akun WA kamu langsung ter-hack dan menyebarkan malware spam!</span>
                          </div>
                        )}
                      </div>

                      {/* ACTIVE ACTION DM BOX (InstaTRACE decisions context Day 3) */}
                      {choices && currentNodeId.includes("3_1") ? (
                        <div className="bg-stone-900 border border-pink-500/50 rounded-xl p-3 shadow-xl max-w-full sticky bottom-0 z-10 text-left">
                          <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-pink-400 mb-1.5 uppercase">
                            <Instagram className="w-4 h-4 shrink-0" />
                            <span>Pilih Reaksi DM:</span>
                          </div>
                          
                          <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                            {choices.map((choice, index) => (
                              <button
                                key={index}
                                onClick={() => handleChoiceSelection(choice)}
                                className="w-full text-left p-2.5 bg-black hover:bg-zinc-900 border border-pink-500/20 hover:border-pink-400 rounded-lg text-[9px] leading-snug text-stone-200 hover:text-white transition cursor-pointer"
                              >
                                <span className="text-pink-400 font-bold font-mono text-[8px] block uppercase">Pilihan DM 0{index+1}:</span>
                                <span>{choice.text}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="py-2.5 px-3 bg-stone-900 text-stone-500 rounded-xl text-[9px] uppercase tracking-wider text-center select-none border border-stone-850 font-semibold mt-auto">
                          Pengiriman pesan dibatasi demi keamanan
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ==================== SCREEN 4: DIKNAS PORTAL INFO & PANDUAN ==================== */}
            {activeTab === "sms" && (
              <div className="flex-1 flex flex-col bg-[#111] h-full text-left">
                {diknasScreen === "list" ? (
                  <div className="flex-grow flex flex-col bg-[#111] h-full">
                    {/* Diknas Portal Header */}
                    <div className="bg-[#18181b] px-3.5 py-3 border-b border-stone-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => { gameAudio.playSfx("click"); setActiveTab("desktop"); }}
                          className="text-sky-500 flex items-center cursor-pointer font-bold mr-1"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-bold text-stone-200 font-mono tracking-wide">
                          Diknas Portal Info
                        </span>
                      </div>
                      <Bell className="w-4 h-4 text-stone-400" />
                    </div>

                    {/* App items list */}
                    <div className="flex-1 overflow-y-auto bg-black p-3.5 space-y-3_5">
                      {/* SMS Inbox Card */}
                      <div 
                        onClick={() => { gameAudio.playSfx("click"); setDiknasScreen("inbox"); }}
                        className="flex items-center justify-between p-3.5 bg-zinc-900/60 hover:bg-zinc-900 border border-stone-850 hover:border-sky-500/30 rounded-xl cursor-pointer transition select-none"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-550 flex items-center justify-center text-white shadow shadow-sky-500/20">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-bold text-stone-200">Kotak SMS Beasiswa (Inbox)</span>
                            <span className="text-[9px] text-zinc-400">Verifikasi formal & evaluasi kelayakan beasiswa</span>
                          </div>
                        </div>
                        {((choices && (currentNodeId.includes("day3_event2"))) || isDay3) && (
                          <div className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
                        )}
                      </div>

                      {/* Guide Card */}
                      <div 
                        onClick={() => { gameAudio.playSfx("click"); setDiknasScreen("guide"); }}
                        className="flex items-center justify-between p-3.5 bg-zinc-900/60 hover:bg-zinc-900 border border-stone-850 hover:border-sky-500/30 rounded-xl cursor-pointer transition select-none"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow shadow-teal-500/20">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-bold text-stone-200">Panduan Keamanan Digital</span>
                            <span className="text-[9px] text-zinc-400">Pencegahan rekayasa sosial & kebocoran data</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : diknasScreen === "inbox" ? (
                  <div className="flex-grow flex flex-col bg-[#111] h-full">
                    {/* SMS Header */}
                    <div className="bg-[#18181b] px-3.5 py-3 border-b border-stone-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => { gameAudio.playSfx("click"); setDiknasScreen("list"); }}
                          className="text-sky-500 flex items-center cursor-pointer font-bold mr-1"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-bold text-stone-250 font-mono tracking-wide">
                          Kotak SMS Beasiswa
                        </span>
                      </div>
                      <Bell className="w-4 h-4 text-stone-400" />
                    </div>

                    {/* Inbox feed messages list */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-3.5 bg-[#0a0a0c] flex flex-col justify-between">
                      <div id="sms_log_scroll" className="space-y-3.5 overflow-y-auto max-h-[300px]">
                        {/* Official check-in SMS */}
                        <div className="bg-stone-900/60 border border-stone-850 p-2.5 rounded-lg text-left">
                          <span className="text-[8.5px] font-bold text-sky-400 block font-mono">PENGIRIM: INDODIKNAS-INFO</span>
                          <p className="text-zinc-300 text-[9.5px] mt-1 leading-relaxed">
                            Evaluasi kelayakan siswa sasaran SMAN TRACE tahap awal sedang berjalan. Mohon pastikan rekam jejak publik digital Anda bersikap kooperatif dan bijak.
                          </p>
                          <span className="text-[7.5px] text-zinc-500 block text-right mt-1">Kemarin, 09:12 WIB</span>
                        </div>

                        {/* Day 3 suspicious phishing alert SMS */}
                        {isDay3 && (
                          <div className="bg-stone-900/60 border border-red-500/20 p-2.5 rounded-lg text-left">
                            <span className="text-[8.5px] font-bold text-red-400 block font-mono">PENGIRIM: INDODIKNAS-ALERT (Phishing)</span>
                            <p className="text-zinc-300 text-[9.5px] mt-1 leading-relaxed font-semibold">
                              ⚠️ VERIFIKASI DARURAT AKADEMIK! Harap segera laporkan data KK, NIK, dan nama Ibu Kandung Anda untuk pencocokan program subsidi beasiswa gratis ke situs: <span className="text-indigo-400 underline animate-pulse">diknas-portal-beasiswaku.com</span> atau balas langsung SMS ini untuk mengamankan hak uang sekolah!
                            </p>
                            <span className="text-[7.5px] text-zinc-500 block text-right mt-1">Hari ini, 15:40 WIB</span>
                          </div>
                        )}

                        {/* If choice chosen, show log */}
                        {(chosenDecisionIds?.includes("day3_refuse_data") || currentNodeId.startsWith("day3_refuse_data")) && (
                          <div className="bg-emerald-950/20 border border-emerald-500/30 p-2 rounded-lg text-[9px] text-[#10b981] text-left">
                            <span className="font-bold uppercase tracking-wider block text-[8px]">TINDAKAN KAMU:</span>
                            Mengabaikan desakan phishing & melaporkan nomor penipuan ke tim cyber kementerian pendidikan.
                          </div>
                        )}

                        {(chosenDecisionIds?.includes("day3_send_data") || currentNodeId.startsWith("day3_send_data")) && (
                          <div className="bg-red-950/20 border border-red-500/30 p-2 rounded-lg text-[9px] text-red-400 text-left">
                            <span className="font-bold uppercase tracking-wider block text-[8px]">TINDAKAN KAMU:</span>
                            Mengirimkan data sensitif KK, NIK dan Nama Ibu Kandung ke SMS / Link palsu.
                          </div>
                        )}
                      </div>

                      {/* ACTIVE ACTION DECISION BOX (Diknas SMS decisions context Day 3 Event 2) */}
                      {choices && currentNodeId.includes("day3_event2") ? (
                        <div className="bg-[#1e293b] border border-sky-500/50 rounded-xl p-3 shadow-xl max-w-full sticky bottom-0 z-10 text-left">
                          <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-sky-400 mb-1.5 uppercase">
                            <ShieldAlert className="w-4 h-4 shrink-0" />
                            <span>Pilih Balasan SMS:</span>
                          </div>
                          
                          <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                            {choices.map((choice, index) => (
                              <button
                                key={index}
                                onClick={() => handleChoiceSelection(choice)}
                                className="w-full text-left p-2.5 bg-black hover:bg-zinc-900 border border-sky-500/20 hover:border-sky-400 rounded-lg text-[9px] leading-snug text-stone-200 hover:text-white transition cursor-pointer"
                              >
                                <span className="text-sky-400 font-bold font-mono text-[8px] block uppercase">SMS Respons 0{index+1}:</span>
                                <span>{choice.text}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="py-2.5 px-3 bg-[#1e293b]/50 text-zinc-500 rounded-xl text-[9px] uppercase tracking-wider text-center select-none border border-stone-850 font-semibold mt-auto">
                          Portal SMS ditutup kecuali saat verifikasi resmi
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-grow flex flex-col bg-[#111] h-full">
                    {/* SMS Guide Header */}
                    <div className="bg-[#18181b] px-3.5 py-3 border-b border-stone-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => { gameAudio.playSfx("click"); setDiknasScreen("list"); }}
                          className="text-sky-500 flex items-center cursor-pointer font-bold mr-1"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-bold text-stone-200 font-mono tracking-wide">
                          Panduan Portal Beasiswa
                        </span>
                      </div>
                      <Bell className="w-4 h-4 text-stone-400" />
                    </div>

                    {/* Educational bullet content */}
                    <div className="flex-1 p-4 overflow-y-auto bg-black text-left space-y-3.5">
                      <div className="p-3 bg-indigo-950/20 border border-indigo-500/30 rounded-xl">
                        <span className="text-[10px] font-bold text-[#22d3ee] block uppercase font-mono mb-1">🛡️ PRINSIP PERLINDUNGAN UTAMA</span>
                        <p className="text-[9.5px] text-stone-300 leading-relaxed font-sans">
                          Sistem Portal Beasiswa Kementerian Pendidikan (Diknas) tidak pernah meminta atau mendelegasikan instruktur untuk menanyakan hal-hal berikut melalui saluran pribadi:
                        </p>
                      </div>

                      <div className="space-y-2.5 pl-1">
                        <div className="flex gap-2 text-[9.5px]">
                          <span className="text-[#f43f5e] font-bold">1.</span>
                          <span className="text-stone-300 font-medium leading-normal">
                            **Kode Rahasia OTP**: Jangan pernah mendiktekan atau mengisi OTP ke halaman eksternal.
                          </span>
                        </div>
                        <div className="flex gap-2 text-[9.5px]">
                          <span className="text-[#f43f5e] font-bold">2.</span>
                          <span className="text-stone-300 font-medium leading-normal">
                            **Identitas Sensitif**: Data NIK, KK, dan Nama Ibu Kandung bersifat privat dan rawan disalahgunakan dalam pinjaman online fiktif.
                          </span>
                        </div>
                        <div className="flex gap-2 text-[9.5px]">
                          <span className="text-[#f43f5e] font-bold">3.</span>
                          <span className="text-stone-300 font-medium leading-normal">
                            **Link Tidak Resmi**: Alamat resmi kementerian selalu berakhiran **.go.id** atau **.ac.id**, bukan **.net**, **.com-beasiswaku**, atau **.blogspot.com**.
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-zinc-900 border border-stone-850 rounded-lg text-center mt-3 select-none">
                        <span className="text-[8.5px] font-mono font-bold text-stone-400 uppercase tracking-widest">
                          SISTEM PATUHAN DIGITAL PTN-PTS // KAMPUS SEHAT
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Swipe indicator bar at screen bottom hardware layer */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full z-10" />

        </div>

        {/* Physical Home Circle bezel button at hardware bottom */}
        <div 
          onClick={() => { 
            gameAudio.playSfx("click"); 
            setActiveTab("desktop"); 
            setWaScreen("list"); 
            setInstaScreen("list");
            setDiknasScreen("list");
          }}
          className="w-11 h-11 border border-zinc-700/60 rounded-full mx-auto flex items-center justify-center hover:bg-zinc-850 bg-zinc-900 shadow-md cursor-pointer transition py-1"
        >
          <div className="w-3.5 h-3.5 rounded-xs bg-zinc-550 border border-zinc-650" />
        </div>

        {/* Brand footer details */}
        <div className="text-center text-[9px] font-mono tracking-wider text-stone-500 uppercase select-none">
          Alya's Phone // SMAN TRACE v2.0
        </div>
      </div>
    </div>
  );
}

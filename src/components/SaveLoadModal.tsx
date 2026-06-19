/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { X, Save, FolderOpen, Calendar, HelpCircle, Activity } from "lucide-react";
import { SaveSlot } from "../types";
import { gameAudio } from "./AudioEngine";

interface SaveLoadModalProps {
  mode: "save" | "load";
  currentNodeId: string;
  currentReputation: number;
  currentSecurity: number;
  currentTrust: number;
  currentMental: number;
  currentSummaryText: string;
  unlockedAchievements: string[];
  chosenDecisionIds: string[];
  onClose: () => void;
  onLoadSlot: (
    nodeId: string,
    reputation: number,
    security: number,
    trust: number,
    mental: number,
    unlocked: string[],
    chosenDecisionIds?: string[]
  ) => void;
}

export default function SaveLoadModal({
  mode,
  currentNodeId,
  currentReputation,
  currentSecurity,
  currentTrust,
  currentMental,
  currentSummaryText,
  unlockedAchievements,
  chosenDecisionIds,
  onClose,
  onLoadSlot
}: SaveLoadModalProps) {
  const [slots, setSlots] = useState<SaveSlot[]>([]);

  // Load slots from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("trace_vn_slots");
    if (saved) {
      try {
        setSlots(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse save slots", e);
      }
    } else {
      // Initialize 6 empty slots
      const initialSlots: SaveSlot[] = Array.from({ length: 6 }, (_, idx) => ({
        id: idx + 1,
        dateTime: "",
        nodeId: "",
        reputation: 60,
        security: 80,
        trust: 60,
        mental: 60,
        summaryText: "KOSONG / SLOT KOSONG",
        activeAchievements: [],
        chosenDecisionIds: []
      }));
      setSlots(initialSlots);
      localStorage.setItem("trace_vn_slots", JSON.stringify(initialSlots));
    }
  }, []);

  const handleSlotAction = (slotId: number) => {
    gameAudio.playSfx("click");
    
    if (mode === "save") {
      const now = new Date();
      const updatedSlots = slots.map(slot => {
        if (slot.id === slotId) {
          return {
            id: slotId,
            dateTime: now.toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" }),
            nodeId: currentNodeId,
            reputation: currentReputation,
            security: currentSecurity,
            trust: currentTrust,
            mental: currentMental,
            summaryText: currentSummaryText.length > 55 ? currentSummaryText.substring(0, 55) + "..." : currentSummaryText,
            activeAchievements: unlockedAchievements,
            chosenDecisionIds: chosenDecisionIds
          };
        }
        return slot;
      });
      setSlots(updatedSlots);
      localStorage.setItem("trace_vn_slots", JSON.stringify(updatedSlots));
      gameAudio.playSfx("beep");
    } else {
      const selectedSlot = slots.find(s => s.id === slotId);
      if (selectedSlot && selectedSlot.nodeId) {
        onLoadSlot(
          selectedSlot.nodeId, 
          selectedSlot.reputation ?? 60, 
          selectedSlot.security ?? 80, 
          selectedSlot.trust ?? 60, 
          selectedSlot.mental ?? 60, 
          selectedSlot.activeAchievements ?? [],
          selectedSlot.chosenDecisionIds ?? []
        );
        gameAudio.playSfx("steiner"); // trace transition beep
        onClose();
      } else {
        gameAudio.playSfx("fail");
      }
    }
  };

  const handleClearSlot = (e: React.MouseEvent, slotId: number) => {
    e.stopPropagation();
    gameAudio.playSfx("click");
    const updatedSlots = slots.map(slot => {
      if (slot.id === slotId) {
        return {
          id: slotId,
          dateTime: "",
          nodeId: "",
          reputation: 60,
          security: 80,
          trust: 60,
          mental: 60,
          summaryText: "KOSONG / SLOT KOSONG",
          activeAchievements: []
        };
      }
      return slot;
    });
    setSlots(updatedSlots);
    localStorage.setItem("trace_vn_slots", JSON.stringify(updatedSlots));
  };

  const titleText = mode === "save" ? "SIMPAN PROGRESS (SAVE REALITAS)" : "PILIH SEJARAH (LOAD REALITAS)";

  return (
    <div 
      id="save_load_modal_overlay"
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div 
        id="save_load_modal_container"
        className="w-full max-w-2xl bg-[#0a0a0c] border border-indigo-500/30 rounded-sm overflow-hidden shadow-[0_0_35px_rgba(99,102,241,0.15)] flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center bg-black px-6 py-4 border-b border-indigo-500/20 font-mono">
          <div className="flex items-center gap-2 text-indigo-400">
            {mode === "save" ? <Save className="w-5 h-5 animate-pulse" /> : <FolderOpen className="w-5 h-5" />}
            <span className="text-sm font-bold tracking-wider">{titleText}</span>
          </div>
          <button 
            onClick={() => { gameAudio.playSfx("click"); onClose(); }} 
            className="text-stone-400 hover:text-indigo-400 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-[#0a0a0c] via-black to-[#050508]">
          <p className="text-[10px] font-mono text-indigo-400/75 uppercase tracking-widest pl-1">
            {mode === "save" 
              ? "PILIH SLOT MEMORI UNTUK MENYIMPAN REKAM JEJAK DIGITAL SAAT INI:" 
              : "MELAKUKAN LOMPATAN WAKTU UNTUK MEMPERBAIKI KEPUTUSAN SOSIAL MEDIA:"
            }
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slots.map(slot => {
              const isEmpty = !slot.nodeId;
              return (
                <div
                  key={slot.id}
                  onClick={() => handleSlotAction(slot.id)}
                  className={`group relative p-4 rounded-sm border text-left transition duration-200 cursor-pointer ${
                    isEmpty
                      ? "border-neutral-900 bg-black/40 hover:border-indigo-500/10"
                      : "border-indigo-500/20 bg-black hover:border-indigo-400 hover:bg-black/90 shadow-[0_0_10px_rgba(99,102,241,0.02)]"
                  }`}
                >
                  {/* Slot Number Label */}
                  <span className="absolute top-2 right-3 text-[10px] font-mono font-bold text-stone-600 group-hover:text-indigo-400">
                    SLOT 0{slot.id}
                  </span>

                  <div className="flex flex-col h-full justify-between gap-3">
                    <div>
                      {/* Stats brief overview if not empty */}
                      {!isEmpty && (
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-2.5 p-1.5 bg-neutral-950/60 rounded border border-stone-800 text-[9px] font-mono text-stone-300">
                          <span className="text-amber-400">🏆 Rep: {slot.reputation}%</span>
                          <span className="text-emerald-400">🛡️ Sec: {slot.security}%</span>
                          <span className="text-indigo-400">🤝 Trust: {slot.trust}%</span>
                          <span className="text-rose-400">❤️ Mental: {slot.mental}%</span>
                        </div>
                      )}

                      {/* Text Preview Description */}
                      <p className={`text-xs font-sans font-medium line-clamp-2 ${
                        isEmpty ? "text-stone-700 italic uppercase font-mono text-[10px]" : "text-stone-300 group-hover:text-stone-100"
                      }`}>
                        {slot.summaryText}
                      </p>
                    </div>

                    {/* Metadata indicators */}
                    <div className="flex justify-between items-center text-[10px] font-mono text-stone-500 pt-2 border-t border-stone-900">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500/40" />
                        {slot.dateTime || "KOSONG"}
                      </span>
                      
                      {!isEmpty && (
                        <button
                          onClick={(e) => handleClearSlot(e, slot.id)}
                          className="px-2 py-0.5 bg-black hover:bg-red-950 text-red-500 hover:text-red-400 rounded-sm border border-red-950 hover:border-red-600 transition text-[9px]"
                        >
                          RESET
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Info Footer */}
        <div className="bg-black px-6 py-3 border-t border-indigo-500/10 text-center font-mono text-[9px] text-stone-500">
          DATA DIENKRIPSI DAN DISIMPAN DALAM PERSISTENSI KELAS BROWSER TRACE-OS.
        </div>
      </div>
    </div>
  );
}

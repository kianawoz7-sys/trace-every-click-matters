/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import {
  Star, Skull, Zap, BookOpen,
  RotateCcw, Home, Trophy, TrendingUp, TrendingDown,
  ShieldCheck, Users, Heart, Award, Sparkles, AlertTriangle
} from "lucide-react";

import { EndingMeta } from "../types";
import { gameAudio } from "./AudioEngine";

interface EndingScreenProps {
  endingMeta: EndingMeta;
  reputation: number;
  security: number;
  trust: number;
  mental: number;
  chosenDecisionIds: string[];
  onExitToMenu: () => void;
  onRestart: () => void;
}

// ─── Color Themes (per ending accent) ────────────────────────────────────────
interface ColorDef {
  outerGlow: string;
  cardBg: string;
  cardBorder: string;
  headerText: string;
  iconRing: string;
  iconGlow: string;
  divider: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  primaryBtn: string;
  starFilled: string;
}

const COLOR_MAP: Record<string, ColorDef> = {
  indigo: {
    outerGlow:    "shadow-[0_0_120px_rgba(99,102,241,0.25)]",
    cardBg:       "bg-gradient-to-b from-[#0d0c1e] via-[#09090f] to-black",
    cardBorder:   "border-indigo-500/50",
    headerText:   "text-indigo-300",
    iconRing:     "border-indigo-500/70 bg-indigo-950/60",
    iconGlow:     "shadow-[0_0_40px_rgba(99,102,241,0.5)]",
    divider:      "via-indigo-500/30",
    badgeBg:      "bg-indigo-950/80",
    badgeBorder:  "border-indigo-500/50",
    badgeText:    "text-indigo-300",
    primaryBtn:   "bg-indigo-600 hover:bg-indigo-500 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.5)]",
    starFilled:   "text-indigo-400",
  },
  amber: {
    outerGlow:    "shadow-[0_0_120px_rgba(245,158,11,0.2)]",
    cardBg:       "bg-gradient-to-b from-[#1a1200] via-[#0d0900] to-black",
    cardBorder:   "border-amber-500/50",
    headerText:   "text-amber-300",
    iconRing:     "border-amber-500/70 bg-amber-950/60",
    iconGlow:     "shadow-[0_0_40px_rgba(245,158,11,0.5)]",
    divider:      "via-amber-500/30",
    badgeBg:      "bg-amber-950/80",
    badgeBorder:  "border-amber-500/50",
    badgeText:    "text-amber-300",
    primaryBtn:   "bg-amber-600 hover:bg-amber-500 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)]",
    starFilled:   "text-amber-400",
  },
  red: {
    outerGlow:    "shadow-[0_0_120px_rgba(239,68,68,0.2)]",
    cardBg:       "bg-gradient-to-b from-[#180808] via-[#0d0404] to-black",
    cardBorder:   "border-red-500/50",
    headerText:   "text-red-300",
    iconRing:     "border-red-500/70 bg-red-950/60",
    iconGlow:     "shadow-[0_0_40px_rgba(239,68,68,0.5)]",
    divider:      "via-red-500/30",
    badgeBg:      "bg-red-950/80",
    badgeBorder:  "border-red-500/50",
    badgeText:    "text-red-300",
    primaryBtn:   "bg-red-700 hover:bg-red-600 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5)]",
    starFilled:   "text-red-400",
  },
  orange: {
    outerGlow:    "shadow-[0_0_120px_rgba(249,115,22,0.2)]",
    cardBg:       "bg-gradient-to-b from-[#180e04] via-[#0d0804] to-black",
    cardBorder:   "border-orange-500/50",
    headerText:   "text-orange-300",
    iconRing:     "border-orange-500/70 bg-orange-950/60",
    iconGlow:     "shadow-[0_0_40px_rgba(249,115,22,0.5)]",
    divider:      "via-orange-500/30",
    badgeBg:      "bg-orange-950/80",
    badgeBorder:  "border-orange-500/50",
    badgeText:    "text-orange-300",
    primaryBtn:   "bg-orange-700 hover:bg-orange-600 border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.5)]",
    starFilled:   "text-orange-400",
  },
  emerald: {
    outerGlow:    "shadow-[0_0_120px_rgba(16,185,129,0.25)]",
    cardBg:       "bg-gradient-to-b from-[#041810] via-[#040d09] to-black",
    cardBorder:   "border-emerald-500/50",
    headerText:   "text-emerald-300",
    iconRing:     "border-emerald-500/70 bg-emerald-950/60",
    iconGlow:     "shadow-[0_0_40px_rgba(16,185,129,0.5)]",
    divider:      "via-emerald-500/30",
    badgeBg:      "bg-emerald-950/80",
    badgeBorder:  "border-emerald-500/50",
    badgeText:    "text-emerald-300",
    primaryBtn:   "bg-emerald-700 hover:bg-emerald-600 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]",
    starFilled:   "text-emerald-400",
  },
};

// ─── Icon Map ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Star, Skull, Zap, BookOpen, Trophy, Award, ShieldCheck,
};

// ─── Star Rating ─────────────────────────────────────────────────────────────
function StarRating({ score, filledClass }: { score: number; filledClass: string }) {
  // score 0–100 → 0–5 stars
  const stars = Math.round((score / 100) * 5);
  return (
    <div className="flex items-center gap-0.5" aria-label={`${stars} dari 5 bintang`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 transition-all duration-300 ${
            i < stars
              ? `${filledClass} fill-current drop-shadow-[0_0_4px_currentColor]`
              : "text-stone-700"
          }`}
        />
      ))}
    </div>
  );
}

// ─── Animated Stat Bar ───────────────────────────────────────────────────────
interface StatRowProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  barFrom: string;
  barTo: string;
  valColor: string;
  delay: number;
}

function StatRow({ label, value, icon, barFrom, barTo, valColor, delay }: StatRowProps) {
  const [width, setWidth] = useState(0);
  const [countVal, setCountVal] = useState(0);

  useEffect(() => {
    // Animate bar
    const t1 = setTimeout(() => setWidth(value), delay);
    // Animate number counter
    let frame = 0;
    const totalFrames = 40;
    const t2 = setTimeout(() => {
      const interval = setInterval(() => {
        frame++;
        setCountVal(Math.round((value * frame) / totalFrames));
        if (frame >= totalFrames) clearInterval(interval);
      }, 18);
      return () => clearInterval(interval);
    }, delay);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [value, delay]);

  const clampedVal = Math.max(0, Math.min(100, value));

  // Performance label
  const perfLabel =
    clampedVal >= 75 ? { text: "SANGAT BAIK", cls: "text-emerald-400 border-emerald-500/40 bg-emerald-950/60" } :
    clampedVal >= 55 ? { text: "BAIK",        cls: "text-sky-400    border-sky-500/40    bg-sky-950/60"       } :
    clampedVal >= 35 ? { text: "SEDANG",      cls: "text-amber-400  border-amber-500/40  bg-amber-950/60"     } :
                       { text: "KRITIS",      cls: "text-red-400    border-red-500/40    bg-red-950/60"       };

  return (
    <div className="group flex flex-col gap-1.5">
      {/* Label row */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[10.5px] font-mono uppercase tracking-widest text-stone-400">
          {icon}
          {label}
        </span>
        <div className="flex items-center gap-2">
          <span className={`hidden sm:inline-flex px-1.5 py-0.5 rounded border text-[8.5px] font-mono font-bold tracking-widest ${perfLabel.cls}`}>
            {perfLabel.text}
          </span>
          <span className={`text-base font-mono font-bold tabular-nums ${valColor}`}>
            {countVal}
            <span className="text-stone-600 text-[10px] font-normal">/100</span>
          </span>
        </div>
      </div>
      {/* Bar */}
      <div className="relative h-2 bg-stone-900/80 rounded-full overflow-hidden border border-stone-800/80">
        {/* Track shimmer */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)]" />
        <div
          className={`h-full rounded-full bg-gradient-to-r ${barFrom} ${barTo} transition-all duration-[1100ms] ease-out relative`}
          style={{ width: `${width}%` }}
        >
          {/* Leading edge glow dot */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/70 blur-[1px]" />
        </div>
      </div>
    </div>
  );
}

// ─── Performance Summary Card ─────────────────────────────────────────────────
function PerformanceSummary({
  reputation, security, trust, mental, colorDef,
}: {
  reputation: number; security: number; trust: number; mental: number;
  colorDef: ColorDef;
}) {
  const overall = Math.round((reputation + security + trust + mental) / 4);
  const grade =
    overall >= 80 ? "S" : overall >= 65 ? "A" :
    overall >= 50 ? "B" : overall >= 35 ? "C" : "D";
  const gradeConfig: Record<string, { color: string; label: string; desc: string }> = {
    S: { color: "text-yellow-300", label: "SEMPURNA",      desc: "Pemain digital teladan!" },
    A: { color: "text-emerald-400",label: "SANGAT BAGUS",  desc: "Rekam jejak digital bersih." },
    B: { color: "text-cyan-400",   label: "CUKUP BAIK",    desc: "Masih ada ruang perbaikan." },
    C: { color: "text-amber-400",  label: "PERLU BELAJAR", desc: "Banyak keputusan berisiko." },
    D: { color: "text-red-400",    label: "BERBAHAYA",     desc: "Jejak digital sangat buruk." },
  };
  const gc = gradeConfig[grade];

  return (
    <div className="flex items-center gap-4 p-3.5 bg-black/40 border border-stone-800/80 rounded-sm">
      {/* Grade circle */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className={`w-14 h-14 rounded-full border-2 ${colorDef.cardBorder} bg-black/60 flex items-center justify-center`}>
          <span className={`text-3xl font-bold font-mono ${gc.color}`}>{grade}</span>
        </div>
        <span className="text-[8px] font-mono text-stone-600 mt-1 uppercase tracking-widest">GRADE</span>
      </div>

      {/* Summary text */}
      <div className="flex-1 min-w-0">
        <p className={`text-[10px] font-mono font-bold uppercase tracking-widest ${gc.color} mb-0.5`}>
          {gc.label}
        </p>
        <p className="text-stone-400 text-[11px] font-sans leading-relaxed">{gc.desc}</p>
        {/* Mini radar of 4 scores */}
        <div className="mt-2 grid grid-cols-4 gap-1">
          {[
            { abbr: "REP", val: reputation, color: "text-amber-400" },
            { abbr: "SEC", val: security,   color: "text-emerald-400" },
            { abbr: "TRS", val: trust,      color: "text-sky-400" },
            { abbr: "MNT", val: mental,     color: "text-rose-400" },
          ].map(({ abbr, val, color }) => (
            <div key={abbr} className="flex flex-col items-center gap-0.5">
              <span className={`text-[11px] font-mono font-bold ${color}`}>{val}</span>
              <span className="text-[8px] font-mono text-stone-600 uppercase">{abbr}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function EndingScreen({
  endingMeta, reputation, security, trust, mental, chosenDecisionIds, onExitToMenu, onRestart,
}: EndingScreenProps) {
  const [visible, setVisible] = useState(false);
  const [particleCount] = useState(() => Array.from({ length: 12 }, (_, i) => i));

  const color    = COLOR_MAP[endingMeta.colorAccent] ?? COLOR_MAP["indigo"];
  const IconComp = ICON_MAP[endingMeta.icon] ?? Star;
  const overall  = Math.round((reputation + security + trust + mental) / 4);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    gameAudio.playBgm(endingMeta.isGoodEnding ? "ambient" : "sad");
    return () => clearTimeout(t);
  }, [endingMeta.isGoodEnding]);

  const handleExitToMenu = () => {
    gameAudio.playSfx("click");
    gameAudio.stopBgm();
    onExitToMenu();
  };
  const handleRestart = () => {
    gameAudio.playSfx("click");
    gameAudio.stopBgm();
    onRestart();
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-lg
        transition-opacity duration-700 overflow-y-auto py-6
        ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {/* ── Floating particles (good endings only) ── */}
      {endingMeta.isGoodEnding && particleCount.map((i) => (
        <div
          key={i}
          className={`absolute w-0.5 h-0.5 rounded-full opacity-0 ${color.starFilled.replace("text-", "bg-")}`}
          style={{
            left: `${10 + (i * 7.5)}%`,
            top: `${15 + ((i * 31) % 70)}%`,
            animation: `floatUp ${2.5 + (i % 3) * 0.8}s ease-out ${i * 0.15}s infinite`,
          }}
        />
      ))}

      {/* ── Main card ── */}
      <div
        className={`relative w-full max-w-xl mx-4 ${color.cardBg} border ${color.cardBorder} rounded-lg
          flex flex-col gap-0 ${color.outerGlow}
          transition-all duration-700 ${visible ? "translate-y-0 scale-100" : "translate-y-10 scale-95"}`}
      >
        {/* Scanline top edge */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        {/* Scanline bottom edge */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ══ SECTION 1: BADGE + ICON + TITLE ══════════════════════════════ */}
        <div className="flex flex-col items-center gap-4 px-6 sm:px-8 pt-8 pb-6 text-center">

          {/* Status badge */}
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border
            ${color.badgeBg} ${color.badgeBorder} ${color.badgeText}
            text-[9px] font-mono font-bold uppercase tracking-[0.2em]`}
          >
            {endingMeta.isGoodEnding
              ? <><Trophy className="w-3 h-3" /> ENDING TERBAIK</>
              : <><AlertTriangle className="w-3 h-3" /> GAME OVER</>
            }
          </div>

          {/* Big icon ring */}
          <div className="relative">
            {/* Outer pulse ring */}
            {endingMeta.isGoodEnding && (
              <div className={`absolute inset-0 rounded-full border ${color.cardBorder} scale-125 animate-ping opacity-20`} />
            )}
            <div className={`w-24 h-24 rounded-full border-2 ${color.iconRing} flex items-center justify-center ${color.iconGlow}`}>
              <IconComp className={`w-12 h-12 ${color.headerText}`} />
            </div>
          </div>

          {/* Ending title */}
          <div className="flex flex-col items-center gap-2">
            <h1
              className={`text-2xl sm:text-[28px] font-bold font-mono tracking-tight ${color.headerText} leading-tight`}
              style={{ textShadow: "0 0 30px currentColor, 0 0 60px currentColor" }}
            >
              {endingMeta.title}
            </h1>

            {/* Star rating based on overall score */}
            <StarRating score={overall} filledClass={color.starFilled} />

            {/* Subtitle / ending description */}
            <blockquote className="mt-1 px-4 py-3 bg-black/30 border-l-2 border-stone-700 rounded-r-sm text-left max-w-sm">
              <p className="text-stone-300 text-[12px] sm:text-[13px] font-sans leading-relaxed italic">
                "{endingMeta.subtitle}"
              </p>
            </blockquote>
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px mx-6 sm:mx-8 bg-gradient-to-r from-transparent ${color.divider} to-transparent`} />

        {/* ══ SECTION 2: STAT BARS ═════════════════════════════════════════ */}
        <div className="px-6 sm:px-8 py-5 flex flex-col gap-1">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 text-[9.5px] font-mono text-stone-500 uppercase tracking-[0.2em]">
              <Sparkles className="w-3 h-3 text-stone-600" />
              Rekap Jejak Digital
            </span>
            <span className="text-[9px] font-mono text-stone-600 uppercase tracking-wider">Semester Akhir</span>
          </div>

          <div className="flex flex-col gap-3.5">
            <StatRow
              label="Reputasi"
              value={reputation}
              icon={<Award className="w-3 h-3 text-amber-400" />}
              barFrom="from-amber-600" barTo="to-yellow-400"
              valColor="text-amber-400"
              delay={250}
            />
            <StatRow
              label="Keamanan Akun"
              value={security}
              icon={<ShieldCheck className="w-3 h-3 text-emerald-400" />}
              barFrom="from-emerald-600" barTo="to-green-400"
              valColor="text-emerald-400"
              delay={420}
            />
            <StatRow
              label="Kepercayaan Teman"
              value={trust}
              icon={<Users className="w-3 h-3 text-sky-400" />}
              barFrom="from-sky-600" barTo="to-indigo-400"
              valColor="text-sky-400"
              delay={590}
            />
            <StatRow
              label="Kesehatan Mental"
              value={mental}
              icon={<Heart className="w-3 h-3 text-rose-400" />}
              barFrom="from-rose-600" barTo="to-pink-400"
              valColor="text-rose-400"
              delay={760}
            />
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px mx-6 sm:mx-8 bg-gradient-to-r from-transparent ${color.divider} to-transparent`} />

        {/* ══ SECTION 3: PERFORMANCE SUMMARY CARD ══════════════════════════ */}
        <div className="px-6 sm:px-8 py-4">
          <PerformanceSummary
            reputation={reputation}
            security={security}
            trust={trust}
            mental={mental}
            colorDef={color}
          />
        </div>

        {/* Divider */}
        <div className={`h-px mx-6 sm:mx-8 bg-gradient-to-r from-transparent ${color.divider} to-transparent`} />

        {/* ══ SECTION 3.5: KEPUTUSAN PENTING ══════════════════════════════ */}
        <div className="px-6 sm:px-8 py-4">
          <p className="text-[9.5px] font-mono text-stone-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-1.5">
            <BookOpen className="w-3 h-3 text-stone-600" />
            Keputusan Penting
          </p>
          <ul className="flex flex-col gap-2 font-mono text-[10px] text-stone-300">
            {chosenDecisionIds.includes("day1_factcheck") && <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Fact-check hoaks beasiswa</li>}
            {chosenDecisionIds.includes("day1_spreadhoax") && <li className="flex items-center gap-2"><span className="text-rose-400">✗</span> Menyebarkan hoaks beasiswa</li>}
            {chosenDecisionIds.includes("day2_report_support") && <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Melaporkan bullying & membela Rina</li>}
            {chosenDecisionIds.includes("day3_block_phish") && <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Memblokir akun phisher</li>}
            {chosenDecisionIds.includes("day3_refuse_data") && <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Menolak membagikan data KK & Ibu Kandung</li>}
            {chosenDecisionIds.includes("day3_send_data") && <li className="flex items-center gap-2"><span className="text-rose-400">✗</span> Membagikan data privasi ke penipu</li>}
            {chosenDecisionIds.includes("day5_apologize") && <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Meminta maaf terbuka atas kesalahan</li>}
            {chosenDecisionIds.includes("day5_deflect") && <li className="flex items-center gap-2"><span className="text-rose-400">✗</span> Menyalahkan orang lain saat jejak digital terbongkar</li>}
            {chosenDecisionIds.includes("day5_commit_change") && <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Berkomitmen kepada BK untuk berubah</li>}
            {chosenDecisionIds.includes("day7_study_hard") && <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Fokus belajar & menghindari doomscrolling</li>}
            {chosenDecisionIds.includes("day7_cheat_exam") && <li className="flex items-center gap-2"><span className="text-rose-400">✗</span> Mencontek jawaban ulangan dari internet</li>}
            {chosenDecisionIds.includes("day7_honest_exam") && <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Jujur saat ulangan sekolah</li>}
          </ul>
        </div>

        {/* Divider */}
        <div className={`h-px mx-6 sm:mx-8 bg-gradient-to-r from-transparent ${color.divider} to-transparent`} />

        {/* ══ SECTION 4: ACTION BUTTONS ════════════════════════════════════ */}
        <div className="px-6 sm:px-8 py-5 flex flex-col sm:flex-row gap-3">
          {/* Secondary: Restart */}
          <button
            id="ending_btn_restart"
            onClick={handleRestart}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5
              bg-black/70 hover:bg-stone-900/80
              border border-stone-700 hover:border-stone-500
              rounded-sm text-[11px] font-mono font-bold tracking-wider text-stone-300
              transition-all duration-150 cursor-pointer active:scale-95 group"
          >
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Main Lagi
          </button>

          {/* Primary: Exit to menu */}
          <button
            id="ending_btn_menu"
            onClick={handleExitToMenu}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5
              border rounded-sm text-[11px] font-mono font-bold tracking-wider text-white
              transition-all duration-150 cursor-pointer active:scale-95 group
              ${color.primaryBtn}`}
          >
            <Home className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Kembali ke Menu Utama
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 pb-5 flex items-center justify-between">
          <span className="text-[8.5px] font-mono text-stone-700 uppercase tracking-widest">
            TRACE OS v1.0 — © 2026
          </span>
          <span className="text-[8.5px] font-mono text-stone-700 uppercase tracking-widest">
            EVERY CLICK MATTERS
          </span>
        </div>
      </div>

      {/* ── Particle + float animation keyframes ── */}
      <style>{`
        @keyframes floatUp {
          0%   { opacity: 0;   transform: translateY(0)   scale(1); }
          20%  { opacity: 0.8; }
          100% { opacity: 0;   transform: translateY(-120px) scale(0.3); }
        }
      `}</style>
    </div>
  );
}

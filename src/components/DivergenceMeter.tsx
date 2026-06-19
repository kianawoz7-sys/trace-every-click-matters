/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Award, ShieldCheck, Heart, Users } from "lucide-react";

interface DivergenceMeterProps {
  reputation: number;
  security: number;
  trust: number;
  mental: number;
}

export default function DivergenceMeter({ reputation, security, trust, mental }: DivergenceMeterProps) {
  // Bound values strictly to 0-100 range
  const clamp = (val: number) => Math.max(0, Math.min(100, Math.round(val)));

  const repVal = clamp(reputation);
  const secVal = clamp(security);
  const truVal = clamp(trust);
  const mntVal = clamp(mental);

  return (
    <div 
      id="trace_stats_hub"
      className="flex flex-col sm:flex-row items-stretch gap-3.5 py-2 px-4 bg-black/95 border border-[#00ff41]/20 rounded-md shadow-[0_0_25px_rgba(0,255,65,0.1)] backdrop-blur-md max-w-full overflow-x-auto"
    >
      {/* HUD Header */}
      <div className="flex flex-row sm:flex-col justify-between sm:justify-center items-center gap-1.5 border-b sm:border-b-0 sm:border-r border-[#00ff41]/10 pb-1.5 sm:pb-0 pr-0 sm:pr-3.5">
        <span className="text-[10px] font-bold text-white tracking-widest font-mono uppercase bg-[#00ff41]/10 px-1.5 py-0.5 rounded border border-[#00ff41]/20 animate-pulse">
          TRACE OS
        </span>
        <span className="text-[8px] text-stone-500 font-mono tracking-wider">STATUS MONITOR</span>
      </div>

      {/* Main stat tracks */}
      <div className="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-6 items-center">
        {/* Stat 1: Reputasi */}
        <div className="flex items-center gap-2 font-mono">
          <div className="w-7 h-7 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Award className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center w-24">
              <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider">Reputasi</span>
              <span className="text-[10px] text-amber-400 font-bold">{repVal}%</span>
            </div>
            {/* Simple progress bar */}
            <div className="w-24 h-1.5 bg-neutral-900 rounded-full overflow-hidden mt-0.5 border border-stone-800">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500" 
                style={{ width: `${repVal}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stat 2: Keamanan Akun */}
        <div className="flex items-center gap-2 font-mono">
          <div className="w-7 h-7 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center w-24">
              <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider">Keamanan</span>
              <span className="text-[10px] text-emerald-400 font-bold">{secVal}%</span>
            </div>
            <div className="w-24 h-1.5 bg-neutral-900 rounded-full overflow-hidden mt-0.5 border border-stone-800">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-500" 
                style={{ width: `${secVal}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stat 3: Kepercayaan */}
        <div className="flex items-center gap-2 font-mono">
          <div className="w-7 h-7 rounded bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Users className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center w-24">
              <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider">Kepercayaan</span>
              <span className="text-[10px] text-sky-400 font-bold">{truVal}%</span>
            </div>
            <div className="w-24 h-1.5 bg-neutral-900 rounded-full overflow-hidden mt-0.5 border border-stone-800">
              <div 
                className="h-full bg-gradient-to-r from-sky-500 to-indigo-400 transition-all duration-500" 
                style={{ width: `${truVal}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stat 4: Mental Health */}
        <div className="flex items-center gap-2 font-mono">
          <div className="w-7 h-7 rounded bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Heart className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center w-24">
              <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider">Mental</span>
              <span className="text-[10px] text-rose-400 font-bold">{mntVal}%</span>
            </div>
            <div className="w-24 h-1.5 bg-neutral-900 rounded-full overflow-hidden mt-0.5 border border-stone-800">
              <div 
                className="h-full bg-gradient-to-r from-rose-500 to-pink-400 transition-all duration-500" 
                style={{ width: `${mntVal}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

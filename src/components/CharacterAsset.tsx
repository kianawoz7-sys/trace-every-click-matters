/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface CharacterAssetProps {
  name: "rina" | "fino" | "gurubk" | "alya" | "none";
  expression?: "default" | "smug" | "blush" | "shocked" | "sad" | "laugh" | "serious";
  className?: string;
  side: "left" | "right";
}

export default function CharacterAsset({
  name,
  expression = "default",
  className = "",
  side
}: CharacterAssetProps) {
  if (name === "none") return null;

  // Render Alya: Vibrant high school girl (Navy/indigo hair, glowing cyber pink hair-clip, smart tie)
  const renderAlya = () => {
    const isBlush = expression === "blush";
    const isShocked = expression === "shocked" || expression === "serious";
    const isSad = expression === "sad";
    const isLaugh = expression === "laugh";

    return (
      <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
        <defs>
          <linearGradient id="alyaHair" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="60%" stopColor="#312e81" />
            <stop offset="100%" stopColor="#4338ca" />
          </linearGradient>
          <linearGradient id="alyaUniform" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
          <linearGradient id="skinAlya" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff8f3" />
            <stop offset="100%" stopColor="#fed7aa" />
          </linearGradient>
        </defs>

        {/* Aura */}
        <circle cx="200" cy="220" r="140" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="4,4" className="opacity-20" />

        {/* Back Hair - long beautiful flowing hair */}
        <path d="M 110,220 C 75,280 80,410 90,500 L 310,500 C 320,410 325,280 290,220 Z" fill="url(#alyaHair)" />

        {/* Body SMA Uniform */}
        <path d="M 110,500 L 110,360 L 130,320 L 270,320 L 290,360 L 290,500 Z" fill="url(#alyaUniform)" />
        {/* Grey shoulder collar bands */}
        <path d="M 130,320 L 160,320 L 150,500 L 110,500 Z" fill="#64748b" />
        <path d="M 270,320 L 240,320 L 250,500 L 290,500 Z" fill="#64748b" />

        {/* Collar V */}
        <path d="M 170,320 L 200,380 L 230,320 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M 197,330 L 203,330 L 205,400 L 195,400 Z" fill="#6366f1" /> {/* Indigo Class Tie */}

        {/* Neck - Correct Shorter Length */}
        <path d="M 184,322 L 188,255 L 212,255 L 216,322 Z" fill="url(#skinAlya)" />

        {/* Head Base */}
        <path d="M 145,195 C 145,275 255,275 255,195 C 255,140 145,140 145,195 Z" fill="url(#skinAlya)" />

        {/* Cheek Blush */}
        {isBlush && (
          <g opacity="0.8">
            <ellipse cx="170" cy="222" rx="14" ry="6" fill="#f43f5e" />
            <ellipse cx="230" cy="222" rx="14" ry="6" fill="#f43f5e" />
          </g>
        )}

        {/* Eyes (Deep expressive Indigo/Violet) */}
        <g stroke="#312e81" strokeWidth="2.5" fill="none">
          {isSad ? (
            <>
              <path d="M 165,208 C 170,218 180,218 185,208" strokeWidth="3" strokeLinecap="round" />
              <path d="M 215,208 C 220,218 230,218 235,208" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : isShocked ? (
            <>
              <circle cx="175" cy="204" r="9" fill="#fff" />
              <circle cx="175" cy="204" r="4.5" fill="#4f46e5" />
              <circle cx="225" cy="204" r="9" fill="#fff" />
              <circle cx="225" cy="204" r="4.5" fill="#4f46e5" />
            </>
          ) : (
            <>
              <ellipse cx="175" cy="206" rx="7" ry="9" fill="#4338ca" />
              <circle cx="173" cy="203" r="2" fill="#fff" />
              <ellipse cx="225" cy="206" rx="7" ry="9" fill="#4338ca" />
              <circle cx="223" cy="203" r="2" fill="#fff" />
            </>
          )}
        </g>

        {/* Eyebrows */}
        <path d="M 162,188 Q 175,183 185,188" stroke="#1e1b4b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 238,188 Q 225,183 215,188" stroke="#1e1b4b" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Mouth */}
        <g stroke="#1e1b4b" strokeWidth="2.5" fill="none">
          {isSad ? (
            <path d="M 192,244 Q 200,238 208,244" />
          ) : isLaugh ? (
            <path d="M 188,236 Q 200,258 212,236 Z" fill="#ec4899" stroke="none" />
          ) : (
            <path d="M 192,240 Q 200,244 208,240" />
          )}
        </g>

        {/* Front Hair Overlay */}
        <path d="M 135,160 C 130,90 160,70 200,70 C 240,70 270,90 265,160 C 245,100 155,100 135,160 Z" fill="url(#alyaHair)" />
        {/* Slanted smart bangs */}
        <path d="M 138,150 Q 170,120 190,165 Q 200,165 210,140 Q 235,120 262,150 Z" fill="url(#alyaHair)" />
        {/* Glow Cyber Hairpin */}
        <rect x="235" y="115" width="16" height="5" rx="2.5" fill="#f43f5e" className="animate-pulse" />

        {/* Side Locks */}
        <path d="M 142,160 Q 135,215 132,260 Q 148,215 148,170 Z" fill="url(#alyaHair)" />
        <path d="M 258,160 Q 265,215 268,260 Q 252,215 252,170 Z" fill="url(#alyaHair)" />
      </svg>
    );
  };

  // Render Rina: Indonesian high school girl (high ponytail, sweet appearance, white-grey uniform)
  const renderRina = () => {
    const isBlush = expression === "blush";
    const isShocked = expression === "shocked" || expression === "serious";
    const isSad = expression === "sad";
    const isLaugh = expression === "laugh";

    return (
      <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
        <defs>
          <linearGradient id="rinaHair" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2c1a1a" />
            <stop offset="100%" stopColor="#4a3030" />
          </linearGradient>
          <linearGradient id="rinaUniform" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="rinaBadge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#3730a3" />
          </linearGradient>
          <linearGradient id="skinRina" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff2eb" />
            <stop offset="100%" stopColor="#ffe3d1" />
          </linearGradient>
        </defs>

        {/* Ambient aura */}
        <circle cx="200" cy="220" r="140" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="5,5" className="opacity-25" />

        {/* Back Ponytail hair part - visually fixed to extend correctly */}
        <path d="M 240,105 C 290,110 320,160 290,220 C 275,250 260,210 240,150 Z" fill="url(#rinaHair)" />
        {/* Hair ribbon */}
        <circle cx="240" cy="118" r="12" fill="#f43f5e" className="opacity-95" />

        {/* Back Hair */}
        <path d="M 120,220 C 100,270 105,390 115,480 L 285,480 C 295,390 300,270 280,220 Z" fill="url(#rinaHair)" />

        {/* Body SMA Uniform (White-Grey collar style) - Raised shoulder collar line to shorten neck */}
        <path d="M 110,500 L 110,360 L 130,320 L 270,320 L 290,360 L 290,500 Z" fill="url(#rinaUniform)" />
        <path d="M 130,320 L 160,320 L 155,500 L 110,500 Z" fill="#64748b" />
        <path d="M 270,320 L 240,320 L 245,500 L 290,500 Z" fill="#64748b" />
        <rect x="235" y="370" width="22" height="26" rx="2" fill="url(#rinaBadge)" />
        <circle cx="246" cy="383" r="4" fill="#fbbf24" />

        {/* Shirt Collar V-neck */}
        <path d="M 170,320 L 200,385 L 230,320 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M 197,335 L 203,335 L 207,410 L 193,410 Z" fill="#475569" />

        {/* Neck - Correct Shorter Length */}
        <path d="M 183,322 L 187,255 L 213,255 L 217,322 Z" fill="url(#skinRina)" />

        {/* Head Base */}
        <path d="M 145,195 C 145,275 255,275 255,195 C 255,140 145,140 145,195 Z" fill="url(#skinRina)" />

        {/* Cheek Blush */}
        {isBlush && (
          <g opacity="0.8">
            <ellipse cx="170" cy="222" rx="14" ry="6" fill="#f43f5e" />
            <ellipse cx="230" cy="222" rx="14" ry="6" fill="#f43f5e" />
          </g>
        )}

        {/* Eyes */}
        <g stroke="#1e293b" strokeWidth="2.5" fill="none">
          {isSad ? (
            <>
              <path d="M 165,208 C 170,218 180,218 185,208" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 215,208 C 220,218 230,218 235,208" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="175" cy="221" r="4" fill="#38bdf8" stroke="none" className="animate-pulse" />
              <circle cx="225" cy="221" r="4" fill="#38bdf8" stroke="none" className="animate-pulse" />
            </>
          ) : isShocked ? (
            <>
              <circle cx="175" cy="204" r="9" fill="#fff" />
              <circle cx="175" cy="204" r="4.5" fill="#78350f" />
              <circle cx="225" cy="204" r="9" fill="#fff" />
              <circle cx="225" cy="204" r="4.5" fill="#78350f" />
            </>
          ) : (
            <>
              <ellipse cx="175" cy="206" rx="7" ry="9" fill="#543636" />
              <circle cx="173" cy="203" r="2.5" fill="#fff" />
              <ellipse cx="225" cy="206" rx="7" ry="9" fill="#543636" />
              <circle cx="223" cy="203" r="2.5" fill="#fff" />
            </>
          )}
        </g>

        {/* Eyebrows */}
        <g stroke="#2d1a1a" strokeWidth="2" fill="none" strokeLinecap="round">
          {isSad ? (
            <>
              <path d="M 162,192 Q 175,198 185,190" />
              <path d="M 238,192 Q 225,198 215,190" />
            </>
          ) : (
            <>
              <path d="M 162,188 Q 175,184 185,188" />
              <path d="M 238,188 Q 225,184 215,188" />
            </>
          )}
        </g>

        {/* Mouth */}
        <g stroke="#450a0a" strokeWidth="2.5" fill="none">
          {isSad ? (
            <path d="M 190,248 Q 200,241 210,248" />
          ) : isBlush ? (
            <path d="M 192,242 Q 200,246 208,242" />
          ) : isLaugh ? (
            <path d="M 188,236 Q 200,258 212,236 Z" fill="#f43f5e" stroke="none" />
          ) : (
            <path d="M 190,240 Q 200,236 210,240" />
          )}
        </g>

        {/* Hair Front Side Bangs */}
        <path d="M 135,155 C 130,85 160,70 200,70 C 240,70 270,85 265,155 C 245,100 155,100 135,155 Z" fill="url(#rinaHair)" />
        <path d="M 135,145 Q 170,115 192,160 Q 200,160 210,140 Q 235,115 265,145 Q 255,180 248,187 Q 235,165 215,155 Q 185,165 152,187 Q 145,180 135,145 Z" fill="url(#rinaHair)" />
        {/* Beautiful side-locks properly proportioned */}
        <path d="M 142,155 Q 135,220 131,270 Q 148,220 148,165 Z" fill="url(#rinaHair)" />
        <path d="M 258,155 Q 265,220 269,270 Q 252,220 252,165 Z" fill="url(#rinaHair)" />
      </svg>
    );
  };

  // Render Fino: Energetic popular high school boy (messy blue-black spiky hair, stylish uniform)
  const renderFino = () => {
    const isSmug = expression === "smug" || expression === "laugh";
    const isShocked = expression === "shocked" || expression === "serious";

    return (
      <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
        <defs>
          <linearGradient id="finoHair" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="finoUniform" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="skinFino" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff3ec" />
            <stop offset="100%" stopColor="#f3be9b" />
          </linearGradient>
        </defs>

        {/* Ambient aura */}
        <circle cx="200" cy="220" r="140" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6,4" className="opacity-25" />

        {/* Back Hair Spiky */}
        <path d="M 115,180 C 95,115 140,75 200,75 C 260,75 305,115 285,180 C 295,165 305,135 285,105 Q 200,70 115,105 C 95,135 105,165 115,180 Z" fill="url(#finoHair)" />

        {/* Body SMA Uniform - Raised shoulder-line to shorten neck */}
        <path d="M 90,500 L 90,370 L 120,330 L 280,330 L 310,370 L 310,500 Z" fill="url(#finoUniform)" />
        <path d="M 120,330 L 150,330 L 140,500 L 90,500 Z" fill="#64748b" />
        <path d="M 280,330 L 250,330 L 260,500 L 310,500 Z" fill="#64748b" />
        {/* Loose collar style for popular look */}
        <path d="M 160,330 L 200,390 L 240,330 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2.5" />
        <path d="M 197,340 L 203,340 L 205,410 L 195,410 Z" fill="#475569" />

        {/* Neck - Correct Shorter Length */}
        <path d="M 178,332 L 182,255 L 218,255 L 222,332 Z" fill="url(#skinFino)" />

        {/* Head Base */}
        <path d="M 138,185 C 138,275 262,275 262,185 C 262,125 138,125 138,185 Z" fill="url(#skinFino)" />

        {/* Eyes (Sharp amber gaze) */}
        <g stroke="#1d2d44" strokeWidth="3" fill="none">
          {isShocked ? (
            <>
              <circle cx="175" cy="192" r="9" fill="#fff" />
              <circle cx="175" cy="192" r="4" fill="#f59e0b" />
              <circle cx="225" cy="192" r="9" fill="#fff" />
              <circle cx="225" cy="192" r="4" fill="#f59e0b" />
            </>
          ) : (
            <>
              <path d="M 160,184 C 165,179 180,179 185,186" strokeWidth="3.5" />
              <circle cx="173" cy="194" r="5" fill="#1d2d44" />
              <path d="M 240,184 C 235,179 220,179 215,186" strokeWidth="3.5" />
              <circle cx="227" cy="194" r="5" fill="#1d2d44" />
            </>
          )}
        </g>

        {/* Eyebrows */}
        <g stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round">
          {isSmug ? (
            <>
              <path d="M 155,174 L 185,172" />
              <path d="M 245,174 L 215,180" />
            </>
          ) : (
            <>
              <path d="M 155,174 Q 170,169 185,174" />
              <path d="M 245,174 Q 230,169 215,174" />
            </>
          )}
        </g>

        {/* Mouth */}
        <g stroke="#2d1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round">
          {isSmug ? (
            <path d="M 185,230 Q 190,224 215,228" strokeWidth="3.5" />
          ) : expression === "serious" ? (
            <path d="M 188,235 L 212,235" />
          ) : (
            <path d="M 186,232 Q 200,240 214,232" />
          )}
        </g>

        {/* Messy Front Spiky Hair Spikes */}
        <path d="M 130,130 L 148,165 L 158,135 L 175,180 L 185,142 L 198,188 L 210,142 L 222,180 L 235,135 L 245,165 L 265,130 Z" fill="url(#finoHair)" />
        {/* Sideburns */}
        <path d="M 134,155 L 128,205 L 140,182 Z" fill="#1e293b" />
        <path d="M 266,155 L 272,205 L 260,182 Z" fill="#1e293b" />
      </svg>
    );
  };

  // Render Guru BK (Bu Rahma): Elegant, gentle hijab (veil), smart counsel uniform, wise spectacles
  const renderGuruBK = () => {
    const isSerious = expression === "serious" || expression === "default";

    return (
      <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
        <defs>
          <linearGradient id="counselorHijab" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f766e" />
            <stop offset="100%" stopColor="#115e59" />
          </linearGradient>
          <linearGradient id="counselorSuit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3f4f6" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="skinCounselor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fffaf0" />
            <stop offset="100%" stopColor="#ffeadd" />
          </linearGradient>
        </defs>

        {/* Ambient aura */}
        <circle cx="200" cy="220" r="140" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="10,5" className="opacity-25" />

        {/* Hijab Cap (Back drape) */}
        <path d="M 115,220 Q 75,350 90,500 L 310,500 Q 325,350 285,220 Z" fill="url(#counselorHijab)" />

        {/* Blazer Outer / Counselor Suit - Raised shoulder line for natural short-neck fit */}
        <path d="M 100,500 L 100,370 L 125,330 L 275,330 L 300,370 L 300,500 Z" fill="url(#counselorSuit)" />
        <path d="M 125,330 L 155,375 L 145,500 L 100,500 Z" fill="#0d9488" opacity="0.85" />
        <path d="M 275,330 L 245,375 L 255,500 L 300,500 Z" fill="#0d9488" opacity="0.85" />
        <path d="M 175,330 L 200,390 L 225,330 Z" fill="#134e4a" /> {/* Hijab Collar Base */}

        {/* Hijab neck drapery - connects from chin down elegantly */}
        <path d="M 158,330 Q 200,365 242,330 Z" fill="url(#counselorHijab)" />

        {/* Head Base - Lowered slightly to bring it closer to the shoulders */}
        <path d="M 148,212 C 148,292 252,292 252,212 C 252,165 148,165 148,212 Z" fill="url(#skinCounselor)" />

        {/* Professional spectacles (Glasses) */}
        <g stroke="#1e293b" strokeWidth="3" fill="none">
          {/* Left Lens */}
          <rect x="155" y="194" width="32" height="26" rx="4" fill="rgba(6,182,212,0.1)" stroke="#0d9488" />
          <line x1="187" y1="207" x2="213" y2="207" stroke="#0d9488" strokeWidth="3" />
          {/* Right Lens */}
          <rect x="213" y="194" width="32" height="26" rx="4" fill="rgba(6,182,212,0.1)" stroke="#0d9488" />
        </g>

        {/* Gentle mature eyes */}
        <g fill="#1e293b">
          <circle cx="171" cy="207" r="4.5" />
          <circle cx="229" cy="207" r="4.5" />
          <circle cx="173" cy="205" r="1.5" fill="#fff" />
          <circle cx="231" cy="205" r="1.5" fill="#fff" />
        </g>

        {/* Hijab Front Frame (Elegant face wrap covering forehead and ears) */}
        <path d="M 148,212 C 148,150 252,150 252,212 C 240,180 215,175 200,180 C 185,175 160,180 148,212 Z" fill="url(#counselorHijab)" />
        {/* Outer wrap folds */}
        <path d="M 148,212 Q 160,250 180,275 L 140,255 Z" fill="#0f766e" />
        <path d="M 252,212 Q 240,250 220,275 L 260,255 Z" fill="#0f766e" />

        {/* Wise, comforting mouth */}
        <g stroke="#2d1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round">
          {isSerious ? (
            <path d="M 188,256 Q 200,254 212,256" />
          ) : (
            <path d="M 188,252 Q 200,264 212,252" />
          )}
        </g>

        {/* Forehead brows */}
        <path d="M 158,182 Q 170,178 182,182" stroke="#115e59" strokeWidth="2" fill="none" />
        <path d="M 218,182 Q 230,178 242,182" stroke="#115e59" strokeWidth="2" fill="none" />
      </svg>
    );
  };

  const isLeft = side === "left";

  return (
    <div
      id={`character_${name}_${side}`}
      className={`relative w-48 sm:w-64 h-72 sm:h-96 flex items-end justify-center transition-all duration-300 transform ${
        isLeft 
          ? "animate-[slideInLeft_0.4s_ease-out_forwards]" 
          : "animate-[slideInRight_0.4s_ease-out_forwards]"
      } ${className}`}
    >
      {name === "alya" && renderAlya()}
      {name === "rina" && renderRina()}
      {name === "fino" && renderFino()}
      {name === "gurubk" && renderGuruBK()}
    </div>
  );
}

import React from 'react';
import { MuscleGroup } from '../types';

interface ExerciseAnimationProps {
  type: string;
  muscleGroup?: MuscleGroup;
  className?: string;
  isPaused?: boolean;
}

export const ExerciseAnimation: React.FC<ExerciseAnimationProps> = ({
  type,
  muscleGroup = 'full_body',
  className = '',
  isPaused = false
}) => {
  // Muscle highlight color
  const getMuscleColor = () => {
    switch (muscleGroup) {
      case 'abs':
        return '#06B6D4'; // cyan
      case 'chest':
        return '#F43F5E'; // rose
      case 'arms':
        return '#8B5CF6'; // purple
      case 'legs':
      case 'glutes':
        return '#10B981'; // emerald
      case 'cardio':
        return '#F59E0B'; // amber
      default:
        return '#10B981'; // emerald
    }
  };

  const accentColor = getMuscleColor();
  const animState = isPaused ? 'paused' : 'running';

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 border border-slate-800/80 aspect-4/3 w-full max-w-md mx-auto shadow-inner ${className}`}
    >
      {/* Dynamic Grid Floor */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-4 inset-x-6 h-[1px] bg-slate-700/60 shadow-[0_0_12px_rgba(16,185,129,0.3)]" />

      {/* Render specialized vector kinetic animation */}
      {type === 'pushups' && (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-56 p-4">
          <style>{`
            @keyframes pushupMotion {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(18px) rotate(-3deg); }
            }
            @keyframes armBend {
              0%, 100% { d: path("M 80 82 L 80 115"); }
              50% { d: path("M 80 96 L 95 106 L 80 115"); }
            }
          `}</style>
          {/* Floor ground line */}
          <line x1="20" y1="115" x2="180" y2="115" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />

          {/* Animated Body Group */}
          <g style={{ animation: `pushupMotion 2s infinite ease-in-out`, animationPlayState: animState }}>
            {/* Head */}
            <circle cx="55" cy="74" r="9" fill="#E2E8F0" />
            {/* Torso */}
            <line x1="62" y1="78" x2="135" y2="92" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" />
            {/* Chest muscle highlight */}
            <line x1="70" y1="80" x2="90" y2="84" stroke={accentColor} strokeWidth="6" strokeLinecap="round" />
            {/* Arms */}
            <path
              d="M 76 80 L 76 115"
              stroke="#CBD5E1"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ animation: `armBend 2s infinite ease-in-out`, animationPlayState: animState }}
            />
            {/* Legs */}
            <line x1="135" y1="92" x2="165" y2="113" stroke="#94A3B8" strokeWidth="8" strokeLinecap="round" />
            {/* Foot contact */}
            <circle cx="165" cy="113" r="4" fill="#64748B" />
          </g>
        </svg>
      )}

      {type === 'squats' && (
        <svg viewBox="0 0 200 160" className="w-full h-full max-h-56 p-4">
          <style>{`
            @keyframes squatMotion {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(28px); }
            }
            @keyframes thighBend {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(25deg); }
            }
          `}</style>
          <line x1="30" y1="140" x2="170" y2="140" stroke="#334155" strokeWidth="2" />
          {/* Animated Squat Model */}
          <g style={{ animation: `squatMotion 2.2s infinite ease-in-out`, animationPlayState: animState, transformOrigin: 'center bottom' }}>
            {/* Head */}
            <circle cx="100" cy="35" r="10" fill="#E2E8F0" />
            {/* Torso */}
            <line x1="100" y1="45" x2="98" y2="85" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" />
            {/* Outstretched Balancing Arms */}
            <line x1="98" y1="52" x2="60" y2="52" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
            {/* Quadriceps / Glute highlight */}
            <line x1="98" y1="85" x2="96" y2="105" stroke={accentColor} strokeWidth="8" strokeLinecap="round" />
            {/* Legs */}
            <polyline points="98,85 110,110 100,138" stroke="#94A3B8" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="98,85 86,110 96,138" stroke="#64748B" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      )}

      {type === 'lunges' && (
        <svg viewBox="0 0 200 160" className="w-full h-full max-h-56 p-4">
          <style>{`
            @keyframes lungeMotion {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(22px); }
            }
          `}</style>
          <line x1="20" y1="140" x2="180" y2="140" stroke="#334155" strokeWidth="2" />
          <g style={{ animation: `lungeMotion 2s infinite ease-in-out`, animationPlayState: animState }}>
            {/* Head */}
            <circle cx="100" cy="40" r="10" fill="#E2E8F0" />
            {/* Torso */}
            <line x1="100" y1="50" x2="100" y2="88" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" />
            {/* Hands on hips */}
            <polyline points="100,56 112,68 102,80" stroke="#CBD5E1" strokeWidth="5" fill="none" strokeLinecap="round" />
            {/* Front Leg */}
            <polyline points="100,88 125,108 120,138" stroke="#94A3B8" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            {/* Back Leg with muscle glow */}
            <polyline points="100,88 78,110 65,138" stroke={accentColor} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      )}

      {type === 'plank' && (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-56 p-4">
          <style>{`
            @keyframes corePulse {
              0%, 100% { opacity: 0.7; transform: scaleY(1); }
              50% { opacity: 1; transform: scaleY(1.08); }
            }
            @keyframes plankVibe {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-2px); }
            }
          `}</style>
          <line x1="20" y1="115" x2="180" y2="115" stroke="#334155" strokeWidth="2" />
          <g style={{ animation: `plankVibe 1.5s infinite ease-in-out`, animationPlayState: animState }}>
            {/* Head looking down */}
            <circle cx="55" cy="78" r="9" fill="#E2E8F0" />
            {/* Rigid Body Line */}
            <line x1="62" y1="80" x2="145" y2="86" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" />
            {/* Core tension indicator */}
            <line
              x1="82"
              y1="82"
              x2="120"
              y2="85"
              stroke={accentColor}
              strokeWidth="8"
              strokeLinecap="round"
              style={{ animation: `corePulse 1.2s infinite ease-in-out`, animationPlayState: animState }}
            />
            {/* Forearm on mat */}
            <polyline points="72,81 72,112 88,112" stroke="#CBD5E1" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            {/* Back leg & toes */}
            <line x1="145" y1="86" x2="162" y2="112" stroke="#94A3B8" strokeWidth="8" strokeLinecap="round" />
          </g>
        </svg>
      )}

      {type === 'mountain_climbers' && (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-56 p-4">
          <style>{`
            @keyframes climbLeg1 {
              0%, 100% { d: path("M 130 85 L 98 92 L 105 112"); }
              50% { d: path("M 130 85 L 152 98 L 165 112"); }
            }
            @keyframes climbLeg2 {
              0%, 100% { d: path("M 130 85 L 152 98 L 165 112"); }
              50% { d: path("M 130 85 L 98 92 L 105 112"); }
            }
          `}</style>
          <line x1="20" y1="115" x2="180" y2="115" stroke="#334155" strokeWidth="2" />
          {/* Head & Spine */}
          <circle cx="55" cy="70" r="9" fill="#E2E8F0" />
          <line x1="62" y1="74" x2="130" y2="85" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" />
          {/* Arms */}
          <line x1="72" y1="75" x2="72" y2="115" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
          {/* Running Legs */}
          <path
            d="M 130 85 L 98 92 L 105 112"
            stroke={accentColor}
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
            style={{ animation: `climbLeg1 0.7s infinite linear`, animationPlayState: animState }}
          />
          <path
            d="M 130 85 L 152 98 L 165 112"
            stroke="#64748B"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
            style={{ animation: `climbLeg2 0.7s infinite linear`, animationPlayState: animState }}
          />
        </svg>
      )}

      {type === 'jumping_jacks' && (
        <svg viewBox="0 0 200 160" className="w-full h-full max-h-56 p-4">
          <style>{`
            @keyframes jackJump {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-16px); }
            }
            @keyframes jackArms {
              0%, 100% { d: path("M 100 60 L 76 95 M 100 60 L 124 95"); }
              50% { d: path("M 100 60 L 70 30 M 100 60 L 130 30"); }
            }
            @keyframes jackLegs {
              0%, 100% { d: path("M 100 95 L 92 140 M 100 95 L 108 140"); }
              50% { d: path("M 100 95 L 75 140 M 100 95 L 125 140"); }
            }
          `}</style>
          <line x1="20" y1="145" x2="180" y2="145" stroke="#334155" strokeWidth="2" />
          <g style={{ animation: `jackJump 0.8s infinite ease-in-out`, animationPlayState: animState }}>
            <circle cx="100" cy="40" r="10" fill="#E2E8F0" />
            <line x1="100" y1="50" x2="100" y2="95" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" />
            <path
              d="M 100 60 L 76 95 M 100 60 L 124 95"
              stroke="#CBD5E1"
              strokeWidth="6"
              strokeLinecap="round"
              style={{ animation: `jackArms 0.8s infinite ease-in-out`, animationPlayState: animState }}
            />
            <path
              d="M 100 95 L 92 140 M 100 95 L 108 140"
              stroke={accentColor}
              strokeWidth="7"
              strokeLinecap="round"
              style={{ animation: `jackLegs 0.8s infinite ease-in-out`, animationPlayState: animState }}
            />
          </g>
        </svg>
      )}

      {type === 'burpees' && (
        <svg viewBox="0 0 200 160" className="w-full h-full max-h-56 p-4">
          <style>{`
            @keyframes burpeeCycle {
              0%, 10% { transform: translateY(-24px) scaleY(1.05); } /* Jump Up */
              25%, 40% { transform: translateY(18px) scale(0.9, 0.9); } /* Squat Down */
              55%, 75% { transform: translateY(22px) rotate(-10deg) scale(0.95); } /* Push plank */
              90%, 100% { transform: translateY(-24px) scaleY(1.05); } /* Jump Again */
            }
          `}</style>
          <line x1="20" y1="140" x2="180" y2="140" stroke="#334155" strokeWidth="2" />
          <g style={{ animation: `burpeeCycle 2.8s infinite ease-in-out`, animationPlayState: animState, transformOrigin: 'center 120px' }}>
            <circle cx="100" cy="48" r="10" fill="#E2E8F0" />
            <line x1="100" y1="58" x2="100" y2="100" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" />
            <line x1="100" y1="65" x2="80" y2="40" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
            <line x1="100" y1="65" x2="120" y2="40" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
            <line x1="100" y1="100" x2="88" y2="138" stroke={accentColor} strokeWidth="8" strokeLinecap="round" />
            <line x1="100" y1="100" x2="112" y2="138" stroke={accentColor} strokeWidth="8" strokeLinecap="round" />
          </g>
        </svg>
      )}

      {type === 'situps' && (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-56 p-4">
          <style>{`
            @keyframes situpMotion {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-55deg); }
            }
          `}</style>
          <line x1="20" y1="115" x2="180" y2="115" stroke="#334155" strokeWidth="2" />
          {/* Feet and bent knees */}
          <polyline points="110,115 130,90 150,115" stroke="#94A3B8" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {/* Torso hinging upward */}
          <g style={{ transformOrigin: '110px 115px', animation: `situpMotion 2.2s infinite ease-in-out`, animationPlayState: animState }}>
            <line x1="110" y1="115" x2="60" y2="115" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" />
            <line x1="100" y1="115" x2="75" y2="115" stroke={accentColor} strokeWidth="7" strokeLinecap="round" />
            <circle cx="50" cy="115" r="9" fill="#CBD5E1" />
            {/* Arms crossed on chest */}
            <line x1="80" y1="115" x2="72" y2="105" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" />
          </g>
        </svg>
      )}

      {type === 'bicycle_crunches' && (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-56 p-4">
          <style>{`
            @keyframes bikePedal1 {
              0%, 100% { d: path("M 105 105 L 125 80 L 150 78"); }
              50% { d: path("M 105 105 L 140 100 L 165 110"); }
            }
            @keyframes bikePedal2 {
              0%, 100% { d: path("M 105 105 L 140 100 L 165 110"); }
              50% { d: path("M 105 105 L 125 80 L 150 78"); }
            }
            @keyframes torsoTwist {
              0%, 100% { transform: rotate(-5deg); }
              50% { transform: rotate(5deg); }
            }
          `}</style>
          <line x1="20" y1="115" x2="180" y2="115" stroke="#334155" strokeWidth="2" />
          {/* Upper Body Crunch */}
          <g style={{ animation: `torsoTwist 1.2s infinite ease-in-out`, animationPlayState: animState, transformOrigin: '105px 105px' }}>
            <line x1="105" y1="105" x2="65" y2="92" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" />
            <circle cx="55" cy="88" r="9" fill="#CBD5E1" />
            <polyline points="65,92 50,78 60,68" stroke={accentColor} strokeWidth="5" fill="none" strokeLinecap="round" />
          </g>
          {/* Bicycle Legs */}
          <path
            d="M 105 105 L 125 80 L 150 78"
            stroke="#94A3B8"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
            style={{ animation: `bikePedal1 1.2s infinite ease-in-out`, animationPlayState: animState }}
          />
          <path
            d="M 105 105 L 140 100 L 165 110"
            stroke={accentColor}
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
            style={{ animation: `bikePedal2 1.2s infinite ease-in-out`, animationPlayState: animState }}
          />
        </svg>
      )}

      {type === 'glute_bridge' && (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-56 p-4">
          <style>{`
            @keyframes bridgeElevate {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-24px); }
            }
          `}</style>
          <line x1="20" y1="115" x2="180" y2="115" stroke="#334155" strokeWidth="2" />
          {/* Head & Shoulders resting on floor */}
          <circle cx="50" cy="110" r="9" fill="#CBD5E1" />
          <line x1="50" y1="115" x2="70" y2="115" stroke="#94A3B8" strokeWidth="8" strokeLinecap="round" />
          {/* Elevating Pelvis & Glute Group */}
          <g style={{ animation: `bridgeElevate 2.4s infinite ease-in-out`, animationPlayState: animState }}>
            <line x1="70" y1="115" x2="120" y2="105" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" />
            <line x1="95" y1="110" x2="120" y2="105" stroke={accentColor} strokeWidth="8" strokeLinecap="round" />
            <polyline points="120,105 135,115 145,115" stroke="#94A3B8" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      )}

      {type === 'high_knees' && (
        <svg viewBox="0 0 200 160" className="w-full h-full max-h-56 p-4">
          <style>{`
            @keyframes kneeDriveL {
              0%, 100% { d: path("M 100 95 L 75 90 L 72 125"); }
              50% { d: path("M 100 95 L 95 120 L 92 142"); }
            }
            @keyframes kneeDriveR {
              0%, 100% { d: path("M 100 95 L 95 120 L 92 142"); }
              50% { d: path("M 100 95 L 75 90 L 72 125"); }
            }
            @keyframes runnerBob {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-8px); }
            }
          `}</style>
          <line x1="20" y1="145" x2="180" y2="145" stroke="#334155" strokeWidth="2" />
          <g style={{ animation: `runnerBob 0.6s infinite ease-in-out`, animationPlayState: animState }}>
            <circle cx="100" cy="40" r="10" fill="#E2E8F0" />
            <line x1="100" y1="50" x2="100" y2="95" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" />
            {/* Pumping Arms */}
            <polyline points="98,62 82,75 75,60" stroke="#CBD5E1" strokeWidth="5" fill="none" strokeLinecap="round" />
            <polyline points="98,62 118,75 122,60" stroke="#CBD5E1" strokeWidth="5" fill="none" strokeLinecap="round" />
            {/* Driving Knees */}
            <path
              d="M 100 95 L 75 90 L 72 125"
              stroke={accentColor}
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
              style={{ animation: `kneeDriveL 0.6s infinite linear`, animationPlayState: animState }}
            />
            <path
              d="M 100 95 L 95 120 L 92 142"
              stroke="#64748B"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
              style={{ animation: `kneeDriveR 0.6s infinite linear`, animationPlayState: animState }}
            />
          </g>
        </svg>
      )}

      {type === 'stretching' && (
        <svg viewBox="0 0 200 140" className="w-full h-full max-h-56 p-4">
          <style>{`
            @keyframes cobraBreath {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.03) translateY(-3px); }
            }
          `}</style>
          <line x1="20" y1="115" x2="180" y2="115" stroke="#334155" strokeWidth="2" />
          <g style={{ animation: `cobraBreath 3.5s infinite ease-in-out`, animationPlayState: animState, transformOrigin: '120px 115px' }}>
            <circle cx="60" cy="55" r="9" fill="#E2E8F0" />
            {/* Upward arched spine */}
            <path d="M 60 64 Q 85 90 150 115" stroke="#E2E8F0" strokeWidth="12" fill="none" strokeLinecap="round" />
            {/* Chest & spinal mobility glow */}
            <path d="M 68 70 Q 82 85 105 100" stroke={accentColor} strokeWidth="6" fill="none" strokeLinecap="round" />
            {/* Arms supporting chest */}
            <line x1="78" y1="80" x2="78" y2="115" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
            {/* Legs on floor */}
            <line x1="140" y1="115" x2="175" y2="115" stroke="#94A3B8" strokeWidth="8" strokeLinecap="round" />
          </g>
        </svg>
      )}

      {/* Muscle Focus Badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[10px] font-semibold text-slate-200 tracking-wide backdrop-blur-md">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
        <span className="capitalize">{muscleGroup.replace('_', ' ')}</span>
      </div>
    </div>
  );
};

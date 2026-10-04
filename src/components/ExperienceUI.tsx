'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, RotateCcw, Bug } from 'lucide-react';
import { GestureState } from '@/types/gesture';

interface ExperienceUIProps {
  gestureState: GestureState;
  fingerCount: number;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onReset: () => void;
  onToggleDebug: () => void;
  isDebugMode: boolean;
  isDemoMode: boolean;
  openPalmProgress?: number;
}

export default function ExperienceUI({
  gestureState,
  fingerCount,
  isAudioMuted,
  onToggleAudio,
  onReset,
  onToggleDebug,
  isDebugMode,
  isDemoMode,
  openPalmProgress = 0,
}: ExperienceUIProps) {
  // Section 08 & 28 exact instructions
  let instructionText = '';

  switch (gestureState) {
    case 'INTRO':
    case 'CAMERA_LOADING':
      instructionText = '';
      break;
    case 'READY':
      instructionText = 'SHOW YOUR HANDS';
      break;
    case 'ONE_FINGER':
      instructionText = 'BRING YOUR SECOND FINGER INTO VIEW';
      break;
    case 'TWO_FINGERS':
      instructionText = 'BRING THEM TOGETHER';
      break;
    case 'APPROACHING':
      instructionText = 'TOUCH FINGERTIPS';
      break;
    case 'TOUCH':
    case 'CONNECTED':
    case 'PULLING':
      instructionText = 'PULL APART';
      break;
    case 'MAX_TENSION':
      instructionText = 'KEEP PULLING';
      break;
    case 'OPENING':
      // Section 28: "During transition: '' — Do not display instructions during the important visual moment"
      instructionText = '';
      break;
    case 'IMMERSIVE':
      instructionText = '';
      break;
    case 'RESETTING':
      instructionText = '';
      break;
    default:
      instructionText = '';
      break;
  }

  return (
    <div className="absolute inset-0 z-40 pointer-events-none select-none flex flex-col justify-between p-6 sm:p-8">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between w-full">
        {/* Top-Left: "TOUCH THE DIGITAL WORLD" */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono tracking-[0.25em] text-white/70 uppercase">
            Touch The Digital World
          </span>
        </div>

        {/* Top-Right: "● TRACKING" and minimal controls */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Tracking Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-white/80">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isDemoMode
                  ? 'bg-amber-400 animate-pulse'
                  : fingerCount > 0
                  ? 'bg-cyber-cyan shadow-[0_0_8px_#00f0ff]'
                  : 'bg-white/30'
              }`}
            />
            <span className="uppercase">
              {isDemoMode ? 'DEMO MODE' : 'TRACKING'}
            </span>
          </div>

          {/* Reset button (visible in IMMERSIVE or anytime) */}
          {(gestureState === 'IMMERSIVE' || gestureState === 'PULLING' || gestureState === 'MAX_TENSION') && (
            <button
              onClick={onReset}
              title="Reset Interaction"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 active:scale-95 text-[10px] font-mono tracking-widest text-white/70 hover:text-white transition-all uppercase"
            >
              <RotateCcw className="w-3 h-3 text-white/60" />
              <span>RESET</span>
            </button>
          )}

          {/* Audio toggle */}
          <button
            onClick={onToggleAudio}
            title={isAudioMuted ? 'Unmute' : 'Mute'}
            className="p-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 active:scale-95 text-white/60 hover:text-white transition-all"
          >
            {isAudioMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-cyber-cyan" />
            )}
          </button>

          {/* Debug toggle */}
          <button
            onClick={onToggleDebug}
            title="Toggle Debug Telemetry"
            className={`p-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 active:scale-95 transition-all ${
              isDebugMode ? 'text-cyber-cyan bg-cyber-cyan/15' : 'text-white/40'
            }`}
          >
            <Bug className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Center Dynamic Instruction */}
      <div className="flex flex-col items-center justify-center w-full mb-6">
        {/* Open Palm Reset indicator bar if user is holding open palm in IMMERSIVE */}
        {openPalmProgress > 0 && gestureState === 'IMMERSIVE' && (
          <div className="flex flex-col items-center gap-1 mb-3">
            <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase">
              Hold Open Palm to Reset
            </span>
            <div className="w-40 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyber-cyan transition-all duration-75"
                style={{ width: `${openPalmProgress * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Dynamic Instruction Pill */}
        <AnimatePresence mode="wait">
          {instructionText && (
            <motion.div
              key={instructionText}
              initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(3px)' }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="px-6 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-lg text-center"
            >
              <span className="text-xs sm:text-sm font-mono font-medium tracking-[0.25em] text-white uppercase">
                {instructionText}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

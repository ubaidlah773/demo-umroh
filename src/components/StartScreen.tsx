'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StartScreenProps {
  onStart: () => void;
  onStartDemo: () => void;
  isLoading?: boolean;
}

export default function StartScreen({
  onStart,
  onStartDemo,
  isLoading = false,
}: StartScreenProps) {
  return (
    <div className="relative z-50 flex flex-col items-center justify-center w-full h-full px-6 select-none overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyber-cyan/5 rounded-full blur-[160px] opacity-60" />
      </div>

      {/* Film grain and vignette */}
      <div className="absolute inset-0 noise-overlay pointer-events-none mix-blend-screen opacity-35" />
      <div className="absolute inset-0 cinematic-vignette pointer-events-none" />

      {/* Minimal Center Content */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col items-center max-w-lg text-center"
      >
        {/* Monolithic Title: TOUCH */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1.0 }}
          className="text-6xl sm:text-8xl md:text-9xl font-light tracking-[0.2em] text-white uppercase mb-8"
          style={{ letterSpacing: '0.22em' }}
        >
          TOUCH
        </motion.h1>

        {/* Subtext: Use two fingers to interact */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="text-xs sm:text-sm font-mono tracking-[0.3em] text-white uppercase mb-12"
        >
          Use two fingers to interact
        </motion.p>

        {/* Minimal START Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="flex flex-col items-center gap-5 w-full"
        >
          <button
            onClick={onStart}
            disabled={isLoading}
            className="group relative inline-flex items-center justify-center px-12 py-3.5 font-mono text-xs uppercase tracking-[0.3em] text-white font-medium transition-all duration-500 rounded-full border border-white/20 hover:border-cyber-cyan/80 hover:bg-cyber-cyan/10 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] active:scale-95 disabled:opacity-50"
          >
            <span className="relative z-10">
              {isLoading ? 'INITIALIZING...' : 'START'}
            </span>
          </button>

          {/* Mouse / Touch Demo Fallback */}
          <button
            onClick={onStartDemo}
            className="text-[10px] font-mono tracking-widest text-white/30 hover:text-cyber-cyan/80 transition-colors uppercase pt-2"
          >
            or use demo mode
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom subtle note */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-[0.3em] text-white/20 uppercase pointer-events-none">
        Webcam · Real-time Hand Tracking
      </div>
    </div>
  );
}

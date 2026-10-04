'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, MousePointer } from 'lucide-react';

interface ErrorScreenProps {
  errorTitle?: string;
  errorMessage?: string;
  onRetry: () => void;
  onLaunchDemo: () => void;
}

export default function ErrorScreen({
  errorTitle = 'CAMERA ACCESS REQUIRED',
  errorMessage = 'Please allow camera access in your browser to interact with the spatial experience.',
  onRetry,
  onLaunchDemo,
}: ErrorScreenProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-[#05070B]/90 backdrop-blur-xl select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full p-8 rounded-2xl glass-panel border border-white/10 flex flex-col items-center text-center shadow-2xl"
      >
        <div className="p-4 mb-5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h2 className="text-xl font-mono font-bold tracking-wider text-white mb-3 uppercase">
          {errorTitle}
        </h2>

        <p className="text-sm font-light text-white/60 mb-8 leading-relaxed">
          {errorMessage}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={onRetry}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-black font-mono text-xs font-semibold uppercase tracking-wider hover:bg-cyber-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-95 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>TRY AGAIN</span>
          </button>

          <button
            onClick={onLaunchDemo}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full glass-pill text-white font-mono text-xs font-semibold uppercase tracking-wider hover:bg-white/10 active:scale-95 transition-all"
          >
            <MousePointer className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>USE DEMO MODE</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

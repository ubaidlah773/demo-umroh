'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Point2D } from '@/types/tracking';

interface ImmersiveTransitionProps {
  isOpening: boolean;
  centerPoint: Point2D;
}

export default function ImmersiveTransition({
  isOpening,
  centerPoint,
}: ImmersiveTransitionProps) {
  const originX = centerPoint.x || (typeof window !== 'undefined' ? window.innerWidth / 2 : 640);
  const originY = centerPoint.y || (typeof window !== 'undefined' ? window.innerHeight / 2 : 360);

  return (
    <AnimatePresence>
      {isOpening && (
        <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden select-none">
          {/* 0.00 - 0.20 sec: Center flash bloom & energy convergence */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.4, 0] }}
            transition={{
              duration: 0.9,
              times: [0, 0.22, 0.6, 1],
              ease: 'easeOut',
            }}
            className="absolute inset-0 bg-white mix-blend-screen pointer-events-none"
          />

          {/* 0.30 - 0.60 sec: Vertical digital slit rift splitting open from center */}
          <motion.div
            initial={{ scaleX: 0, scaleY: 0.1, opacity: 0 }}
            animate={{
              scaleX: [0, 0.05, 1, 15],
              scaleY: [0.1, 1, 4, 15],
              opacity: [0, 1, 0.9, 0],
            }}
            transition={{
              duration: 0.9,
              times: [0, 0.25, 0.6, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              left: originX,
              top: originY,
              transform: 'translate(-50%, -50%)',
            }}
            className="absolute w-[80px] h-[300px] rounded-full bg-gradient-to-r from-transparent via-cyber-cyan to-transparent shadow-[0_0_120px_#00f0ff]"
          />

          {/* 0.40 - 0.80 sec: Expanding radial shockwave opening */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 0.2, 1.2, 5],
              opacity: [0, 1, 0.8, 0],
            }}
            transition={{
              duration: 0.9,
              times: [0, 0.3, 0.7, 1],
              ease: 'easeOut',
            }}
            style={{
              left: originX,
              top: originY,
              transform: 'translate(-50%, -50%)',
            }}
            className="absolute w-[450px] h-[450px] rounded-full border-2 border-cyber-cyan/90 shadow-[0_0_80px_rgba(0,240,255,0.8),inset_0_0_80px_rgba(167,139,250,0.8)]"
          />

          {/* Outward light flares */}
          {[0, 0.12].map((delay, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{
                delay,
                duration: 0.8,
                ease: 'easeOut',
              }}
              style={{
                left: originX,
                top: originY,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute w-[250px] h-[250px] rounded-full border border-white/60 shadow-[0_0_50px_rgba(0,240,255,0.6)]"
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

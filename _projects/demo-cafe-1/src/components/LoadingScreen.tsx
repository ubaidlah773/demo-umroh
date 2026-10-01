"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Smooth progress increment reaching 100% in ~1.6 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            onComplete?.();
          }, 250);
          return 100;
        }
        // Accelerating curve
        const step = Math.max(1, Math.floor((100 - prev) * 0.12) + 2);
        return Math.min(100, prev + step);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-espresso-950 text-cream-100 select-none overflow-hidden"
        >
          {/* Subtle background radial glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-caramel-500/10 blur-[100px] pointer-events-none" />

          {/* Centered 3D Rotating Coffee Bean */}
          <div className="relative mb-8 flex items-center justify-center">
            {/* Ambient gold aura */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-44 h-44 rounded-full bg-gold-500/20 blur-2xl"
            />

            {/* Rotating 3D bean image */}
            <motion.div
              animate={{
                rotateZ: [0, 360],
                y: [0, -6, 0],
              }}
              transition={{
                rotateZ: { duration: 12, repeat: Infinity, ease: "linear" },
                y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
              }}
              className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden p-2 shadow-2xl border border-gold-500/20 bg-espresso-900/60 backdrop-blur-md"
            >
              <Image
                src="/images/single-bean.jpg"
                alt="AROMA 3D Coffee Bean"
                fill
                priority
                className="object-cover rounded-full"
              />
            </motion.div>
          </div>

          {/* Brand Name & Loading Status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center z-10 space-y-3"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="h-[1px] w-6 bg-gold-500/40" />
              <h2 className="text-xs uppercase tracking-[0.35em] text-gold-500 font-medium">
                AROMA COFFEE HOUSE
              </h2>
              <span className="h-[1px] w-6 bg-gold-500/40" />
            </div>

            <p className="text-sm md:text-base font-light tracking-[0.25em] text-cream-200">
              ROASTING EXPERIENCE...
            </p>

            {/* Progress counter */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <span className="font-serif text-2xl font-light text-gold-400 tabular-nums">
                {progress}%
              </span>
            </div>

            {/* Micro loading progress line */}
            <div className="w-48 h-[2px] bg-espresso-800 rounded-full mx-auto overflow-hidden mt-4">
              <motion.div
                className="h-full bg-gradient-to-r from-caramel-500 via-gold-500 to-cream-100 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

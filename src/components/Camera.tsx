'use client';

import React from 'react';
import { Point2D } from '@/types/tracking';

interface CameraProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isStreaming: boolean;
  pullProgress?: number;
  centerPoint?: Point2D;
  isOpening?: boolean;
  isImmersive?: boolean;
}

export default function Camera({
  videoRef,
  isStreaming,
  pullProgress = 0,
  centerPoint,
  isOpening = false,
  isImmersive = false,
}: CameraProps) {
  // Center coordinates for distortion focal point
  const cx = centerPoint?.x ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 640);
  const cy = centerPoint?.y ?? (typeof window !== 'undefined' ? window.innerHeight / 2 : 360);

  // Progressive darkness and opacity
  const videoOpacity = isImmersive ? 0.08 : isOpening ? 0.15 : isStreaming ? 0.42 : 0;
  const overlayDarkness = 0.65 + pullProgress * 0.28;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-10">
      {/* Mirrored Video Stream */}
      <video
        ref={videoRef}
        playsInline
        muted
        className="w-full h-full object-cover transform scale-x-[-1] transition-opacity duration-1000"
        style={{
          opacity: videoOpacity,
          filter: `contrast(1.2) brightness(${Math.max(0.4, 0.95 - pullProgress * 0.45)}) saturate(0.85)`,
          transformOrigin: `${cx}px ${cy}px`,
          transform: `scaleX(-1) scale(${1 + pullProgress * 0.04})`,
        }}
      />

      {/* Cinematic Dark Overlay */}
      <div
        className="absolute inset-0 transition-colors duration-200"
        style={{
          backgroundColor: `rgba(5, 7, 11, ${overlayDarkness})`,
        }}
      />

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 cinematic-vignette pointer-events-none" />

      {/* Subtle Film Grain / Noise */}
      <div className="absolute inset-0 noise-overlay pointer-events-none mix-blend-screen opacity-35" />

      {/* Dynamic Screen Tension / Radial Warp around centerPoint as pullProgress increases */}
      {pullProgress > 0.3 && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-150"
          style={{
            opacity: Math.min(1, (pullProgress - 0.3) * 1.5),
            background: `radial-gradient(circle at ${cx}px ${cy}px, rgba(0, 240, 255, ${
              (pullProgress - 0.3) * 0.18
            }) 0%, rgba(5, 7, 11, ${pullProgress * 0.4}) 55%, rgba(3, 5, 8, ${pullProgress * 0.7}) 100%)`,
          }}
        />
      )}
    </div>
  );
}

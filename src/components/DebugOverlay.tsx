'use client';

import React, { useState, useEffect } from 'react';
import { TrackedFingertip } from '@/types/tracking';
import { GestureMetrics, GestureState } from '@/types/gesture';

interface DebugOverlayProps {
  isVisible: boolean;
  gestureState: GestureState;
  fingertipsRef: React.MutableRefObject<TrackedFingertip[]>;
  metricsRef: React.MutableRefObject<GestureMetrics>;
}

export default function DebugOverlay({
  isVisible,
  gestureState,
  fingertipsRef,
  metricsRef,
}: DebugOverlayProps) {
  const [fps, setFps] = useState(60);
  const [debugData, setDebugData] = useState<{
    tips: TrackedFingertip[];
    metrics: GestureMetrics;
  }>({
    tips: [],
    metrics: {
      distance: 0,
      initialDistance: 0,
      pullDistance: 0,
      pullProgress: 0,
      connectionThreshold: 0,
      requiredPullDistance: 0,
      centerPoint: { x: 0, y: 0 },
      centerX: 0,
      centerY: 0,
      velocity: 0,
      tension: 0,
      isPinching: false,
      isOpenPalm: false,
      openPalmProgress: 0,
      swipeDetected: null,
    },
  });

  useEffect(() => {
    if (!isVisible) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const updateDebug = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 500) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }

      setDebugData({
        tips: [...(fingertipsRef.current || [])],
        metrics: { ...(metricsRef.current || debugData.metrics) },
      });

      animId = requestAnimationFrame(updateDebug);
    };

    animId = requestAnimationFrame(updateDebug);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isVisible, fingertipsRef, metricsRef]);

  if (!isVisible) return null;

  const fingerA = debugData.tips[0];
  const fingerB = debugData.tips[1];

  return (
    <div className="absolute top-16 left-6 z-50 p-4 rounded-xl bg-black/80 border border-cyber-cyan/30 text-[10px] font-mono text-cyber-cyan/90 backdrop-blur-md max-w-xs shadow-2xl pointer-events-none select-none">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-cyber-cyan/20">
        <span className="font-bold tracking-widest text-white uppercase">Debug Telemetry</span>
        <span className={`px-1.5 py-0.5 rounded ${fps < 30 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
          {fps} FPS
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-white/70">
        <span className="text-white/40">CURRENT STATE:</span>
        <span className="text-white font-semibold">{gestureState}</span>

        <span className="text-white/40">HAND COUNT:</span>
        <span>{debugData.tips.length} detected</span>

        <span className="text-white/40">FINGER A (X, Y):</span>
        <span>
          {fingerA ? `${Math.round(fingerA.x)}, ${Math.round(fingerA.y)}` : 'N/A'}
        </span>

        <span className="text-white/40">FINGER B (X, Y):</span>
        <span>
          {fingerB ? `${Math.round(fingerB.x)}, ${Math.round(fingerB.y)}` : 'N/A'}
        </span>

        <span className="text-white/40">DISTANCE:</span>
        <span>{Math.round(debugData.metrics.distance)} px</span>

        <span className="text-white/40">INITIAL DISTANCE:</span>
        <span>{Math.round(debugData.metrics.initialDistance)} px</span>

        <span className="text-white/40">PULL DISTANCE:</span>
        <span>{Math.round(debugData.metrics.pullDistance)} px</span>

        <span className="text-white/40">PULL PROGRESS:</span>
        <span className="text-cyber-cyan font-bold">
          {(debugData.metrics.pullProgress * 100).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

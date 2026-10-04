import { useState, useRef, useEffect, useCallback } from 'react';
import { GestureEngine } from '@/lib/gestureEngine';
import { GestureState, GestureMetrics } from '@/types/gesture';
import { TrackedFingertip } from '@/types/tracking';
import { calculateDynamicThresholds } from '@/lib/coordinateMapping';
import { audioEngine } from '@/lib/audioSynthesizer';

interface UseGestureEngineProps {
  fingertipsRef: React.MutableRefObject<TrackedFingertip[]>;
  isCameraActive: boolean;
  isModelReady: boolean;
  onOpeningTriggered?: () => void;
  onTouchTriggered?: (centerPoint: { x: number; y: number }) => void;
}

export function useGestureEngine({
  fingertipsRef,
  isCameraActive,
  isModelReady,
  onOpeningTriggered,
  onTouchTriggered,
}: UseGestureEngineProps) {
  const [gestureState, setGestureState] = useState<GestureState>('IDLE');
  const engineRef = useRef<GestureEngine>(new GestureEngine());

  const metricsRef = useRef<GestureMetrics>({
    distance: 0,
    initialDistance: 0,
    pullDistance: 0,
    pullProgress: 0,
    centerX: 0,
    centerY: 0,
    centerPoint: { x: 0, y: 0 },
    tension: 0,
    velocity: 0,
    connectionThreshold: 110,
    requiredPullDistance: 280,
    isPinching: false,
    isOpenPalm: false,
    openPalmProgress: 0,
    swipeDetected: null,
  });

  const gestureStateRef = useRef<GestureState>('IDLE');
  gestureStateRef.current = gestureState;

  useEffect(() => {
    let animId: number;

    const loop = () => {
      const now = performance.now();
      const tips = fingertipsRef.current || [];
      const leftFinger = tips.find((t) => t.handIndex === 0) || tips[0] || null;
      const rightFinger = tips.find((t) => t.handIndex === 1) || tips[1] || null;

      const viewport = {
        width: typeof window !== 'undefined' ? window.innerWidth : 1280,
        height: typeof window !== 'undefined' ? window.innerHeight : 720,
      };
      const thresholds = calculateDynamicThresholds(viewport);

      const result = engineRef.current.evaluate(
        leftFinger,
        rightFinger,
        thresholds,
        now
      );

      metricsRef.current = result.metrics;

      if (result.justTouched) {
        audioEngine.playConnect();
        onTouchTriggered?.(result.metrics.centerPoint);
      }

      if (result.state === 'PULLING' || result.state === 'MAX_TENSION') {
        audioEngine.updateTension(result.metrics.pullProgress);
      } else if (result.state === 'IDLE' || result.state === 'ONE_HAND' || result.state === 'TWO_HANDS') {
        audioEngine.stopTension();
      }

      if (result.justTriggeredOpening) {
        audioEngine.playPortalTransition();
        onOpeningTriggered?.();
      }

      if (result.state !== gestureStateRef.current) {
        setGestureState(result.state);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [fingertipsRef, onOpeningTriggered, onTouchTriggered]);

  const resetToReady = useCallback(() => {
    engineRef.current.reset();
    audioEngine.stopTension();
    setGestureState('RESETTING');
    setTimeout(() => {
      setGestureState('READY');
    }, 450);
  }, []);

  return {
    gestureState,
    setGestureState,
    metricsRef,
    resetToReady,
  };
}

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import StartScreen from './StartScreen';
import CameraLayer from './CameraLayer';
import InteractionCanvas from './InteractionCanvas';
import ImmersiveTransition from './ImmersiveTransition';
import ImmersiveScene from './ImmersiveScene';
import ExperienceUI from './ExperienceUI';
import ErrorScreen from './ErrorScreen';
import DebugOverlay from './DebugOverlay';
import { useCamera } from '@/hooks/useCamera';
import { useHandTracking } from '@/hooks/useHandTracking';
import { useGestureEngine } from '@/hooks/useGestureEngine';
import { useDemoInteraction } from '@/hooks/useDemoInteraction';
import audioEngine from '@/lib/audioEngine';
import { TrackedFingertip } from '@/types/tracking';

export default function Experience() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Fallback demo ref
  const demoTipsRef = useRef<TrackedFingertip[]>([]);

  // Camera hook
  const { videoRef, cameraState, startCamera } = useCamera();

  // Hand tracking hook (independent RAF loop)
  const {
    isModelLoading,
    handCount,
    fingertipsRef: cameraFingertipsRef,
    resetTracking,
  } = useHandTracking({
    videoRef,
    isCameraActive: hasStarted && !isDemoMode && cameraState.isStreaming,
    videoDimensions: cameraState.dimensions,
  });

  // Effective fingertips ref (camera or demo)
  const activeFingertipsRef = isDemoMode ? demoTipsRef : cameraFingertipsRef;

  // Demo fallback interaction hook
  useDemoInteraction({
    isDemoActive: isDemoMode,
    fingertipsRef: demoTipsRef,
  });

  // Gesture Engine state machine hook
  const {
    gestureState,
    setGestureState,
    metricsRef,
    resetToReady,
  } = useGestureEngine({
    fingertipsRef: activeFingertipsRef,
    isCameraActive: hasStarted && (isDemoMode || cameraState.isStreaming),
    isModelReady: isDemoMode || !isModelLoading,
  });

  // Check URL params (?debug=true) and prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('debug') === 'true') {
        setIsDebugMode(true);
      }

      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Handle Start Experience
  const handleStart = async () => {
    audioEngine.init();
    setHasStarted(true);
    setGestureState('CAMERA_LOADING');

    const success = await startCamera();
    if (!success) {
      setGestureState('IDLE');
    } else {
      setGestureState('READY');
    }
  };

  // Handle Start Demo Mode
  const handleStartDemo = () => {
    audioEngine.init();
    setIsDemoMode(true);
    setHasStarted(true);
    setGestureState('READY');
  };

  // Handle Reset Experience
  const handleReset = useCallback(() => {
    resetTracking();
    resetToReady();
  }, [resetTracking, resetToReady]);

  // Audio mute toggle
  const handleToggleAudio = () => {
    const muted = audioEngine.toggleMute();
    setIsAudioMuted(muted);
  };

  // Debug toggle
  const handleToggleDebug = () => {
    setIsDebugMode((prev) => !prev);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#05070B] select-none touch-none">
      {/* 1. Initial Screen: Minimal TOUCH screen */}
      {!hasStarted && (
        <StartScreen
          onStart={handleStart}
          onStartDemo={handleStartDemo}
          isLoading={cameraState.isLoading || isModelLoading}
        />
      )}

      {/* 2. Error Screen (if camera error occurs and not in demo mode) */}
      {hasStarted && !isDemoMode && cameraState.error && (
        <ErrorScreen
          errorTitle="CAMERA ACCESS REQUIRED"
          errorMessage={cameraState.errorDetail || 'Allow camera access to interact with the experience.'}
          onRetry={handleStart}
          onLaunchDemo={handleStartDemo}
        />
      )}

      {/* 3. Main Experience */}
      {hasStarted && (
        <>
          {/* Layer 1: Camera Stream with Dark Cinematic Filters */}
          <CameraLayer
            videoRef={videoRef}
            isStreaming={!isDemoMode && cameraState.isStreaming}
            pullProgress={metricsRef.current?.pullProgress || 0}
            centerPoint={metricsRef.current?.centerPoint}
            isOpening={gestureState === 'OPENING'}
            isImmersive={gestureState === 'IMMERSIVE'}
          />

          {/* Layer 2: 3D Immersive Universe (Three.js WebGL) */}
          <ImmersiveScene
            isVisible={gestureState === 'IMMERSIVE' || gestureState === 'OPENING'}
            fingertipsRef={activeFingertipsRef}
            metricsRef={metricsRef}
            isReducedMotion={isReducedMotion}
          />

          {/* Layer 3: 2D Interaction Canvas (5-layer energy line, particles, fingertip markers) */}
          <InteractionCanvas
            fingertipsRef={activeFingertipsRef}
            metricsRef={metricsRef}
            gestureState={gestureState}
            isReducedMotion={isReducedMotion}
          />

          {/* Layer 4: Cinematic Pull-Open Transition Sequence */}
          <ImmersiveTransition
            isOpening={gestureState === 'OPENING'}
            centerPoint={metricsRef.current?.centerPoint || { x: 0, y: 0 }}
          />

          {/* Layer 5: Minimal UI Controls & Dynamic Instructions */}
          <ExperienceUI
            gestureState={gestureState}
            fingerCount={isDemoMode ? 2 : handCount}
            isAudioMuted={isAudioMuted}
            onToggleAudio={handleToggleAudio}
            onReset={handleReset}
            onToggleDebug={handleToggleDebug}
            isDebugMode={isDebugMode}
            isDemoMode={isDemoMode}
            openPalmProgress={metricsRef.current?.openPalmProgress || 0}
          />

          {/* Diagnostics / Telemetry Overlay */}
          <DebugOverlay
            isVisible={isDebugMode}
            gestureState={gestureState}
            fingertipsRef={activeFingertipsRef}
            metricsRef={metricsRef}
          />
        </>
      )}
    </main>
  );
}

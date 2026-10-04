import { useState, useRef, useEffect, useCallback } from 'react';
import { HandLandmarker } from '@mediapipe/tasks-vision';
import { initHandLandmarker, detectHands } from '@/lib/handTracking';
import { mapNormalizedToScreen } from '@/lib/coordinateMapping';
import { isPinchingPose, isOpenPalmPose, smoothPoint2D } from '@/lib/gestureMath';
import { TrackedFingertip } from '@/types/hand';

interface UseHandTrackingProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isCameraActive: boolean;
  videoDimensions: { width: number; height: number };
}

export function useHandTracking({
  videoRef,
  isCameraActive,
  videoDimensions,
}: UseHandTrackingProps) {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [modelError, setModelError] = useState<string | null>(null);
  const [handCount, setHandCount] = useState(0);

  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // High performance refs for 60FPS loop access without React state lag
  const fingertipsRef = useRef<TrackedFingertip[]>([]);
  const previousHandsRef = useRef<Map<number, TrackedFingertip>>(new Map());

  // Smoothing factor: 0.4 provides immediate responsiveness with zero jitter
  const SMOOTHING = 0.42;
  const MAX_TRAIL_LENGTH = 10;

  // Initialize model
  useEffect(() => {
    let isCancelled = false;

    async function loadModel() {
      setIsModelLoading(true);
      setModelError(null);
      try {
        const landmarker = await initHandLandmarker();
        if (!isCancelled) {
          landmarkerRef.current = landmarker;
          setIsModelLoading(false);
        }
      } catch (err: unknown) {
        console.error('Error loading MediaPipe model:', err);
        if (!isCancelled) {
          setModelError('Failed to initialize AI hand tracking.');
          setIsModelLoading(false);
        }
      }
    }

    loadModel();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Main tracking loop
  useEffect(() => {
    if (!isCameraActive || isModelLoading || !landmarkerRef.current) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    let lastVideoTime = -1;
    let lastHandCountCheck = 0;

    const processFrame = () => {
      const video = videoRef.current;
      const landmarker = landmarkerRef.current;

      if (video && video.readyState >= 2 && landmarker) {
        if (video.currentTime !== lastVideoTime) {
          lastVideoTime = video.currentTime;
          const now = performance.now();
          const result = detectHands(landmarker, video, now);

          const screenW = window.innerWidth;
          const screenH = window.innerHeight;
          const viewport = { width: screenW, height: screenH };
          const videoDims = {
            videoWidth: video.videoWidth || videoDimensions.width || 1280,
            videoHeight: video.videoHeight || videoDimensions.height || 720,
          };

          const detectedThisFrame: TrackedFingertip[] = [];

          if (result && result.landmarks && result.landmarks.length > 0) {
            const rawHands = result.landmarks.slice(0, 2);

            rawHands.forEach((handLandmarks, index) => {
              const indexTipNorm = handLandmarks[8];
              if (!indexTipNorm) return;

              // Map to screen coordinates with horizontal mirroring
              const rawScreenPos = mapNormalizedToScreen(
                indexTipNorm.x,
                indexTipNorm.y,
                viewport,
                videoDims,
                true // mirror camera
              );

              // Gesture calculations
              const pinch = isPinchingPose(handLandmarks);
              const openPalm = isOpenPalmPose(handLandmarks);

              // Get previous smoothed position for this hand index
              const prev = previousHandsRef.current.get(index);

              let smoothed = rawScreenPos;
              let vx = 0;
              let vy = 0;
              let history = [rawScreenPos];

              if (prev) {
                smoothed = smoothPoint2D(prev, rawScreenPos, SMOOTHING);
                vx = smoothed.x - prev.x;
                vy = smoothed.y - prev.y;
                history = [smoothed, ...prev.history.slice(0, MAX_TRAIL_LENGTH - 1)];
              }

              const fingertip: TrackedFingertip = {
                id: `hand-${index}`,
                x: smoothed.x,
                y: smoothed.y,
                vx,
                vy,
                rawX: rawScreenPos.x,
                rawY: rawScreenPos.y,
                history,
                opacity: 1.0,
                isPinching: pinch.isPinching,
                pinchDistance: pinch.distance,
                isOpenPalm: openPalm,
                handIndex: index,
                handedness: result.handednesses?.[index]?.[0]?.categoryName as 'Left' | 'Right',
              };

              detectedThisFrame.push(fingertip);
              previousHandsRef.current.set(index, fingertip);
            });
          }

          // Grace period for temporarily lost hands (fade smoothly instead of abruptly disappearing)
          previousHandsRef.current.forEach((prevHand, key) => {
            const isStillDetected = detectedThisFrame.some((h) => h.handIndex === key);
            if (!isStillDetected) {
              const fadedOpacity = prevHand.opacity - 0.12;
              if (fadedOpacity > 0.05) {
                const lingeringHand: TrackedFingertip = {
                  ...prevHand,
                  opacity: fadedOpacity,
                  vx: prevHand.vx * 0.5,
                  vy: prevHand.vy * 0.5,
                };
                detectedThisFrame.push(lingeringHand);
                previousHandsRef.current.set(key, lingeringHand);
              } else {
                previousHandsRef.current.delete(key);
              }
            }
          });

          fingertipsRef.current = detectedThisFrame;

          // Throttled React state update for hand count
          if (now - lastHandCountCheck > 120) {
            setHandCount(detectedThisFrame.filter((h) => h.opacity > 0.5).length);
            lastHandCountCheck = now;
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(processFrame);
    };

    animationFrameRef.current = requestAnimationFrame(processFrame);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isCameraActive, isModelLoading, videoRef, videoDimensions]);

  const resetTracking = useCallback(() => {
    fingertipsRef.current = [];
    previousHandsRef.current.clear();
    setHandCount(0);
  }, []);

  return {
    isModelLoading,
    modelError,
    handCount,
    fingertipsRef,
    resetTracking,
  };
}

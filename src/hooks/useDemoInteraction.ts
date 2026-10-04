import { useState, useRef, useEffect, useCallback } from 'react';
import { TrackedFingertip } from '@/types/hand';

interface UseDemoInteractionProps {
  isDemoActive: boolean;
  fingertipsRef: React.MutableRefObject<TrackedFingertip[]>;
}

export function useDemoInteraction({
  isDemoActive,
  fingertipsRef,
}: UseDemoInteractionProps) {
  const [isPointerDown, setIsPointerDown] = useState(false);
  const pointerPosRef = useRef({ x: 0, y: 0 });
  const startDragPosRef = useRef<{ x: number; y: number } | null>(null);
  const dragDistanceRef = useRef(0);

  useEffect(() => {
    if (!isDemoActive) return;

    // Center initial position
    pointerPosRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointerPosRef.current = { x: e.clientX, y: e.clientY };
      if (startDragPosRef.current) {
        const dx = e.clientX - startDragPosRef.current.x;
        const dy = e.clientY - startDragPosRef.current.y;
        dragDistanceRef.current = Math.hypot(dx, dy);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      setIsPointerDown(true);
      startDragPosRef.current = { x: e.clientX, y: e.clientY };
      dragDistanceRef.current = 0;
    };

    const handlePointerUp = () => {
      setIsPointerDown(false);
      startDragPosRef.current = null;
      dragDistanceRef.current = 0;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    let animId: number;

    const demoLoop = () => {
      const now = performance.now();
      const pos = pointerPosRef.current;
      const dragging = isPointerDown;
      const dragDist = dragDistanceRef.current;

      const tips: TrackedFingertip[] = [];

      if (!dragging) {
        // Two fingertips gently undulating near cursor
        const offset = 60 + Math.sin(now * 0.003) * 20;
        const p1 = { x: pos.x - offset, y: pos.y };
        const p2 = { x: pos.x + offset, y: pos.y };

        tips.push({
          id: 'demo-hand-0',
          x: p1.x,
          y: p1.y,
          vx: 0,
          vy: 0,
          rawX: p1.x,
          rawY: p1.y,
          history: [p1],
          opacity: 1.0,
          isPinching: false,
          pinchDistance: 0.15,
          isOpenPalm: false,
          handIndex: 0,
          handedness: 'Left',
        });

        tips.push({
          id: 'demo-hand-1',
          x: p2.x,
          y: p2.y,
          vx: 0,
          vy: 0,
          rawX: p2.x,
          rawY: p2.y,
          history: [p2],
          opacity: 1.0,
          isPinching: false,
          pinchDistance: 0.15,
          isOpenPalm: false,
          handIndex: 1,
          handedness: 'Right',
        });
      } else {
        // Fingers connected and being pulled apart as user drags!
        // Base separation starts at 35px (connected) and stretches with drag
        const separation = 35 + dragDist * 1.6;
        const p1 = { x: pos.x - separation * 0.5, y: pos.y };
        const p2 = { x: pos.x + separation * 0.5, y: pos.y };

        tips.push({
          id: 'demo-hand-0',
          x: p1.x,
          y: p1.y,
          vx: 0,
          vy: 0,
          rawX: p1.x,
          rawY: p1.y,
          history: [p1],
          opacity: 1.0,
          isPinching: true, // click acts as pinch in 3D
          pinchDistance: 0.03,
          isOpenPalm: false,
          handIndex: 0,
          handedness: 'Left',
        });

        tips.push({
          id: 'demo-hand-1',
          x: p2.x,
          y: p2.y,
          vx: 0,
          vy: 0,
          rawX: p2.x,
          rawY: p2.y,
          history: [p2],
          opacity: 1.0,
          isPinching: true,
          pinchDistance: 0.03,
          isOpenPalm: false,
          handIndex: 1,
          handedness: 'Right',
        });
      }

      fingertipsRef.current = tips;
      animId = requestAnimationFrame(demoLoop);
    };

    animId = requestAnimationFrame(demoLoop);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isDemoActive, isPointerDown, fingertipsRef]);

  return { isPointerDown };
}

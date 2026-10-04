import { useRef, useCallback } from 'react';
import { Point2D } from '@/types/tracking';

export interface SmoothTrackingOptions {
  smoothingFactor?: number; // 0.25 to 0.45
}

export function useSmoothTracking(options: SmoothTrackingOptions = {}) {
  const factor = options.smoothingFactor ?? 0.38;
  const smoothedPointsRef = useRef<Map<string, Point2D>>(new Map());

  const smooth = useCallback(
    (id: string, target: Point2D): Point2D => {
      const prev = smoothedPointsRef.current.get(id);
      if (!prev) {
        smoothedPointsRef.current.set(id, target);
        return target;
      }

      const smoothed: Point2D = {
        x: prev.x + (target.x - prev.x) * factor,
        y: prev.y + (target.y - prev.y) * factor,
      };

      smoothedPointsRef.current.set(id, smoothed);
      return smoothed;
    },
    [factor]
  );

  const reset = useCallback((id?: string) => {
    if (id) {
      smoothedPointsRef.current.delete(id);
    } else {
      smoothedPointsRef.current.clear();
    }
  }, []);

  return { smooth, reset, smoothedPointsRef };
}

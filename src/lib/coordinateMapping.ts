import { Point2D } from '@/types/hand';

export interface ViewportDimensions {
  width: number;
  height: number;
}

export interface VideoDimensions {
  videoWidth: number;
  videoHeight: number;
}

/**
 * Maps normalized MediaPipe coordinates (0..1) to screen pixel coordinates,
 * taking into account horizontal mirroring and object-fit: cover cropping.
 */
export function mapNormalizedToScreen(
  normX: number,
  normY: number,
  viewport: ViewportDimensions,
  video: VideoDimensions,
  mirror: boolean = true
): Point2D {
  const { width: screenW, height: screenH } = viewport;
  const { videoWidth: vidW, videoHeight: vidH } = video;

  if (vidW <= 0 || vidH <= 0 || screenW <= 0 || screenH <= 0) {
    const rawX = mirror ? (1 - normX) * screenW : normX * screenW;
    return { x: rawX, y: normY * screenH };
  }

  const screenAspect = screenW / screenH;
  const videoAspect = vidW / vidH;

  let renderedW: number;
  let renderedH: number;
  let offsetX = 0;
  let offsetY = 0;

  if (screenAspect > videoAspect) {
    // Screen is wider than video -> crop top/bottom
    renderedW = screenW;
    renderedH = screenW / videoAspect;
    offsetY = (renderedH - screenH) / 2;
  } else {
    // Screen is taller than video -> crop left/right
    renderedH = screenH;
    renderedW = screenH * videoAspect;
    offsetX = (renderedW - screenW) / 2;
  }

  // Handle horizontal mirroring
  const effectiveNormX = mirror ? 1 - normX : normX;

  const screenX = effectiveNormX * renderedW - offsetX;
  const screenY = normY * renderedH - offsetY;

  return {
    x: Math.max(0, Math.min(screenW, screenX)),
    y: Math.max(0, Math.min(screenH, screenY)),
  };
}

/**
 * Normalizes connection distance threshold dynamically based on screen dimensions
 */
export function calculateDynamicThresholds(viewport: ViewportDimensions) {
  const minDim = Math.min(viewport.width, viewport.height);
  // On mobile (e.g. 390px), threshold is ~85px. On desktop (e.g. 1440px), ~130px.
  const connectionThreshold = Math.max(75, Math.min(150, minDim * 0.16));
  // Required pull distance: ~220px on mobile, ~340px on desktop
  const requiredPullDistance = Math.max(180, Math.min(380, minDim * 0.38));

  return { connectionThreshold, requiredPullDistance };
}

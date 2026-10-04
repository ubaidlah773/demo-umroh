import { Point2D, NormalizedLandmark } from '@/types/tracking';

/**
 * Calculates Euclidean distance between two 2D points
 */
export function distanceBetweenPoints(a: Point2D, b: Point2D): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

export const distance2D = distanceBetweenPoints;

/**
 * Calculates midpoint between two 2D points
 */
export function midpoint(a: Point2D, b: Point2D): Point2D {
  return {
    x: (a.x + b.x) * 0.5,
    y: (a.y + b.y) * 0.5,
  };
}

export const midpoint2D = midpoint;

/**
 * Clamps a value between a minimum and maximum
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/**
 * Linear interpolation between a and b by t
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Normalizes a value between min and max to 0..1
 */
export function normalize(val: number, min: number, max: number): number {
  if (max === min) return 0;
  return clamp((val - min) / (max - min), 0, 1);
}

/**
 * Maps a value from one range to another
 */
export function mapRange(
  val: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const norm = normalize(val, inMin, inMax);
  return lerp(outMin, outMax, norm);
}

/**
 * Smoothly interpolates towards a target using critically damped spring physics
 */
export function smoothDamp(
  current: number,
  target: number,
  velocityRef: { current: number },
  smoothTime: number,
  deltaTime: number,
  maxSpeed: number = Infinity
): number {
  smoothTime = Math.max(0.0001, smoothTime);
  const omega = 2 / smoothTime;

  const x = omega * deltaTime;
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  let change = current - target;
  const originalTo = target;

  const maxChange = maxSpeed * smoothTime;
  change = clamp(change, -maxChange, maxChange);
  target = current - change;

  const temp = (velocityRef.current + omega * change) * deltaTime;
  velocityRef.current = (velocityRef.current - omega * temp) * exp;
  let output = target + (change + temp) * exp;

  if (originalTo - current > 0.0 === output > originalTo) {
    output = originalTo;
    velocityRef.current = (output - originalTo) / deltaTime;
  }

  return output;
}

/**
 * Calculates velocity magnitude (px/ms or units/sec) between two points over delta time
 */
export function calculateVelocity(
  prev: Point2D,
  current: Point2D,
  deltaTimeMs: number
): number {
  if (deltaTimeMs <= 0) return 0;
  const dist = distanceBetweenPoints(prev, current);
  return dist / deltaTimeMs;
}

/**
 * Exponential smoothing for a 2D point
 */
export function smoothPoint2D(
  prev: Point2D,
  target: Point2D,
  smoothingFactor: number = 0.38
): Point2D {
  return {
    x: prev.x + (target.x - prev.x) * smoothingFactor,
    y: prev.y + (target.y - prev.y) * smoothingFactor,
  };
}

/**
 * Checks if the hand is in an open palm pose:
 * All fingertips (thumb, index, middle, ring, pinky) extended away from wrist.
 */
export function isOpenPalmPose(landmarks: NormalizedLandmark[]): boolean {
  if (!landmarks || landmarks.length < 21) return false;

  const wrist = landmarks[0];

  const fingerPairs = [
    { mcp: 2, tip: 4 },
    { mcp: 5, tip: 8 },
    { mcp: 9, tip: 12 },
    { mcp: 13, tip: 16 },
    { mcp: 17, tip: 20 },
  ];

  let extendedCount = 0;
  for (const pair of fingerPairs) {
    const tip = landmarks[pair.tip];
    const mcp = landmarks[pair.mcp];

    const distTipToWrist = Math.hypot(tip.x - wrist.x, tip.y - wrist.y);
    const distMcpToWrist = Math.hypot(mcp.x - wrist.x, mcp.y - wrist.y);

    if (distTipToWrist > distMcpToWrist * 1.25) {
      extendedCount++;
    }
  }

  return extendedCount >= 4;
}

/**
 * Checks if index and thumb tips are close enough to be considered a pinch.
 */
export function isPinchingPose(landmarks: NormalizedLandmark[]): {
  isPinching: boolean;
  distance: number;
} {
  if (!landmarks || landmarks.length < 21) {
    return { isPinching: false, distance: 1.0 };
  }

  const thumbTip = landmarks[4];
  const indexTip = landmarks[8];

  const dist = Math.hypot(thumbTip.x - indexTip.x, thumbTip.y - indexTip.y);
  const isPinching = dist < 0.08;

  return { isPinching, distance: dist };
}

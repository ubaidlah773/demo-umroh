import { Point2D } from './tracking';

export type GestureState =
  | 'IDLE'
  | 'ONE_HAND'
  | 'TWO_HANDS'
  | 'APPROACHING'
  | 'TOUCH'
  | 'CONNECTED'
  | 'PULLING'
  | 'MAX_TENSION'
  | 'OPENING'
  | 'IMMERSIVE'
  | 'RESETTING'
  | 'INTRO'
  | 'CAMERA_LOADING'
  | 'READY'
  | 'ONE_FINGER'
  | 'TWO_FINGERS';

export interface GestureMetrics {
  distance: number;
  initialDistance: number;
  pullDistance: number;
  pullProgress: number; // 0.0 to 1.0
  centerX: number;
  centerY: number;
  centerPoint: Point2D;
  tension: number;
  velocity: number;
  connectionThreshold: number;
  requiredPullDistance: number;
  isPinching: boolean;
  isOpenPalm: boolean;
  openPalmProgress: number; // 0.0 to 1.0
  swipeDetected: 'left' | 'right' | null;
}

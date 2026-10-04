export interface Point2D {
  x: number;
  y: number;
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface NormalizedLandmark {
  x: number;
  y: number;
  z: number;
  visibility?: number;
}

export interface TrackedFingertip {
  id: string;
  x: number; // smoothed screen X
  y: number; // smoothed screen Y
  vx: number; // velocity X
  vy: number; // velocity Y
  rawX: number; // raw screen X
  rawY: number; // raw screen Y
  history: Point2D[]; // trail history
  opacity: number; // for smooth fading on hand loss
  isPinching: boolean;
  pinchDistance: number;
  isOpenPalm: boolean;
  handIndex: number;
  handedness?: 'Left' | 'Right';
}

export interface TrackingData {
  leftFinger: TrackedFingertip | null;
  rightFinger: TrackedFingertip | null;
  fingertips: TrackedFingertip[];
  distance: number;
  pullProgress: number;
  centerX: number;
  centerY: number;
  velocity: number;
  timestamp: number;
}

export interface TrackingFrameResult {
  fingertips: TrackedFingertip[];
  fingerCount: number;
  timestamp: number;
}

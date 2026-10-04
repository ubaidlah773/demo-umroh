import { FilesetResolver, HandLandmarker, HandLandmarkerResult } from '@mediapipe/tasks-vision';

export const LANDMARK_INDEX_FINGER_TIP = 8;
export const LANDMARK_THUMB_TIP = 4;
export const LANDMARK_WRIST = 0;

let cachedLandmarker: HandLandmarker | null = null;
let isInitializing = false;

export async function getHandLandmarker(): Promise<HandLandmarker> {
  if (cachedLandmarker) {
    return cachedLandmarker;
  }

  if (isInitializing) {
    while (isInitializing) {
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    if (cachedLandmarker) return cachedLandmarker;
  }

  isInitializing = true;

  try {
    let vision;
    try {
      vision = await FilesetResolver.forVisionTasks('/mediapipe/wasm');
    } catch {
      vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm'
      );
    }

    try {
      cachedLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: '/models/hand_landmarker.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numHands: 2,
        minHandDetectionConfidence: 0.6,
        minHandPresenceConfidence: 0.6,
        minTrackingConfidence: 0.6,
      });
    } catch (gpuError) {
      console.warn('MediaPipe GPU initialization failed, falling back to CPU:', gpuError);
      cachedLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: '/models/hand_landmarker.task',
          delegate: 'CPU',
        },
        runningMode: 'VIDEO',
        numHands: 2,
        minHandDetectionConfidence: 0.55,
        minHandPresenceConfidence: 0.55,
        minTrackingConfidence: 0.55,
      });
    }

    return cachedLandmarker;
  } catch (error) {
    console.error('Failed to initialize MediaPipe HandLandmarker:', error);
    // Remote fallback
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm'
    );
    cachedLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
        delegate: 'CPU',
      },
      runningMode: 'VIDEO',
      numHands: 2,
    });
    return cachedLandmarker;
  } finally {
    isInitializing = false;
  }
}

export function detectHandLandmarks(
  landmarker: HandLandmarker,
  video: HTMLVideoElement,
  timestamp: number
): HandLandmarkerResult | null {
  if (!video || video.readyState < 2) return null;
  try {
    return landmarker.detectForVideo(video, timestamp);
  } catch (err) {
    return null;
  }
}

export function disposeHandLandmarker() {
  if (cachedLandmarker) {
    try {
      cachedLandmarker.close();
    } catch {
      // Ignore
    }
    cachedLandmarker = null;
  }
}

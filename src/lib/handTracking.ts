import { FilesetResolver, HandLandmarker, HandLandmarkerResult } from '@mediapipe/tasks-vision';

let handLandmarkerInstance: HandLandmarker | null = null;
let isInitializing = false;

export async function initHandLandmarker(): Promise<HandLandmarker> {
  if (handLandmarkerInstance) {
    return handLandmarkerInstance;
  }

  if (isInitializing) {
    // Wait until existing initialization finishes
    while (isInitializing) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    if (handLandmarkerInstance) return handLandmarkerInstance;
  }

  isInitializing = true;

  try {
    // Try local wasm first, then fallback to CDN if necessary
    let vision;
    try {
      vision = await FilesetResolver.forVisionTasks('/mediapipe/wasm');
    } catch {
      vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm'
      );
    }

    // Try GPU delegate first, fallback to CPU
    try {
      handLandmarkerInstance = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: '/models/hand_landmarker.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numHands: 2,
        minHandDetectionConfidence: 0.5,
        minHandPresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
    } catch (gpuError) {
      console.warn('GPU delegate failed, attempting CPU fallback:', gpuError);
      handLandmarkerInstance = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: '/models/hand_landmarker.task',
          delegate: 'CPU',
        },
        runningMode: 'VIDEO',
        numHands: 2,
        minHandDetectionConfidence: 0.45,
        minHandPresenceConfidence: 0.45,
        minTrackingConfidence: 0.45,
      });
    }

    return handLandmarkerInstance;
  } catch (error) {
    console.error('Failed to initialize HandLandmarker:', error);
    // Try external model URL fallback if local model failed
    try {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm'
      );
      handLandmarkerInstance = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
          delegate: 'CPU',
        },
        runningMode: 'VIDEO',
        numHands: 2,
      });
      return handLandmarkerInstance;
    } catch (fallbackError) {
      throw fallbackError;
    }
  } finally {
    isInitializing = false;
  }
}

export function detectHands(
  landmarker: HandLandmarker,
  video: HTMLVideoElement,
  timestamp: number
): HandLandmarkerResult | null {
  if (!video || video.readyState < 2) return null;
  try {
    return landmarker.detectForVideo(video, timestamp);
  } catch (err) {
    console.warn('Hand detection frame dropped:', err);
    return null;
  }
}

export function closeHandLandmarker() {
  if (handLandmarkerInstance) {
    try {
      handLandmarkerInstance.close();
    } catch {
      // Ignore
    }
    handLandmarkerInstance = null;
  }
}

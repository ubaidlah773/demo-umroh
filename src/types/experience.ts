import { GestureMetrics, GestureState } from './gesture';
import { TrackedFingertip } from './hand';

export interface ExperienceState {
  gestureState: GestureState;
  fingertips: TrackedFingertip[];
  metrics: GestureMetrics;
  isAudioMuted: boolean;
  isDebugMode: boolean;
  isDemoMode: boolean;
  isReducedMotion: boolean;
  cameraReady: boolean;
  errorMessage: string | null;
  errorDetail: string | null;
  activeRealityIndex: number;
}

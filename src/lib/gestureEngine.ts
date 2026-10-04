import { TrackedFingertip, Point2D } from '@/types/tracking';
import { GestureState, GestureMetrics } from '@/types/gesture';
import { distanceBetweenPoints, midpoint, clamp, calculateVelocity } from './gestureMath';

export interface GestureEngineConfig {
  connectionThreshold: number;
  requiredPullDistance: number;
}

export class GestureEngine {
  private currentState: GestureState = 'IDLE';
  private initialDistance: number | null = null;
  private hasTouchedBeforePull: boolean = false;
  private lastMidpoint: Point2D = { x: 0, y: 0 };
  private lastTimestamp: number = 0;
  private openPalmStartTime: number | null = null;
  private openingStartTime: number | null = null;

  public evaluate(
    leftFinger: TrackedFingertip | null,
    rightFinger: TrackedFingertip | null,
    config: GestureEngineConfig,
    timestamp: number = performance.now()
  ): {
    state: GestureState;
    metrics: GestureMetrics;
    justTouched: boolean;
    justTriggeredOpening: boolean;
  } {
    const deltaTime = this.lastTimestamp > 0 ? timestamp - this.lastTimestamp : 16.6;
    this.lastTimestamp = timestamp;

    let justTouched = false;
    let justTriggeredOpening = false;

    // Check visible fingers
    const fingers: TrackedFingertip[] = [];
    if (leftFinger && leftFinger.opacity > 0.45) fingers.push(leftFinger);
    if (rightFinger && rightFinger.opacity > 0.45) fingers.push(rightFinger);

    const fingerCount = fingers.length;
    const isAnyPinching = fingers.some((f) => f.isPinching);
    const hasOpenPalm = fingers.some((f) => f.isOpenPalm);

    // Open palm reset in IMMERSIVE mode
    let openPalmProgress = 0;
    if (this.currentState === 'IMMERSIVE' && hasOpenPalm) {
      if (!this.openPalmStartTime) {
        this.openPalmStartTime = timestamp;
      } else {
        const elapsed = (timestamp - this.openPalmStartTime) / 1500;
        openPalmProgress = clamp(elapsed, 0, 1);
        if (elapsed >= 1.0) {
          this.currentState = 'RESETTING';
          this.hasTouchedBeforePull = false;
          this.initialDistance = null;
          this.openPalmStartTime = null;
        }
      }
    } else {
      this.openPalmStartTime = null;
    }

    // In IMMERSIVE or OPENING mode
    if (this.currentState === 'IMMERSIVE' || this.currentState === 'OPENING' || this.currentState === 'RESETTING') {
      const p1 = fingers[0] || { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const p2 = fingers[1] || p1;
      const dist = distanceBetweenPoints(p1, p2);
      const center = midpoint(p1, p2);

      if (this.currentState === 'OPENING') {
        if (!this.openingStartTime) this.openingStartTime = timestamp;
        if (timestamp - this.openingStartTime > 900) {
          this.currentState = 'IMMERSIVE';
          this.openingStartTime = null;
        }
      }

      return {
        state: this.currentState,
        metrics: {
          distance: dist,
          initialDistance: this.initialDistance || dist,
          pullDistance: 0,
          pullProgress: 1.0,
          centerX: center.x,
          centerY: center.y,
          centerPoint: center,
          tension: 0,
          velocity: 0,
          connectionThreshold: config.connectionThreshold,
          requiredPullDistance: config.requiredPullDistance,
          isPinching: isAnyPinching,
          isOpenPalm: hasOpenPalm,
          openPalmProgress,
          swipeDetected: null,
        },
        justTouched: false,
        justTriggeredOpening: false,
      };
    }

    // Zero fingers
    if (fingerCount === 0) {
      this.currentState = 'IDLE';
      this.hasTouchedBeforePull = false;
      this.initialDistance = null;
      return {
        state: 'IDLE',
        metrics: this.createEmptyMetrics(config),
        justTouched: false,
        justTriggeredOpening: false,
      };
    }

    // One finger
    if (fingerCount === 1) {
      this.currentState = 'ONE_HAND';
      this.hasTouchedBeforePull = false;
      this.initialDistance = null;
      const singlePos = { x: fingers[0].x, y: fingers[0].y };
      return {
        state: 'ONE_HAND',
        metrics: {
          distance: 0,
          initialDistance: 0,
          pullDistance: 0,
          pullProgress: 0,
          centerX: singlePos.x,
          centerY: singlePos.y,
          centerPoint: singlePos,
          tension: 0,
          velocity: Math.hypot(fingers[0].vx, fingers[0].vy),
          connectionThreshold: config.connectionThreshold,
          requiredPullDistance: config.requiredPullDistance,
          isPinching: isAnyPinching,
          isOpenPalm: hasOpenPalm,
          openPalmProgress: 0,
          swipeDetected: null,
        },
        justTouched: false,
        justTriggeredOpening: false,
      };
    }

    // Exactly two fingers
    const fA = fingers[0];
    const fB = fingers[1];
    const dist = distanceBetweenPoints(fA, fB);
    const center = midpoint(fA, fB);
    const velocity = calculateVelocity(this.lastMidpoint, center, deltaTime);
    this.lastMidpoint = center;

    const approachThreshold = config.connectionThreshold * 2.5;

    // Evaluate gesture logic
    if (dist <= config.connectionThreshold) {
      // Touch threshold reached!
      if (!this.hasTouchedBeforePull) {
        this.hasTouchedBeforePull = true;
        this.initialDistance = dist;
        this.currentState = 'TOUCH';
        justTouched = true;
      } else {
        this.currentState = 'CONNECTED';
      }

      return {
        state: this.currentState,
        metrics: {
          distance: dist,
          initialDistance: this.initialDistance || dist,
          pullDistance: 0,
          pullProgress: 0,
          centerX: center.x,
          centerY: center.y,
          centerPoint: center,
          tension: 0.1,
          velocity,
          connectionThreshold: config.connectionThreshold,
          requiredPullDistance: config.requiredPullDistance,
          isPinching: isAnyPinching,
          isOpenPalm: false,
          openPalmProgress: 0,
          swipeDetected: null,
        },
        justTouched,
        justTriggeredOpening: false,
      };
    }

    // If user previously touched and is now pulling apart
    if (this.hasTouchedBeforePull) {
      const initDist = this.initialDistance || config.connectionThreshold;
      const pullDist = Math.max(0, dist - initDist);
      const pullProg = clamp(pullDist / config.requiredPullDistance, 0, 1);

      if (pullProg >= 1.0) {
        this.currentState = 'OPENING';
        this.openingStartTime = timestamp;
        justTriggeredOpening = true;
      } else if (pullProg >= 0.9) {
        this.currentState = 'MAX_TENSION';
      } else if (pullProg > 0.05) {
        this.currentState = 'PULLING';
      } else {
        this.currentState = 'CONNECTED';
      }

      return {
        state: this.currentState,
        metrics: {
          distance: dist,
          initialDistance: initDist,
          pullDistance: pullDist,
          pullProgress: pullProg,
          centerX: center.x,
          centerY: center.y,
          centerPoint: center,
          tension: pullProg,
          velocity,
          connectionThreshold: config.connectionThreshold,
          requiredPullDistance: config.requiredPullDistance,
          isPinching: isAnyPinching,
          isOpenPalm: false,
          openPalmProgress: 0,
          swipeDetected: null,
        },
        justTouched: false,
        justTriggeredOpening,
      };
    }

    // Two fingers visible but not yet touched
    if (dist <= approachThreshold) {
      this.currentState = 'APPROACHING';
    } else {
      this.currentState = 'TWO_HANDS';
    }

    return {
      state: this.currentState,
      metrics: {
        distance: dist,
        initialDistance: 0,
        pullDistance: 0,
        pullProgress: 0,
        centerX: center.x,
        centerY: center.y,
        centerPoint: center,
        tension: 0,
        velocity,
        connectionThreshold: config.connectionThreshold,
        requiredPullDistance: config.requiredPullDistance,
        isPinching: isAnyPinching,
        isOpenPalm: false,
        openPalmProgress: 0,
        swipeDetected: null,
      },
      justTouched: false,
      justTriggeredOpening: false,
    };
  }

  public reset() {
    this.currentState = 'IDLE';
    this.initialDistance = null;
    this.hasTouchedBeforePull = false;
    this.openPalmStartTime = null;
    this.openingStartTime = null;
  }

  public getState(): GestureState {
    return this.currentState;
  }

  public setState(state: GestureState) {
    this.currentState = state;
  }

  private createEmptyMetrics(config: GestureEngineConfig): GestureMetrics {
    return {
      distance: 0,
      initialDistance: 0,
      pullDistance: 0,
      pullProgress: 0,
      centerX: 0,
      centerY: 0,
      centerPoint: { x: 0, y: 0 },
      tension: 0,
      velocity: 0,
      connectionThreshold: config.connectionThreshold,
      requiredPullDistance: config.requiredPullDistance,
      isPinching: false,
      isOpenPalm: false,
      openPalmProgress: 0,
      swipeDetected: null,
    };
  }
}

import { useState, useRef, useCallback, useEffect } from 'react';

export interface CameraState {
  isStreaming: boolean;
  isLoading: boolean;
  error: string | null;
  errorDetail: string | null;
  dimensions: { width: number; height: number };
}

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraState, setCameraState] = useState<CameraState>({
    isStreaming: false,
    isLoading: false,
    error: null,
    errorDetail: null,
    dimensions: { width: 0, height: 0 },
  });

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraState((prev) => ({
      ...prev,
      isStreaming: false,
      isLoading: false,
    }));
  }, []);

  const startCamera = useCallback(async () => {
    if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setCameraState((prev) => ({
        ...prev,
        error: 'CAMERA_UNSUPPORTED',
        errorDetail: 'Your browser or device does not support camera access.',
        isLoading: false,
      }));
      return false;
    }

    setCameraState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      errorDetail: null,
    }));

    try {
      // First try standard high resolution
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280, max: 1920 },
            height: { ideal: 720, max: 1080 },
            facingMode: 'user',
            frameRate: { ideal: 60, min: 30 },
          },
          audio: false,
        });
      } catch {
        // Fallback to basic video constraints
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.playsInline = true;
        videoRef.current.muted = true;

        await new Promise<void>((resolve) => {
          if (!videoRef.current) return resolve();
          videoRef.current.onloadedmetadata = () => {
            if (videoRef.current) {
              videoRef.current.play().then(() => resolve()).catch(() => resolve());
            } else {
              resolve();
            }
          };
        });

        const videoW = videoRef.current.videoWidth || 1280;
        const videoH = videoRef.current.videoHeight || 720;

        setCameraState({
          isStreaming: true,
          isLoading: false,
          error: null,
          errorDetail: null,
          dimensions: { width: videoW, height: videoH },
        });

        return true;
      }

      return false;
    } catch (err: unknown) {
      console.error('Camera access error:', err);
      let errorType = 'CAMERA_ERROR';
      let errorDesc = 'Unable to access the camera.';

      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          errorType = 'CAMERA_PERMISSION_DENIED';
          errorDesc = 'Please allow camera permissions in your browser to interact.';
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          errorType = 'CAMERA_NOT_FOUND';
          errorDesc = 'No webcam was detected on your device.';
        } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
          errorType = 'CAMERA_IN_USE';
          errorDesc = 'Camera is in use by another application or tab.';
        }
      }

      setCameraState({
        isStreaming: false,
        isLoading: false,
        error: errorType,
        errorDetail: errorDesc,
        dimensions: { width: 0, height: 0 },
      });
      return false;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    videoRef,
    cameraState,
    startCamera,
    stopCamera,
  };
}

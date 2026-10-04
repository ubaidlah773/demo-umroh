'use client';

import React from 'react';
import { TrackedFingertip } from '@/types/tracking';

interface HandTrackerProps {
  handCount: number;
  fingertips: TrackedFingertip[];
  isTracking: boolean;
}

export default function HandTracker({
  handCount,
  isTracking,
}: HandTrackerProps) {
  return null; // Logic is driven through refs and WebRTC in useHandTracking
}

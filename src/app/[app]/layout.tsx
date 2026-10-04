// src/app/[app]/layout.tsx
'use client';

import { ProgressProvider } from '@/context/ProgressContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <ProgressProvider>{children}</ProgressProvider>;
}

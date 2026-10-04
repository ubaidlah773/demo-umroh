'use client';

import React from 'react';
import { useProgress } from '@/context/ProgressContext';
import { Check, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useProgress();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-xs w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-2.5 p-3 rounded-[6px] border border-[#E5E7EB] bg-white shadow-md text-xs transition-opacity duration-200"
        >
          <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold text-[#171717] block">{toast.title}</span>
            <p className="text-[#6B7280] text-[11px] mt-0.5 leading-relaxed">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-0.5 text-[#9CA3AF] hover:text-[#171717]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

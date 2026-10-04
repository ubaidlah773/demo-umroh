'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { SHORTCUTS_DATA } from '@/data/shortcuts';
import { ShortcutItem } from '@/types';
import { CheckCircle2, RotateCcw, Zap, Trophy, HelpCircle } from 'lucide-react';

export default function ShortcutTrainer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [selectedApp, setSelectedApp] = useState<'all' | 'word' | 'excel' | 'powerpoint'>('all');

  const filteredShortcuts = SHORTCUTS_DATA.filter(
    (s) => selectedApp === 'all' || s.app === selectedApp || s.app === 'all'
  );

  const currentItem: ShortcutItem = filteredShortcuts[currentIndex % filteredShortcuts.length] || SHORTCUTS_DATA[0];

  const handleNext = useCallback(() => {
    setStatus('idle');
    setPressedKeys([]);
    setShowHint(false);
    setCurrentIndex((prev) => (prev + 1) % filteredShortcuts.length);
  }, [filteredShortcuts.length]);

  const verifyKeys = useCallback(
    (keys: string[]) => {
      const normalizedTarget = currentItem.keys.map((k) => k.toLowerCase());
      const normalizedPressed = keys.map((k) => k.toLowerCase());

      const isMatch =
        normalizedTarget.length === normalizedPressed.length &&
        normalizedTarget.every((k) => normalizedPressed.includes(k));

      if (isMatch) {
        setStatus('correct');
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > bestStreak) setBestStreak(newStreak);
        setTimeout(handleNext, 1200);
      } else {
        setStatus('wrong');
        setStreak(0);
      }
    },
    [currentItem.keys, streak, bestStreak, handleNext]
  );

  // Physical keyboard event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid interfering with browser shortcuts if focused on form elements
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const keys: string[] = [];
      if (e.ctrlKey) keys.push('Ctrl');
      if (e.shiftKey) keys.push('Shift');
      if (e.altKey) keys.push('Alt');

      // Key name cleanup
      let k = e.key;
      if (k === 'Control' || k === 'Shift' || k === 'Alt') return;
      if (k === ' ') k = 'Space';
      if (k.length === 1) k = k.toUpperCase();

      if (!keys.includes(k)) {
        keys.push(k);
      }

      setPressedKeys(keys);

      if (keys.length > 0) {
        e.preventDefault();
        verifyKeys(keys);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [verifyKeys]);

  // Click on on-screen simulated button
  const handleSimulatedKey = (key: string) => {
    let nextKeys = [...pressedKeys];
    if (nextKeys.includes(key)) {
      nextKeys = nextKeys.filter((k) => k !== key);
    } else {
      nextKeys.push(key);
    }
    setPressedKeys(nextKeys);
    if (nextKeys.length === currentItem.keys.length) {
      verifyKeys(nextKeys);
    }
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#F3F4F6] rounded text-[#171717]">
              <Zap className="w-4 h-4 text-[#EA580C]" />
            </span>
            <h3 className="font-bold text-lg text-[#171717]">Interactive Shortcut Trainer</h3>
          </div>
          <p className="text-xs text-[#6B7280] mt-1">
            Latih refleks memori otot jari Anda. Tekan langsung tombol pada keyboard fisik Anda!
          </p>
        </div>

        {/* Filter App */}
        <div className="flex items-center gap-1.5 text-xs">
          {(['all', 'excel', 'word', 'powerpoint'] as const).map((app) => (
            <button
              key={app}
              onClick={() => {
                setSelectedApp(app);
                setCurrentIndex(0);
                setStatus('idle');
                setPressedKeys([]);
              }}
              className={`px-2.5 py-1 rounded capitalize border transition-colors ${
                selectedApp === app
                  ? 'bg-[#171717] text-white border-[#171717]'
                  : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:text-[#171717]'
              }`}
            >
              {app === 'all' ? 'Semua' : app}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Counter */}
      <div className="flex items-center justify-between text-xs text-[#6B7280]">
        <div className="flex items-center gap-4">
          <span className="font-mono">
            Soal: <strong className="text-[#171717]">{(currentIndex % filteredShortcuts.length) + 1}</strong> / {filteredShortcuts.length}
          </span>
          <span className="flex items-center gap-1 text-[#16A34A] font-semibold">
            <Zap className="w-3.5 h-3.5" /> Streak: {streak}
          </span>
          <span className="flex items-center gap-1 text-[#4F46E5] font-semibold">
            <Trophy className="w-3.5 h-3.5" /> Rekor: {bestStreak}
          </span>
        </div>
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1 text-[#2563EB] hover:underline"
        >
          <HelpCircle className="w-3.5 h-3.5" /> {showHint ? 'Tutup Petunjuk' : 'Buka Kunci Jawaban'}
        </button>
      </div>

      {/* Challenge Card */}
      <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-[6px] p-6 text-center space-y-4">
        <span className="inline-block px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider bg-white border border-[#E5E7EB] rounded text-[#6B7280]">
          {currentItem.app.toUpperCase()} · {currentItem.category}
        </span>
        <h4 className="text-xl sm:text-2xl font-bold text-[#171717]">
          {currentItem.action}
        </h4>
        {currentItem.description && (
          <p className="text-xs text-[#6B7280] max-w-md mx-auto">
            {currentItem.description}
          </p>
        )}

        {/* Target Keys / Hint */}
        {showHint ? (
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="text-xs text-[#6B7280]">Kunci jawaban:</span>
            {currentItem.keys.map((k, i) => (
              <kbd
                key={i}
                className="px-2.5 py-1 text-xs font-mono font-semibold bg-white border border-[#CBD5E1] rounded shadow-sm text-[#171717]"
              >
                {k}
              </kbd>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#9CA3AF]">
            Tekan kombinasi tombol pada keyboard sekarang...
          </p>
        )}

        {/* Pressed Keys Preview */}
        <div className="flex items-center justify-center gap-2 min-h-[44px]">
          {pressedKeys.length === 0 ? (
            <span className="text-xs italic text-[#9CA3AF]">Menunggu input tombol keyboard...</span>
          ) : (
            pressedKeys.map((k, i) => (
              <kbd
                key={i}
                className={`px-3 py-1.5 text-sm font-mono font-bold rounded border shadow-sm transition-all ${
                  status === 'correct'
                    ? 'bg-[#DCFCE7] text-[#16A34A] border-[#86EFAC]'
                    : status === 'wrong'
                    ? 'bg-[#FEE2E2] text-[#DC2626] border-[#FCA5A5]'
                    : 'bg-[#171717] text-white border-[#171717]'
                }`}
              >
                {k}
              </kbd>
            ))
          )}
        </div>

        {/* Feedback Message */}
        {status === 'correct' && (
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#16A34A] font-semibold animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4" /> Benar sekali! Memuat soal berikutnya...
          </div>
        )}
        {status === 'wrong' && (
          <div className="text-xs text-[#DC2626] font-medium space-y-1">
            <p>Kombinasi belum tepat. Coba lagi atau buka kunci jawaban di atas.</p>
            <button
              onClick={() => {
                setPressedKeys([]);
                setStatus('idle');
              }}
              className="text-xs underline text-[#6B7280] hover:text-[#171717]"
            >
              Reset Tombol
            </button>
          </div>
        )}
      </div>

      {/* Virtual Clickable Keypad for Touch / Mouse Users */}
      <div className="space-y-2 pt-2 border-t border-[#E5E7EB]">
        <div className="text-[11px] text-[#6B7280]">
          Tidak menggunakan keyboard fisik? Klik tombol di bawah ini:
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {['Ctrl', 'Shift', 'Alt', 'F2', 'F4', 'F5', 'Enter', 'Esc', 'C', 'V', 'Z', 'S', 'P', 'T', 'E', 'J'].map((k) => (
            <button
              key={k}
              onClick={() => handleSimulatedKey(k)}
              className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                pressedKeys.includes(k)
                  ? 'bg-[#171717] text-white border-[#171717]'
                  : 'bg-white text-[#374151] border-[#E5E7EB] hover:bg-[#F9FAFB]'
              }`}
            >
              {k}
            </button>
          ))}
          <button
            onClick={() => {
              setPressedKeys([]);
              setStatus('idle');
            }}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-[#6B7280] hover:text-[#171717] border border-[#E5E7EB] rounded ml-auto"
          >
            <RotateCcw className="w-3 h-3" /> Bersihkan
          </button>
        </div>
      </div>
    </div>
  );
}

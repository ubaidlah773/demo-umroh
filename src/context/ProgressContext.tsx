'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { AppType, LevelType, ProgressState, LastActiveLesson } from '@/types';
import { getTotalLessonCount } from '@/data/curriculum';

const STORAGE_KEY = 'officemaster_progress_v1';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'achievement';
  title: string;
  message: string;
}

interface ProgressContextType {
  state: ProgressState;
  isHydrated: boolean;
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  isLessonCompleted: (id: string) => boolean;
  markLessonCompleted: (id: string) => void;
  toggleLessonCompleted: (id: string) => void;
  saveQuizScore: (lessonId: string, score: number) => void;
  recordDownload: (filename: string) => void;
  setLastActive: (app: AppType, level: LevelType, slug: string, title: string) => void;
  getAppProgress: (app: AppType) => { completed: number; total: number; percentage: number };
  getOverallProgress: () => { completed: number; total: number; percentage: number };
  isAchievementUnlocked: (id: string) => boolean;
  recordChallengeCompleted: (challengeId: string) => void;
  recordExamScore: (score: number, rank: string) => void;
  resetProgress: () => void;
}

const defaultState: ProgressState = {
  completedLessons: [],
  quizScores: {},
  downloadedFiles: [],
  lastActiveLesson: {
    app: 'excel',
    level: 'beginner',
    slug: 'sum',
    title: 'SUM Function',
    timestamp: Date.now(),
  },
  achievements: [],
  completedChallenges: [],
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(defaultState);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState((prev) => ({
          ...prev,
          ...parsed,
          lastActiveLesson: parsed.lastActiveLesson || prev.lastActiveLesson,
        }));
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [state, isHydrated]);

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const checkAchievements = (newState: ProgressState) => {
    const newUnlocked = [...newState.achievements];
    let justUnlockedBadge = false;

    // First Lesson
    if (newState.completedLessons.length >= 1 && !newUnlocked.includes('first-lesson')) {
      newUnlocked.push('first-lesson');
      justUnlockedBadge = true;
      showToast({
        type: 'achievement',
        title: 'Achievement Unlocked',
        message: 'Menyelesaikan modul pertama.',
      });
    }

    // Excel Explorer
    const excelCount = newState.completedLessons.filter((id) => id.startsWith('excel-')).length;
    if (excelCount >= 10 && !newUnlocked.includes('excel-explorer')) {
      newUnlocked.push('excel-explorer');
      justUnlockedBadge = true;
      showToast({
        type: 'achievement',
        title: 'Achievement Unlocked',
        message: 'Menyelesaikan 10 modul Excel.',
      });
    }

    // Word Beginner
    const wordBegCount = newState.completedLessons.filter((id) => id.startsWith('word-beginner-')).length;
    if (wordBegCount >= 10 && !newUnlocked.includes('word-beginner')) {
      newUnlocked.push('word-beginner');
      justUnlockedBadge = true;
      showToast({
        type: 'achievement',
        title: 'Achievement Unlocked',
        message: 'Menyelesaikan Word Beginner.',
      });
    }

    // Quiz Champion
    const perfectScores = Object.values(newState.quizScores).filter((s) => s === 100).length;
    if (perfectScores >= 1 && !newUnlocked.includes('quiz-champion')) {
      newUnlocked.push('quiz-champion');
      justUnlockedBadge = true;
      showToast({
        type: 'achievement',
        title: 'Achievement Unlocked',
        message: 'Skor sempurna 100 pada kuis.',
      });
    }

    if (justUnlockedBadge) {
      setState((prev) => ({ ...prev, achievements: newUnlocked }));
    }
  };

  const isLessonCompleted = (id: string) => state.completedLessons.includes(id);

  const markLessonCompleted = (id: string) => {
    if (state.completedLessons.includes(id)) return;
    const updated = [...state.completedLessons, id];
    const newState = { ...state, completedLessons: updated };
    setState(newState);
    showToast({
      type: 'success',
      title: 'Modul Selesai',
      message: 'Progres Anda berhasil dicatat.',
    });
    checkAchievements(newState);
  };

  const toggleLessonCompleted = (id: string) => {
    if (state.completedLessons.includes(id)) {
      const updated = state.completedLessons.filter((l) => l !== id);
      setState((prev) => ({ ...prev, completedLessons: updated }));
      showToast({
        type: 'info',
        title: 'Status Diperbarui',
        message: 'Tanda selesai telah dihapus.',
      });
    } else {
      markLessonCompleted(id);
    }
  };

  const saveQuizScore = (lessonId: string, score: number) => {
    setState((prev) => {
      const updated = { ...prev.quizScores, [lessonId]: score };
      const next = { ...prev, quizScores: updated };
      checkAchievements(next);
      return next;
    });
    if (score === 100) {
      showToast({
        type: 'success',
        title: 'Kuis Selesai',
        message: 'Skor 100 / 100.',
      });
    }
  };

  const recordDownload = (filename: string) => {
    if (!state.downloadedFiles.includes(filename)) {
      setState((prev) => {
        const next = { ...prev, downloadedFiles: [...prev.downloadedFiles, filename] };
        checkAchievements(next);
        return next;
      });
    }
    showToast({
      type: 'info',
      title: 'Unduhan Dimulai',
      message: `Mengunduh berkas ${filename}.`,
    });
  };

  const setLastActive = (app: AppType, level: LevelType, slug: string, title: string) => {
    const lastActive: LastActiveLesson = {
      app,
      level,
      slug,
      title,
      timestamp: Date.now(),
    };
    setState((prev) => ({ ...prev, lastActiveLesson: lastActive }));
  };

  const totalCounts = useMemo(() => getTotalLessonCount(), []);

  const getAppProgress = (app: AppType) => {
    const completed = state.completedLessons.filter((id) => id.startsWith(`${app}-`)).length;
    const total = totalCounts[app];
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  };

  const getOverallProgress = () => {
    const completed = state.completedLessons.length;
    const total = totalCounts.total;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  };

  const isAchievementUnlocked = (id: string) => state.achievements.includes(id);

  const recordChallengeCompleted = (challengeId: string) => {
    const list = state.completedChallenges || [];
    if (!list.includes(challengeId)) {
      const updated = [...list, challengeId];
      setState((prev) => ({ ...prev, completedChallenges: updated }));
      showToast({
        type: 'success',
        title: 'Challenge Selesai! ⭐',
        message: 'Tantangan formula berhasil diselesaikan.',
      });
    }
  };

  const recordExamScore = (score: number, rank: string) => {
    const examScore = { score, date: new Date().toLocaleDateString('id-ID'), rank };
    setState((prev) => ({ ...prev, examScore }));
    showToast({
      type: 'achievement',
      title: 'Ujian Sertifikasi Selesai!',
      message: `Skor Anda: ${score}/100 — Predikat: ${rank}`,
    });
  };

  const resetProgress = () => {
    setState(defaultState);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    showToast({
      type: 'info',
      title: 'Data Direset',
      message: 'Progres belajar telah dikembalikan ke awal.',
    });
  };

  return (
    <ProgressContext.Provider
      value={{
        state,
        isHydrated,
        toasts,
        showToast,
        removeToast,
        isLessonCompleted,
        markLessonCompleted,
        toggleLessonCompleted,
        saveQuizScore,
        recordDownload,
        setLastActive,
        getAppProgress,
        getOverallProgress,
        isAchievementUnlocked,
        recordChallengeCompleted,
        recordExamScore,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}

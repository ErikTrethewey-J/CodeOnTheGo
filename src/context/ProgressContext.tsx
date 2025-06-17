import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ProgressContextType {
  completedLessons: string[];
  markLessonComplete: (lessonId: string) => void;
  isLessonComplete: (lessonId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const PROGRESS_KEY = 'codeOnTheGoProgress';

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Load progress from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (stored) {
      try {
        setCompletedLessons(JSON.parse(stored));
      } catch {
        setCompletedLessons([]);
      }
    }
  }, []);

  // Save progress to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(completedLessons));
  }, [completedLessons]);

  const markLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonId) ? prev : [...prev, lessonId]
    );
  };

  const isLessonComplete = (lessonId: string) => completedLessons.includes(lessonId);

  return (
    <ProgressContext.Provider value={{ completedLessons, markLessonComplete, isLessonComplete }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}; 
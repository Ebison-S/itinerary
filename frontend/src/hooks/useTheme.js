import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'waypoint_theme'; // 'light' | 'dark'

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

/**
 * Light/dark theme toggle, persisted to localStorage. The actual class
 * swap on <html> is also applied synchronously in index.html's inline
 * script (before React hydrates) to avoid a flash of the wrong theme on
 * load -- this hook keeps that in sync with in-app toggling afterward.
 */
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}
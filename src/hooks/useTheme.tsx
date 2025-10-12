import { useState } from 'react';
import { Theme } from '../types/types';

export default function useTheme(): [theme: Theme, toggleTheme: () => void] {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return [theme, toggleTheme];
}

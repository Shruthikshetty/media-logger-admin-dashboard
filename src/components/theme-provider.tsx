import React, { useEffect } from 'react';
import { useThemeStore } from '~/state-management/theme-store';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeStore();

  //set the them when ever theme change
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  return <div className="h-full w-full items-center">{children}</div>;
};

export default ThemeProvider;

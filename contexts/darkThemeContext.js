import { createContext, useEffect, useState } from 'react';

export const DarkThemeContext = createContext();

export const DarkThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(darkTheme ? 'light' : 'dark');
    root.classList.add(darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  return (
    <DarkThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </DarkThemeContext.Provider>
  );
};

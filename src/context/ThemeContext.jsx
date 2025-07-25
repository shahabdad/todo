import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize theme based on localStorage value or default to "dark"
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Save the theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // useEffect(() => {
  //   // Optional: Set initial theme based on system preference if no theme is in localStorage
  //   if (!localStorage.getItem("theme")) {
  //     const userPref = window.matchMedia('(prefers-color-scheme: dark)').matches;
  //     setTheme(userPref ? "dark" : "light");
  //   }
  // }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

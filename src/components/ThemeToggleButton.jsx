import { useEffect, useState } from "react";

export default function ThemeToggleButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Verifica si ya hay preferencia en el almacenamiento local
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      // Si no, revisa el modo del sistema
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    // Actualiza el tema en el body y guarda la preferencia
    const theme = isDarkMode ? "dark" : "light";
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", theme);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 bg-accent text-white p-3 rounded-full transition-colors duration-300 z-30"
    >
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  );
}

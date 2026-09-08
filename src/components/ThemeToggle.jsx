import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme, currentTheme } from "@/lib/theme";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(currentTheme());
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground transition-opacity hover:opacity-60"
    >
      {theme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  );
};

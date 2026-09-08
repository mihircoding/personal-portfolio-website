const STORAGE_KEY = "theme";

export function getStoredTheme() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {
    /* private mode / blocked storage — fall through to system preference */
  }
  return null;
}

export function systemTheme() {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function currentTheme() {
  return getStoredTheme() ?? systemTheme();
}

export function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* not fatal — the class is already applied for this page view */
  }
}

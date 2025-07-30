import { create } from "zustand";

type ThemeMode = "light" | "dark";

export interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const LOCALSTORAGE_KEY = "ThemeMode";
const storageTheme = window.localStorage.getItem(LOCALSTORAGE_KEY);
const switchMode = (mode: ThemeMode) => {
  const body = document.body;
  if (body.hasAttribute("theme-mode")) {
    if (mode == "light") body.removeAttribute("theme-mode");
  } else {
    if (mode == "dark") body.setAttribute("theme-mode", "dark");
  }
};

if (
  storageTheme != null &&
  (storageTheme == "dark" || storageTheme == "light")
) {
  switchMode(storageTheme);
}

export const useThemeState = create<ThemeState>((set) => ({
  mode:
    storageTheme == "dark" || storageTheme == "light" ? storageTheme : "light",
  setMode: (mode) => {
    window.localStorage.setItem(LOCALSTORAGE_KEY, mode);
    switchMode(mode);
    set({ mode: mode });
  },
}));

"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type Theme = "dark" | "light";
type Ctx = { theme: Theme; toggle: () => void };

const ThemeCtx = createContext<Ctx>({ theme: "light", toggle: () => {} });
export const useTheme = () => useContext(ThemeCtx);

/*
 * Keep in step with the 380ms in the .theme-transition rule in globals.css.
 * The class comes off slightly after the paint finishes so the last frame is
 * never cut short.
 */
const CROSSFADE_MS = 380;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as Theme) || "light";
    setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  /*
   * The crossfade class is added here rather than in the effect above so that
   * it only ever covers a deliberate toggle. The effect also runs once on
   * mount, when the stored theme is applied, and animating that would mean
   * every visitor who prefers dark watches the site fade in from light.
   */
  const toggle = () => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduced) {
      root.classList.add("theme-transition");
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        root.classList.remove("theme-transition");
      }, CROSSFADE_MS + 40);
    }

    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}

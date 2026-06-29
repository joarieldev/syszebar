import { createStore } from "solid-js/store";

const THEME_KEY = "syszebar-theme";
const TRANSPARENT_KEY = "syszebar-transparent";
const ALPHA_KEY = "syszebar-alpha";

const storedTheme = localStorage.getItem(THEME_KEY);
const initialMode: "dark" | "light" =
  storedTheme === "dark" || storedTheme === "light" ? storedTheme : "dark";

const storedTransparent = localStorage.getItem(TRANSPARENT_KEY);
const initialTransparent =
  storedTransparent === "false" ? false : true;

const storedAlpha = localStorage.getItem(ALPHA_KEY);
const initialAlpha = Number(storedAlpha) || 0.60;

export const [theme, setTheme] = createStore<{
  mode: "dark" | "light";
  transparent: boolean;
  alpha: number;
}>({ mode: initialMode, transparent: initialTransparent, alpha: initialAlpha });

export function toggleTheme() {
  const next = theme.mode === "dark" ? "light" : "dark";
  setTheme("mode", next);
  localStorage.setItem(THEME_KEY, next);
}

export function toggleTransparent() {
  const next = !theme.transparent;
  setTheme("transparent", next);
  localStorage.setItem(TRANSPARENT_KEY, String(next));
}

export function setAlpha(value: number) {
  setTheme("alpha", value);
  localStorage.setItem(ALPHA_KEY, String(value));
}

window.addEventListener("storage", (e) => {
  if (e.key === THEME_KEY && (e.newValue === "dark" || e.newValue === "light")) {
    setTheme("mode", e.newValue);
  }
  if (e.key === TRANSPARENT_KEY && (e.newValue === "true" || e.newValue === "false")) {
    setTheme("transparent", e.newValue === "true");
  }
  if (e.key === ALPHA_KEY) {
    setTheme("alpha", Number(e.newValue) || 0.85);
  }
});

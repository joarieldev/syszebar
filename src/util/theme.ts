import { createStore } from "solid-js/store";
import { oklch, parse } from "culori";

const THEME_KEY = "syszebar-theme";
const TRANSPARENT_KEY = "syszebar-transparent";
const ALPHA_KEY = "syszebar-alpha";
const CUSTOM_COLOR_KEY = "syszebar-custom-color";

const storedTheme = localStorage.getItem(THEME_KEY);
const initialMode: "dark" | "light" | "custom" =
  storedTheme === "dark" || storedTheme === "light" || storedTheme === "custom"
    ? storedTheme
    : "dark";

const storedTransparent = localStorage.getItem(TRANSPARENT_KEY);
const initialTransparent = storedTransparent === "false" ? false : true;

const storedAlpha = localStorage.getItem(ALPHA_KEY);
const initialAlpha = Number(storedAlpha) || 0.6;

const storedCustomColor = localStorage.getItem(CUSTOM_COLOR_KEY) || "#5622a5";

export const [theme, setTheme] = createStore<{
  mode: "dark" | "light" | "custom";
  transparent: boolean;
  alpha: number;
  customColor: string;
}>({
  mode: initialMode,
  transparent: initialTransparent,
  alpha: initialAlpha,
  customColor: storedCustomColor,
});

export function setMode(mode: "dark" | "light" | "custom") {
  setTheme("mode", mode);
  localStorage.setItem(THEME_KEY, mode);
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

export function setCustomColor(hex: string) {
  setTheme("customColor", hex);
  localStorage.setItem(CUSTOM_COLOR_KEY, hex);
}

export function hexToOklch(hex: string) {
  const parsed = parse(hex);
  if (!parsed) return null;
  const color = oklch(parsed);
  if (!color) return null;
  return { l: color.l ?? 0, c: color.c ?? 0, h: color.h ?? 0 };
}

export function applyTheme(state: typeof theme) {
  const root = document.documentElement;
  root.dataset.theme = state.mode;
  root.dataset.transparent = String(state.transparent);

  if (state.transparent) {
    root.style.setProperty("--surface-alpha", String(state.alpha));
  } else {
    root.style.removeProperty("--surface-alpha");
  }

  if (state.mode === "custom") {
    applyCustomVars(root, state.customColor);
  } else {
    clearCustomVars(root);
  }
}

function applyCustomVars(root: HTMLElement, hex: string) {
  const parsed = hexToOklch(hex);
  if (!parsed) return;
  root.style.setProperty("--custom-surface-l", `${parsed.l * 100}%`);
  root.style.setProperty("--custom-surface-c", String(parsed.c));
  root.style.setProperty("--custom-surface-h", String(parsed.h ?? 0));

  const lineL = Math.max(15, Math.min(85, (1 - parsed.l) * 100));
  root.style.setProperty("--custom-line-l", `${lineL}%`);
  root.style.setProperty("--custom-line-c", String(parsed.c));
  root.style.setProperty("--custom-line-h", String(parsed.h ?? 0));
}

function clearCustomVars(root: HTMLElement) {
  for (const key of ["surface", "line"] as const) {
    root.style.removeProperty(`--custom-${key}-l`);
    root.style.removeProperty(`--custom-${key}-c`);
    root.style.removeProperty(`--custom-${key}-h`);
  }
}

export function startStorageSyncTheme() {
  const handler = (e: StorageEvent) => {
    if (e.key === THEME_KEY && typeof e.newValue === "string") {
      setTheme("mode", e.newValue as "dark" | "light" | "custom");
    }
    if (e.key === TRANSPARENT_KEY && (e.newValue === "true" || e.newValue === "false")) {
      setTheme("transparent", e.newValue === "true");
    }
    if (e.key === ALPHA_KEY) {
      setTheme("alpha", Number(e.newValue) || 0.85);
    }
    if (e.key === CUSTOM_COLOR_KEY && typeof e.newValue === "string") {
      setTheme("customColor", e.newValue);
    }
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

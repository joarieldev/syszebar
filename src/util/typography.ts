import { createStore } from "solid-js/store";
import { hexToOklch } from "./theme";

export interface TypographyState {
  fontSize: number;
  iconSize: number;
  fontFamily: string;
  textColor: string;
}

const STORAGE_KEY = "syszebar-typography";

export const FALLBACK_FONTS: { family: string }[] = [
  { family: "system-ui" },
  { family: "sans-serif" },
  { family: "serif" },
  { family: "monospace" },
  { family: "Inter" },
  { family: "Victor Mono" },
  { family: "JetBrains Mono" },
  { family: "Caveat" },
  { family: "Opendyslexic" },
  { family: "Orbitron" },
  { family: "Oswald" },
  { family: "Press Start 2P" },
  { family: "Source Code Pro" },
  { family: "Space Mono" },
  { family: "VT323" },
];

const DEFAULTS: TypographyState = {
  fontSize: 14,
  iconSize: 16,
  fontFamily: "system-ui, sans-serif",
  textColor: "",
};

function load(): TypographyState {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return { ...DEFAULTS };
  try {
    return { ...DEFAULTS, ...JSON.parse(stored) };
  } catch {
    return { ...DEFAULTS };
  }
}

export const [typography, setTypography] = createStore<TypographyState>(load());

function persist(changes: Partial<TypographyState>) {
  const raw = localStorage.getItem(STORAGE_KEY);
  const prev = raw ? JSON.parse(raw) : {};
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...DEFAULTS, ...prev, ...changes }));
}

export function saveFontSize(px: number) {
  setTypography("fontSize", px);
  persist({ fontSize: px });
}

export function saveIconSize(px: number) {
  setTypography("iconSize", px);
  persist({ iconSize: px });
}

export function saveFontFamily(family: string) {
  setTypography("fontFamily", family);
  persist({ fontFamily: family });
}

export function saveTextColor(hex: string) {
  setTypography("textColor", hex);
  persist({ textColor: hex });
}

export function resetTextColor() {
  setTypography("textColor", "");
  persist({ textColor: "" });
}

function deriveMuted(l: number, c: number, h: number) {
  const targetL = 0.5;
  return {
    l: Math.max(0, Math.min(1, l + (targetL - l) * 0.4)),
    c: c * 0.3,
    h,
  };
}

export function applyTypography(state: TypographyState) {
  const root = document.documentElement;
  root.style.setProperty("--text-font-size", `${state.fontSize}px`);
  root.style.setProperty("--text-font-family", state.fontFamily);
  root.style.setProperty("--text-icon-size", `${state.iconSize}px`);
  if (state.textColor) {
    const parsed = hexToOklch(state.textColor);
    root.style.setProperty("--color-content", state.textColor);
    if (parsed) {
      const muted = deriveMuted(parsed.l, parsed.c, parsed.h);
      root.style.setProperty("--color-muted", `oklch(${muted.l * 100}% ${muted.c} ${muted.h})`);
    } else {
      root.style.removeProperty("--color-muted");
    }
  } else {
    root.style.removeProperty("--color-content");
    root.style.removeProperty("--color-muted");
  }
}

export function startStorageSyncTypography() {
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY && typeof e.newValue === "string") {
      const parsed = JSON.parse(e.newValue);
      setTypography({ ...DEFAULTS, ...parsed });
    }
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

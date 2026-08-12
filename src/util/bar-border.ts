import { createStore } from "solid-js/store";
import type { BarStyle } from "./bar-style";
import { barStyle } from "./bar-style";

export interface BarBorder {
  radius: number;
  width: number;
}

export const BORDER_LIMITS = {
  radius: 32,
  width: 5,
};

const STORAGE_KEY = "syszebar-bar-borders";

const DEFAULTS: BarBorder = { radius: 8, width: 1 };
const DEFAULTS_FULL: BarBorder = { radius: 0, width: 1 };

function makeDefaults(): Record<BarStyle, BarBorder> {
  return {
    default: { ...DEFAULTS },
    full: { ...DEFAULTS_FULL },
    modular: { ...DEFAULTS },
  };
}

function load(): Record<BarStyle, BarBorder> {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return makeDefaults();
  try {
    const parsed = JSON.parse(stored);
    const defaults = makeDefaults();
    for (const key of Object.keys(defaults) as BarStyle[]) {
      defaults[key] = { ...defaults[key], ...parsed[key] };
    }
    return defaults;
  } catch {
    return makeDefaults();
  }
}

export const [barBorders, setBarBorders] = createStore<Record<BarStyle, BarBorder>>(load());

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(barBorders));
}

export function saveBarBorder(key: "radius" | "width", px: number) {
  const value = Math.min(Math.max(0, px), BORDER_LIMITS[key]);
  setBarBorders(barStyle.value, key, value);
  persist();
}

export function resetBarBorders() {
  const defaults = makeDefaults();
  setBarBorders(barStyle.value, { ...defaults[barStyle.value] });
  persist();
}

export function startStorageSyncBarBorder() {
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY && typeof e.newValue === "string") {
      const parsed = JSON.parse(e.newValue);
      const defaults = makeDefaults();
      for (const key of Object.keys(defaults) as BarStyle[]) {
        defaults[key] = { ...defaults[key], ...parsed[key] };
      }
      setBarBorders(defaults);
    }
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

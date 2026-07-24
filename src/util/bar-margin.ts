import { createStore } from "solid-js/store";
import type { BarStyle } from "./bar-style";
import { barStyle } from "./bar-style";

export interface BarMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const STORAGE_KEY = "syszebar-bar-margins";

const DEFAULTS: BarMargin = { top: 10, right: 10, bottom: 0, left: 10 };
const DEFAULTS_FULL: BarMargin = { top: 0, right: 0, bottom: 0, left: 0 };

function makeDefaults(): Record<BarStyle, BarMargin> {
  return {
    default: { ...DEFAULTS },
    full: { ...DEFAULTS_FULL },
    modular: { ...DEFAULTS },
  };
}

function load(): Record<BarStyle, BarMargin> {
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

export const [barMargins, setBarMargins] = createStore<Record<BarStyle, BarMargin>>(load());

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(barMargins));
}

export function saveBarMargin(side: keyof BarMargin, px: number) {
  setBarMargins(barStyle.value, side, px);
  persist();
}

export function resetBarMargins() {
  const defaults = makeDefaults();
  setBarMargins(barStyle.value, { ...defaults[barStyle.value] });
  persist();
}

export function startStorageSyncBarMargin() {
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY && typeof e.newValue === "string") {
      const parsed = JSON.parse(e.newValue);
      const defaults = makeDefaults();
      for (const key of Object.keys(defaults) as BarStyle[]) {
        defaults[key] = { ...defaults[key], ...parsed[key] };
      }
      setBarMargins(defaults);
    }
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

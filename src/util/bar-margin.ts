import { createStore } from "solid-js/store";
import type { BarStyle } from "./bar-style";
import { barStyle } from "./bar-style";

export interface BarMargin {
  top: number;
  bottom: number;
  x: number;
  compactX: boolean;
}

export const LIMITS = {
  top: 30,
  bottom: 30,
  x: 100,
  height: 40,
};

const STORAGE_KEY = "syszebar-bar-margins";

const DEFAULTS: BarMargin = { top: 10, bottom: 0, x: 10, compactX: false };
const DEFAULTS_FULL: BarMargin = { top: 0, bottom: 0, x: 0, compactX: false, };

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

export function saveBarMargin(side: "top" | "bottom" | "x", px: number) {
  const prev = barMargins[barStyle.value];
  const value = Math.min(Math.max(0, px), LIMITS[side]);
  const next = { ...prev, [side]: value };
  // clamp vertical margins
  if (side === "top" || side === "bottom") {
    const other = side === "top" ? "bottom" : "top";
    const overflow = next.top + next.bottom - LIMITS.height;
    if (overflow > 0) {
      next[other] = Math.max(0, next[other] - overflow);
    }
  }

  setBarMargins(barStyle.value, next);
  persist();
}

export function saveBarCompactX(isCompact: boolean) {
  setBarMargins(barStyle.value, "compactX", isCompact);
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

import { createStore } from "solid-js/store";

export interface BarMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const STORAGE_KEY = "syszebar-bar-margin";

const DEFAULTS: BarMargin = { top: 10, right: 10, bottom: 0, left: 10 };

function load(): BarMargin {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return { ...DEFAULTS };
  try {
    return { ...DEFAULTS, ...JSON.parse(stored) };
  } catch {
    return { ...DEFAULTS };
  }
}

export const [barMargin, setBarMargin] = createStore<BarMargin>(load());

function persist(changes: Partial<BarMargin>) {
  const raw = localStorage.getItem(STORAGE_KEY);
  const prev = raw ? JSON.parse(raw) : {};
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...DEFAULTS, ...prev, ...changes }));
}

export function setMargin(side: keyof BarMargin, px: number) {
  setBarMargin(side, px);
  persist({ [side]: px });
}

export function resetMargins() {
  setBarMargin({ ...DEFAULTS });
  persist(DEFAULTS);
}

export function startStorageSyncBarMargin() {
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY && typeof e.newValue === "string") {
      const parsed = JSON.parse(e.newValue);
      setBarMargin({ ...DEFAULTS, ...parsed });
    }
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

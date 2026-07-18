import { createStore } from "solid-js/store";

export type BarStyle = "default" | "full" | "modular";

const STORAGE_KEY = "syszebar-bar-style";

function load(): BarStyle {
  const stored = localStorage.getItem(STORAGE_KEY) as BarStyle | null;
  if (stored === "default" || stored === "full" || stored === "modular") return stored;
  return "default";
}

export const [barStyle, setBarStyle] = createStore<{ value: BarStyle }>({
  value: load(),
});

export function saveBarStyle(style: BarStyle) {
  setBarStyle("value", style);
  localStorage.setItem(STORAGE_KEY, style);
}

export function startStorageSyncBarStyle() {
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      const v = e.newValue as BarStyle | null;
      if (v === "default" || v === "full" || v === "modular") {
        setBarStyle("value", v);
      }
    }
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

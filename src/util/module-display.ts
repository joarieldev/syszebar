import { createSignal } from "solid-js";
import type { ModuleIdWithIcon } from "./modules";

export type DisplayMode = "icon" | "text";

export const MODULE_LABELS: Record<ModuleIdWithIcon, string> = {
  clock: "CAL",
  network: "NET",
  memory: "RAM",
  cpu: "CPU",
  battery: "BAT",
  weather: "WX",
};

const DISPLAY_KEY = "syszebar-module-display";
const DEFAULT_MODE: DisplayMode = "icon";

function load(): DisplayMode {
  const stored = localStorage.getItem(DISPLAY_KEY);
  if (stored === "icon" || stored === "text") return stored;
  return DEFAULT_MODE;
}

export const [displayMode, setDisplayMode] = createSignal<DisplayMode>(load());

export function saveDisplayMode(mode: DisplayMode) {
  setDisplayMode(mode);
  localStorage.setItem(DISPLAY_KEY, mode);
}

export function startStorageSyncModuleDisplay() {
  const handler = (e: StorageEvent) => {
    if (e.key === DISPLAY_KEY && typeof e.newValue === "string") {
      if (e.newValue === "icon" || e.newValue === "text") {
        setDisplayMode(e.newValue);
      }
    }
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

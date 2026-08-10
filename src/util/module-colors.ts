import { createStore } from "solid-js/store";
import { type ModuleIdWithIcon } from "./providers";

const COLORS_KEY = "syszebar-module-colors";

export const MODULES_WITH_ICON: Record<ModuleIdWithIcon, string> = {
  clock: "",
  network: "",
  memory: "",
  cpu: "",
  battery: "",
  weather: "",
};

function load(): Record<ModuleIdWithIcon, string> {
  const stored = localStorage.getItem(COLORS_KEY);
  if (!stored) return { ...MODULES_WITH_ICON };
  try {
    return { ...MODULES_WITH_ICON, ...JSON.parse(stored) };
  } catch {
    return { ...MODULES_WITH_ICON };
  }
}

export const [moduleColors, setModuleColors] = createStore<Record<ModuleIdWithIcon, string>>(load());

export function saveModuleColor(id: ModuleIdWithIcon, hex: string) {
  setModuleColors(id, hex);
  localStorage.setItem(COLORS_KEY, JSON.stringify({ ...moduleColors, [id]: hex }));
}

export function resetModuleColor(id: ModuleIdWithIcon) {
  setModuleColors(id, "");
  localStorage.setItem(COLORS_KEY, JSON.stringify({ ...moduleColors, [id]: "" }));
}

export function startStorageSyncModuleColors() {
  const handler = (e: StorageEvent) => {
    if (e.key === COLORS_KEY && typeof e.newValue === "string") {
      const parsed = JSON.parse(e.newValue);
      setModuleColors({ ...MODULES_WITH_ICON, ...parsed });
    }
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

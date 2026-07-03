import { createStore } from "solid-js/store";
import { type ModuleId, ALL_ENABLED } from "./providers";

const MODULES_KEY = "syszebar-modules";

function loadModules(): Record<ModuleId, boolean> {
  const stored = localStorage.getItem(MODULES_KEY);
  if (!stored) return { ...ALL_ENABLED };
  try {
    const parsed = JSON.parse(stored);
    return { ...ALL_ENABLED, ...parsed };
  } catch {
    return { ...ALL_ENABLED };
  }
}

export const [module, setModule] = createStore<
  Record<ModuleId, boolean>
>(
  loadModules(),
);

export function toggleModule(id: ModuleId) {
  const next = !module[id];
  setModule(id, next);
  localStorage.setItem(MODULES_KEY, JSON.stringify({ ...module, [id]: next }));
}

export function startStorageSyncModule() {
  const handler = (e: StorageEvent) => {
    if (e.key === MODULES_KEY && typeof e.newValue === "string") {
      const parsed = JSON.parse(e.newValue);
      setModule({ ...ALL_ENABLED, ...parsed });
    }
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}
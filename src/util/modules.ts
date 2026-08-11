import { createStore } from "solid-js/store";

export type ModuleId = "glazewm" | "clock" | "network" | "memory" | "cpu" | "battery" | "weather" | "settings";

export type ModuleIdWithIcon = Exclude<ModuleId, "glazewm">;
export type ModuleIdWithLabel = Exclude<ModuleId, "glazewm" | "settings">;

interface ModuleDef {
  id: ModuleId;
  label: string;
}

const MODULES: ModuleDef[] = [
  { id: "glazewm", label: "Glazewm" },
  { id: "clock", label: "Clock" },
  { id: "network", label: "Network" },
  { id: "memory", label: "Memory" },
  { id: "cpu", label: "CPU" },
  { id: "battery", label: "Battery" },
  { id: "weather", label: "Weather" },
  { id: "settings", label: "Settings" },
];

export const ALL_ENABLED: Record<ModuleId, boolean> = Object.fromEntries(
  MODULES.map(m => [m.id, true]),
) as Record<ModuleId, boolean>;

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

export function saveToggleModule(id: ModuleId) {
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

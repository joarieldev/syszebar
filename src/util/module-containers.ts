import { createStore } from "solid-js/store";

export type ColumnId = "left" | "center" | "right";

export type ContainerMap = Record<ColumnId, string[]>;

const KEY = "syszebar-containers";

export const DEFAULTS: ContainerMap = {
  left: ["glazewm"],
  center: ["clock"],
  right: ["network", "memory", "cpu", "battery", "weather"],
};

function load(): ContainerMap {
  const stored = localStorage.getItem(KEY);
  if (!stored) return { ...DEFAULTS, left: [...DEFAULTS.left], center: [...DEFAULTS.center], right: [...DEFAULTS.right] };
  try {
    const parsed = JSON.parse(stored);
    return {
      left: parsed.left ?? [...DEFAULTS.left],
      center: parsed.center ?? [...DEFAULTS.center],
      right: parsed.right ?? [...DEFAULTS.right],
    };
  } catch {
    return { ...DEFAULTS, left: [...DEFAULTS.left], center: [...DEFAULTS.center], right: [...DEFAULTS.right] };
  }
}

export const [moduleContainers, setModuleContainers] = createStore<ContainerMap>(load());

export function saveModuleContainers(containers: ContainerMap) {
  localStorage.setItem(KEY, JSON.stringify(containers));
}

export function startStorageSyncContainers() {
  const handler = (e: StorageEvent) => {
    if (e.key === KEY && typeof e.newValue === "string") {
      const parsed = JSON.parse(e.newValue) as ContainerMap;
      for (const col of ["left", "center", "right"] as ColumnId[]) {
        if (parsed[col]) {
          setModuleContainers(col, parsed[col]);
        }
      }
    }
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

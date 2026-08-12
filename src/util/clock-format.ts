import { createStore } from "solid-js/store";

export type ClockMode =
  | "time"
  | "time-seconds"
  | "date"
  | "datefull"
  | "datetime"
  | "datetime-seconds"
  | "datefulltime"
  | "datefulltime-seconds";

export const CLOCK_MODES: ClockMode[] = [
  "time",
  "time-seconds",
  "date",
  "datefull",
  "datetime",
  "datetime-seconds",
  "datefulltime",
  "datefulltime-seconds",
];

const STORAGE_KEY = "syszebar-clock-format";
const DEFAULT_MODE: ClockMode = "time";

function load(): ClockMode {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (CLOCK_MODES.includes(stored as ClockMode)) {
    return stored as ClockMode;
  }
  return DEFAULT_MODE;
}

export const [clockMode, setClockMode] = createStore<{ value: ClockMode }>({
  value: load(),
});

function persist() {
  localStorage.setItem(STORAGE_KEY, clockMode.value);
}

export function cycleClockMode() {
  const index = CLOCK_MODES.indexOf(clockMode.value);
  const next = CLOCK_MODES[(index + 1) % CLOCK_MODES.length];
  setClockMode("value", next);
  persist();
}

export function saveClockMode(mode: ClockMode) {
  setClockMode("value", mode);
  persist();
}

export function startStorageSyncClockFormat() {
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY && typeof e.newValue === "string") {
      if (CLOCK_MODES.includes(e.newValue as ClockMode)) {
        setClockMode("value", e.newValue as ClockMode);
      }
    }
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

export type ModuleId = "glazewm" | "clock" | "network" | "memory" | "cpu" | "battery" | "weather";

export type ModuleIdWithIcon = Exclude<ModuleId, "glazewm">;

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
];

export const ALL_ENABLED: Record<ModuleId, boolean> = Object.fromEntries(
  MODULES.map(m => [m.id, true]),
) as Record<ModuleId, boolean>;

export const PROVIDERS_CONFIG = {
  cpu: { type: "cpu" as const, refreshInterval: 2000 },
  battery: { type: "battery" as const },
  glazewm: { type: "glazewm" as const },
  memory: { type: "memory" as const },
  network: { type: "network" as const, refreshInterval: 2000 },
  weather: { type: "weather" as const },
};

export type ProviderId = keyof typeof PROVIDERS_CONFIG;

export const PROVIDER_IDS: ProviderId[] = Object.keys(PROVIDERS_CONFIG) as ProviderId[];

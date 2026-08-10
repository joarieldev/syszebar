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

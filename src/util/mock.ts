import type {
  BatteryOutput,
  CpuOutput,
  DateOutput,
  MemoryOutput,
  WeatherOutput,
} from "zebar";

export type IProviders = {
  battery: BatteryOutput | null;
  cpu: CpuOutput | null;
  date: DateOutput | null;
  memory: MemoryOutput | null;
  weather: WeatherOutput | null;
};

export const mockProviders: IProviders = {
  battery: {
    chargePercent: 78,
    cycleCount: 142,
    healthPercent: 95,
    powerConsumption: 12.4,
    state: "discharging",
    isCharging: false,
    timeTillEmpty: 7200000,
    timeTillFull: null,
    voltage: 12.1,
  },

  cpu: {
    frequency: 3600,
    usage: 23.5,
    logicalCoreCount: 16,
    physicalCoreCount: 8,
    vendor: "GenuineIntel",
  },

  date: {
    formatted: "2026-06-03 15:00",
    new: new Date(),
    now: Date.now(),
    iso: new Date().toISOString(),
  },

  memory: {
    usage: 54,
    freeMemory: 16_000_000_000,
    usedMemory: 18_000_000_000,
    totalMemory: 34_000_000_000,
    freeSwap: 8_000_000_000,
    usedSwap: 1_000_000_000,
    totalSwap: 9_000_000_000,
  },

  weather: {
    isDaytime: true,
    status: "clear_day",
    celsiusTemp: 24,
    fahrenheitTemp: 75,
    windSpeed: 12,
  },
};

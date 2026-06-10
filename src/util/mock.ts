import type {
  BatteryOutput,
  CpuOutput,
  DateOutput,
  MemoryOutput,
  NetworkOutput,
  WeatherOutput,
} from "zebar";

export type IProviders = {
  battery: BatteryOutput | null;
  cpu: CpuOutput | null;
  date: DateOutput | null;
  memory: MemoryOutput | null;
  network: NetworkOutput | null;
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
  network: {
    defaultInterface: {
      name: "eth0",
      friendlyName: "Ethernet",
      description: "Realtek PCIe GbE Family Controller",
      type: "wifi",
      ipv4Addresses: ["192.168.1.100"],
      ipv6Addresses: ["fe80::1"],
      macAddress: "00:1a:2b:3c:4d:5e",
      transmitSpeed: 1_000_000_000,
      receiveSpeed: 1_000_000_000,
      dnsServers: ["8.8.8.8"],
      isDefault: true,
    },
    defaultGateway: {
      macAddress: "00:1a:2b:3c:4d:5f",
      ipv4Addresses: ["192.168.1.1"],
      ipv6Addresses: [],
      ssid: null,
      signalStrength: null,
    },
    interfaces: [],
    traffic: {
      received: { bytes: 1_250_000, siValue: 1.25, siUnit: "MB", iecValue: 1.19, iecUnit: "MiB" },
      totalReceived: { bytes: 500_000_000_000, siValue: 500, siUnit: "GB", iecValue: 465.66, iecUnit: "GiB" },
      transmitted: { bytes: 320_000, siValue: 0.32, siUnit: "MB", iecValue: 0.31, iecUnit: "MiB" },
      totalTransmitted: { bytes: 100_000_000_000, siValue: 100, siUnit: "GB", iecValue: 93.13, iecUnit: "GiB" },
    },
  },
};

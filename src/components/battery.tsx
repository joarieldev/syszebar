import type { BatteryOutput } from "zebar";

interface Props {
  battery: BatteryOutput | null;
}

export const Battery = (props: Props) => (
  <>
    <span class="text-zinc-400">BAT</span>
    <span class="font-mono tabular-nums w-12 text-right">
      {props.battery
        ? `${props.battery.isCharging ? "+" : ""}${Math.round(props.battery.chargePercent)}%`
        : "---"}
    </span>
  </>
);

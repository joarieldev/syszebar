import type { BatteryOutput } from "zebar";
import { Battery4 } from "../icons/battery-4";

interface Props {
  battery: BatteryOutput | null;
}

export const Battery = (props: Props) => (
  <div class="flex items-center justify-center gap-0.5 px-2">
    <span class="flex justify-center text-zinc-400">
      <Battery4 class="size-4" />
    </span>
    <span class="font-mono tabular-nums w-10 text-center">
      {props.battery
        ? `${props.battery.isCharging ? "+" : ""}${Math.round(props.battery.chargePercent)}%`
        : "---"}
    </span>
  </div>
);

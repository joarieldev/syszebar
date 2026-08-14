import type { BatteryOutput } from "zebar";
import { Battery4 } from "../icons/battery-4";
import { moduleColors } from "../util/module-colors";
import { displayMode, MODULE_LABELS } from "../util/module-display";

interface Props {
  battery: BatteryOutput | null;
}

export const Battery = (props: Props) => (
  <div class="flex items-center justify-center gap-0.5 px-2">
    <span
      class="flex justify-center items-center text-icon leading-none text-(length:--text-icon-size)"
      style={{ color: moduleColors.battery || undefined }}
    >
      {displayMode() === "icon" ? (
        <Battery4 class="size-icon" />
      ) : (
        <>{MODULE_LABELS.battery}</>
      )}
    </span>
    <span class="tabular-nums w-[4ch] text-end leading-none">
      {props.battery
        ? `${Math.round(props.battery.chargePercent)}%`
        : "---"}
    </span>
  </div>
);

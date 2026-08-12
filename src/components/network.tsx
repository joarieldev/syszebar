import type { NetworkOutput } from "zebar";
import { Network as NetworkIcon } from "../icons/network";
import { moduleColors } from "../util/module-colors";
import { displayMode, MODULE_LABELS } from "../util/module-display";

interface Props {
  network: NetworkOutput | null;
}

const formatTraffic = (ds: { siValue: number; siUnit: string }) => {
  const value =
    ds.siUnit.toUpperCase() === "B" || ds.siUnit.toUpperCase() === "KB"
      ? `${Math.round(ds.siValue)}`
      : `${ds.siValue.toFixed(1)}`;
  return `${value}${ds.siUnit}/s`;
};

export const Network = (props: Props) => {
  return (
    <div class="flex items-center justify-center gap-1 px-2">
      <span
        class="flex justify-center items-center text-icon"
        style={{ color: moduleColors.network || undefined }}
      >
        {displayMode() === "icon" ? (
          <NetworkIcon class="size-icon" />
        ) : (
          <span class="leading-none text-(length:--text-icon-size)">
            {MODULE_LABELS.network}
          </span>
        )}
      </span>
      <span class="tabular-nums whitespace-nowrap text-end w-[8ch]">
        {props.network?.traffic
          ? `↓${formatTraffic(props.network.traffic.received)}`
          : "---"}
      </span>
      <span class="tabular-nums whitespace-nowrap text-end w-[8ch]">
        {props.network?.traffic
          ? `↑${formatTraffic(props.network.traffic.transmitted)}`
          : "---"}
      </span>
    </div>
  );
};

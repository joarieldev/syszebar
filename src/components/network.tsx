import type { NetworkOutput } from "zebar";
import { Network as NetworkIcon } from "../icons/network";

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
    <div class="flex items-center justify-center gap-0.5 px-2">
      <span class="flex justify-center text-zinc-400">
        <NetworkIcon class="size-4" />
      </span>
      <div class="flex font-mono tabular-nums text-center">
        <span class="w-20">
          {props.network?.traffic
            ? `↓${formatTraffic(props.network.traffic.received)}`
            : "---"}
        </span>
        <span class="w-20">
          {props.network?.traffic
            ? `↑${formatTraffic(props.network.traffic.transmitted)}`
            : "---"}
        </span>
      </div>
    </div>
  );
};

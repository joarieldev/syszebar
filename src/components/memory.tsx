import type { MemoryOutput } from "zebar";
import { DeviceSim } from "../icons/device-sim";

interface Props {
  memory: MemoryOutput | null;
}

export const Memory = (props: Props) => (
  <div class="flex items-center justify-center gap-0.5 px-2">
    <span class="flex justify-center text-zinc-400">
      <DeviceSim class="size-4" />
    </span>
    <span class="font-mono tabular-nums w-10 text-center">
      {props.memory ? `${Math.round(props.memory.usage)}%` : "---"}
    </span>
  </div>
);

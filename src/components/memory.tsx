import type { MemoryOutput } from "zebar";
import { DeviceSim } from "../icons/device-sim";

interface Props {
  memory: MemoryOutput | null;
}

export const Memory = (props: Props) => (
  <div class="flex items-center justify-center gap-0.5 px-2">
    <span class="flex justify-center text-icon">
      <DeviceSim class="size-icon" />
    </span>
    <span class="tabular-nums w-10 text-center">
      {props.memory ? `${Math.round(props.memory.usage)}%` : "---"}
    </span>
  </div>
);

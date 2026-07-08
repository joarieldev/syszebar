import type { CpuOutput } from "zebar";
import { Cpu as CpuIcon } from "../icons/cpu";

interface Props {
  cpu: CpuOutput | null;
}

export const Cpu = (props: Props) => (
  <div class="flex items-center justify-center gap-0.5 px-2">
    <span class="flex justify-center text-icon">
      <CpuIcon class="size-4" />
    </span>
    <span class="tabular-nums w-10 text-center">
      {props.cpu ? `${Math.round(props.cpu.usage)}%` : "---"}
    </span>
  </div>
);

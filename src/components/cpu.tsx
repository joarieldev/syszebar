import type { CpuOutput } from "zebar";
import { Cpu as CpuIcon } from "../icons/cpu";
import { moduleColors } from "../util/module-colors";
import { displayMode, MODULE_LABELS } from "../util/module-display";

interface Props {
  cpu: CpuOutput | null;
}

export const Cpu = (props: Props) => (
  <div class="flex items-center justify-center gap-0.5 px-2">
    <span
      class="flex justify-center items-center text-icon leading-none text-(length:--text-icon-size)"
      style={{ color: moduleColors.cpu || undefined }}
    >
      {displayMode() === "icon" ? (
        <CpuIcon class="size-icon" />
      ) : (
        <>{MODULE_LABELS.cpu}</>
      )}
    </span>
    <span class="tabular-nums w-[4ch] text-end leading-none">
      {props.cpu ? `${Math.round(props.cpu.usage)}%` : "---"}
    </span>
  </div>
);

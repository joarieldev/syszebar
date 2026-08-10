import type { MemoryOutput } from "zebar";
import { DeviceSim } from "../icons/device-sim";
import { moduleColors } from "../util/module-colors";
import { displayMode, MODULE_LABELS } from "../util/module-display";

interface Props {
  memory: MemoryOutput | null;
}

export const Memory = (props: Props) => (
  <div class="flex items-center justify-center gap-0.5 px-2">
    <span
      class="flex justify-center items-center text-icon"
      style={{ color: moduleColors.memory || undefined }}
    >
      {displayMode() === "icon" ? (
        <DeviceSim class="size-icon" />
      ) : (
        <span class="leading-none text-(length:--text-icon-size)">
          {MODULE_LABELS.memory}
        </span>
      )}
    </span>
    <span class="tabular-nums w-10 text-center">
      {props.memory ? `${Math.round(props.memory.usage)}%` : "---"}
    </span>
  </div>
);

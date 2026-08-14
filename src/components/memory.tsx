import type { MemoryOutput } from "zebar";
import { DeviceDesktopAnalytics } from "../icons/device-desktop-analytics";
import { moduleColors } from "../util/module-colors";
import { displayMode, MODULE_LABELS } from "../util/module-display";

interface Props {
  memory: MemoryOutput | null;
}

export const Memory = (props: Props) => (
  <div class="flex items-center justify-center gap-0.5 px-2">
    <span
      class="flex justify-center items-center text-icon leading-none text-(length:--text-icon-size)"
      style={{ color: moduleColors.memory || undefined }}
    >
      {displayMode() === "icon" ? (
        <DeviceDesktopAnalytics class="size-icon" />
      ) : (
        <>{MODULE_LABELS.memory}</>
      )}
    </span>
    <span class="tabular-nums w-[4ch] text-end leading-none">
      {props.memory ? `${Math.round(props.memory.usage)}%` : "---"}
    </span>
  </div>
);

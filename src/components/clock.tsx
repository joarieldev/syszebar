import { createSignal, onCleanup } from "solid-js";
import { Clock as ClockIcon } from "../icons/clock";
import { moduleColors } from "../util/module-colors";
import { displayMode, MODULE_LABELS } from "../util/module-display";

const formatter = new Intl.DateTimeFormat("es-AR", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export const Clock = () => {
  const [time, setTime] = createSignal(formatter.format(new Date()));
  const timer = setInterval(() => setTime(formatter.format(new Date())), 1000);

  onCleanup(() => clearInterval(timer));

  return (
    <div class="flex items-center justify-center gap-1.5 px-2">
      <span
        class="flex justify-center items-center text-icon"
        style={{ color: moduleColors.clock || undefined }}
      >
        {displayMode() === "icon" ? (
          <ClockIcon class="size-icon" />
        ) : (
          <span class="leading-none text-(length:--text-icon-size)">
            {MODULE_LABELS.clock}
          </span>
        )}
      </span>
      <span class="tabular-nums">{time()}</span>
    </div>
  );
};

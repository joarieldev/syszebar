import { createEffect, createSignal, onCleanup } from "solid-js";
import { Calendar } from "../icons/calendar";
import { moduleColors } from "../util/module-colors";
import { displayMode, MODULE_LABELS } from "../util/module-display";
import { clockMode, cycleClockMode } from "../util/clock-format";

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const secondsFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAYS_FULL = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MONTHS_FULL = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatShortDate(d: Date) {
  return `${DAYS_SHORT[d.getDay()]} ${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`;
}

function formatFullDate(d: Date) {
  return `${DAYS_FULL[d.getDay()]} ${d.getDate()} ${MONTHS_FULL[d.getMonth()]}`;
}

export const Clock = () => {
  const [now, setNow] = createSignal(new Date());

  createEffect(() => {
    const interval = clockMode.value.endsWith("seconds") ? 1000 : 30000;
    const timer = setInterval(() => setNow(new Date()), interval);
    onCleanup(() => clearInterval(timer));
  });

  const text = () => {
    const d = now();
    switch (clockMode.value) {
      case "time":
        return timeFormatter.format(d);
      case "time-seconds":
        return secondsFormatter.format(d);
      case "date":
        return formatShortDate(d);
      case "datefull":
        return formatFullDate(d);
      case "datetime":
        return `${formatShortDate(d)} ${timeFormatter.format(d)}`;
      case "datetime-seconds":
        return `${formatShortDate(d)} ${secondsFormatter.format(d)}`;
      case "datefulltime":
        return `${formatFullDate(d)} ${timeFormatter.format(d)}`;
      case "datefulltime-seconds":
        return `${formatFullDate(d)} ${secondsFormatter.format(d)}`;
    }
  };

  return (
    <div class="flex items-center justify-center gap-1.5 px-2">
      <span
        class="flex justify-center items-center text-icon"
        style={{ color: moduleColors.clock || undefined }}
      >
        {displayMode() === "icon" ? (
          <Calendar class="size-icon" />
        ) : (
          <span class="leading-none text-(length:--text-icon-size)">
            {MODULE_LABELS.clock}
          </span>
        )}
      </span>
      <button
        onClick={() => cycleClockMode()}
        title="Click to change format"
        class="tabular-nums whitespace-nowrap cursor-pointer"
      >
        {text()}
      </button>
    </div>
  );
};

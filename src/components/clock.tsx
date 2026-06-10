import { createSignal, onCleanup } from "solid-js";

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
  return <span class="font-mono tabular-nums">{time()}</span>;
};

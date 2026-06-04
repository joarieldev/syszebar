import type { DateOutput } from "zebar";

interface Props {
  date: DateOutput | null;
}

export const Clock = (props: Props) => (
  <span class="font-mono tabular-nums">{props.date?.formatted ?? "--:--:--"}</span>
);

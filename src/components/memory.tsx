import type { MemoryOutput } from "zebar";

interface Props {
  memory: MemoryOutput | null;
}

export const Memory = (props: Props) => (
  <>
    <span class="text-zinc-400">RAM</span>
    <span class="font-mono tabular-nums w-8 text-right">
      {props.memory ? `${Math.round(props.memory.usage)}%` : "---"}
    </span>
  </>
);

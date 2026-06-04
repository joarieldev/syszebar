import type { CpuOutput } from "zebar";

interface Props {
  cpu: CpuOutput | null;
}

export const Cpu = (props: Props) => {
  return (
    <>
      <span class="text-zinc-400">CPU</span>
      <span class="font-mono tabular-nums w-8 text-right">
        {props.cpu ? `${Math.round(props.cpu.usage)}%` : "---"}
      </span>
    </>
  );
};

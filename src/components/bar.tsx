import type { IProviders } from "../util/mock";
import { Battery } from "./battery";
import { Clock } from "./clock";
import { Cpu } from "./cpu";
import { Memory } from "./memory";

interface Props {
  provider: IProviders;
}

export const Bar = (props: Props) => {
  return (
    <div class="flex h-full w-full items-center justify-between bg-black/80 px-3 text-white text-sm">
      <div>SYSZEBAR</div>
      <Clock date={props.provider.date} />
      <div class="flex items-center gap-4">
        <Cpu cpu={props.provider.cpu} />
        <Memory memory={props.provider.memory} />
        <Battery battery={props.provider.battery} />
      </div>
    </div>
  );
};

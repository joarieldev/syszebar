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
    <main class="grid grid-cols-[1fr_1fr_1fr] h-[30px] items-center bg-black/75 px-[1vw] text-white text-base border border-gray-300/75 rounded-lg mx-2.5">
      <div class="flex justify-start">SYSZEBAR</div>
      <div class="flex justify-center">
        <Clock date={props.provider.date} />
      </div>
      <div class="flex justify-end gap-4">
        <Memory memory={props.provider.memory} />
        <Cpu cpu={props.provider.cpu} />
        <Battery battery={props.provider.battery} />
      </div>
    </main>
  );
};

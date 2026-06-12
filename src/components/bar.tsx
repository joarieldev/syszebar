import type { IProviders } from "../util/mock";
import { Battery } from "./battery";
import { Clock } from "./clock";
import { Cpu } from "./cpu";
import { Memory } from "./memory";
import { Network } from "./network";
import { Weather } from "./weather";
import { Glazewm } from "./glazewm";
import { Settings } from "./settings";

interface Props {
  provider: IProviders;
}

export const Bar = (props: Props) => {
  return (
    <main class="grid grid-cols-[1fr_1fr_1fr] h-7.5 items-center bg-black/75 px-[1vw] text-white text-base border border-gray-300/75 rounded-lg mx-2.5 relative">
      <div class="flex justify-start">
        <Glazewm glazewm={props.provider.glazewm} />
      </div>
      <div class="flex justify-center">
        <Clock />
      </div>
      <div class="flex justify-end gap-4">
        <Network network={props.provider.network} />
        <Memory memory={props.provider.memory} />
        <Cpu cpu={props.provider.cpu} />
        <Battery battery={props.provider.battery} />
        <Weather weather={props.provider.weather} />
        <Settings />
      </div>
    </main>
  );
};

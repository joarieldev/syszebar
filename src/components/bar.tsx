import { Show } from "solid-js";
import type { IProviders } from "../util/mock";
import { Battery } from "./battery";
import { Clock } from "./clock";
import { Cpu } from "./cpu";
import { Memory } from "./memory";
import { Network } from "./network";
import { Weather } from "./weather";
import { Glazewm } from "./glazewm";
import { Settings } from "./settings";
import { module } from "../util/modules";

interface Props {
  provider: IProviders;
}

export const Bar = (props: Props) => {
  return (
    <main class="grid grid-cols-[1fr_1fr_1fr] h-7.5 items-center bg-surface px-[1vw] text-content text-base border border-line rounded-lg mx-2.5 relative">
      <div class="flex justify-start">
        <Show when={module.glazewm}>
          <Glazewm glazewm={props.provider.glazewm} />
        </Show>
      </div>
      <div class="flex justify-center">
        <Show when={module.clock}>
          <Clock />
        </Show>
      </div>
      <div class="flex justify-end gap-4">
        <Show when={module.network}>
          <Network network={props.provider.network} />
        </Show>
        <Show when={module.memory}>
          <Memory memory={props.provider.memory} />
        </Show>
        <Show when={module.cpu}>
          <Cpu cpu={props.provider.cpu} />
        </Show>
        <Show when={module.battery}>
          <Battery battery={props.provider.battery} />
        </Show>
        <Show when={module.weather}>
          <Weather weather={props.provider.weather} />
        </Show>
        <Settings />
      </div>
    </main>
  );
};

import { Show } from "solid-js";
import type { IProviders } from "../util/mock";
import { theme } from "../util/theme";
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
    <main class="grid grid-cols-[1fr_1fr_1fr] h-7.5 items-center bg-surface px-[1vw] text-content text-base border border-line rounded-lg mx-2.5 relative">
      <div class="flex justify-start">
        <Show when={theme.enabledModules.glazewm}>
          <Glazewm glazewm={props.provider.glazewm} />
        </Show>
      </div>
      <div class="flex justify-center">
        <Show when={theme.enabledModules.clock}>
          <Clock />
        </Show>
      </div>
      <div class="flex justify-end gap-4">
        <Show when={theme.enabledModules.network}>
          <Network network={props.provider.network} />
        </Show>
        <Show when={theme.enabledModules.memory}>
          <Memory memory={props.provider.memory} />
        </Show>
        <Show when={theme.enabledModules.cpu}>
          <Cpu cpu={props.provider.cpu} />
        </Show>
        <Show when={theme.enabledModules.battery}>
          <Battery battery={props.provider.battery} />
        </Show>
        <Show when={theme.enabledModules.weather}>
          <Weather weather={props.provider.weather} />
        </Show>
        <Settings />
      </div>
    </main>
  );
};

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
import { barStyle } from "../util/bar-style";
import type { BarStyle } from "../util/bar-style";

interface Props {
  provider: IProviders;
}

export const Bar = (props: Props) => {
  const barVariants: Record<BarStyle, string> = {
    default: "h-7.5 bg-surface border border-line rounded-lg mx-2.5 mt-2.5",
    full: "h-10 bg-surface",
    modular: "mx-2.5 mt-2.5",
  };

  const ModuleBox = (props: { children: any }) => {
    return (
      <div classList={{
        "flex items-center h-7.5 bg-surface border border-line rounded-lg": barStyle.value === "modular"
      }}>
        {props.children}
      </div>
    );
  };

  return (
    <main
      class={`grid grid-cols-[1fr_1fr_1fr] items-center px-[1vw] text-content relative ${barVariants[barStyle.value]}`}
    >
      <div class="flex justify-start">
        <Show when={module.glazewm}>
          <Glazewm glazewm={props.provider.glazewm} />
        </Show>
      </div>
      <div class="flex justify-center">
        <Show when={module.clock}>
          <ModuleBox>
            <Clock />
          </ModuleBox>
        </Show>
      </div>
      <div class="flex justify-end gap-4">
        <Show when={module.network}>
          <ModuleBox>
            <Network network={props.provider.network} />
          </ModuleBox>
        </Show>
        <Show when={module.memory}>
          <ModuleBox>
            <Memory memory={props.provider.memory} />
          </ModuleBox>
        </Show>
        <Show when={module.cpu}>
          <ModuleBox>
            <Cpu cpu={props.provider.cpu} />
          </ModuleBox>
        </Show>
        <Show when={module.battery}>
          <ModuleBox>
            <Battery battery={props.provider.battery} />
          </ModuleBox>
        </Show>
        <Show when={module.weather}>
          <ModuleBox>
            <Weather weather={props.provider.weather} />
          </ModuleBox>
        </Show>
        <ModuleBox>
          <Settings />
        </ModuleBox>
      </div>
    </main>
  );
};

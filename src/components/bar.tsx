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
import { barMargin } from "../util/bar-margin";
import type { BarStyle } from "../util/bar-style";

interface Props {
  provider: IProviders;
}

export const Bar = (props: Props) => {
  const barVariants: Record<BarStyle, string> = {
    default: "h-7.5 bg-surface border border-line rounded-lg px-2",
    full: "h-10 bg-surface px-2 border-b border-line",
    modular: "",
  };

  const marginStyle = () =>
    barStyle.value !== "full"
      ? {
          "margin-top": `${barMargin.top}px`,
          "margin-right": `${barMargin.right}px`,
          "margin-bottom": `${barMargin.bottom}px`,
          "margin-left": `${barMargin.left}px`,
        }
      : undefined;

  const ModuleBox = (props: { children: any }) => {
    return (
      <div
        classList={{
          "flex items-center": true,
          "h-7.5 bg-surface border border-line rounded-lg":
            barStyle.value === "modular",
        }}
      >
        {props.children}
      </div>
    );
  };

  return (
    <main
      class={`grid grid-cols-[1fr_1fr_1fr] items-center text-content relative ${barVariants[barStyle.value]}`}
      style={marginStyle()}
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

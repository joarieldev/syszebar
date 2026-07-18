import { For } from "solid-js";
import type { IProviders } from "../util/mock";
import type { ModuleId } from "../util/providers";
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
import { moduleContainers, type ColumnId } from "../util/module-containers";

const barVariants: Record<BarStyle, string> = {
  default: "h-7.5 bg-surface border border-line rounded-lg px-2",
  full: "h-10 bg-surface px-2 border-b border-line",
  modular: "",
};

const ModularBox = (props: { children: any }) => {
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

function visibleItems(col: ColumnId) {
  return moduleContainers[col].filter((id) => module[id as ModuleId]);
}

function renderModule(id: string, provider: IProviders) {
  switch (id) {
    case "glazewm":
      return <Glazewm glazewm={provider.glazewm} />;
    case "clock":
      return (
        <ModularBox>
          <Clock />
        </ModularBox>
      );
    case "network":
      return (
        <ModularBox>
          <Network network={provider.network} />
        </ModularBox>
      );
    case "memory":
      return (
        <ModularBox>
          <Memory memory={provider.memory} />
        </ModularBox>
      );
    case "cpu":
      return (
        <ModularBox>
          <Cpu cpu={provider.cpu} />
        </ModularBox>
      );
    case "battery":
      return (
        <ModularBox>
          <Battery battery={provider.battery} />
        </ModularBox>
      );
    case "weather":
      return (
        <ModularBox>
          <Weather weather={provider.weather} />
        </ModularBox>
      );
    default:
      return null;
  }
}

interface Props {
  provider: IProviders;
}

export const Bar = (props: Props) => {
  const marginStyle = () =>
    barStyle.value !== "full"
      ? {
          "margin-top": `${barMargin.top}px`,
          "margin-right": `${barMargin.right}px`,
          "margin-bottom": `${barMargin.bottom}px`,
          "margin-left": `${barMargin.left}px`,
        }
      : undefined;

  return (
    <main
      class={`grid grid-cols-[1fr_1fr_1fr] items-center text-content relative ${barVariants[barStyle.value]}`}
      style={marginStyle()}
    >
      <div class="flex justify-start gap-2">
        <For each={visibleItems("left")}>
          {(id) => renderModule(id, props.provider)}
        </For>
      </div>
      <div class="flex justify-center gap-2">
        <For each={visibleItems("center")}>
          {(id) => renderModule(id, props.provider)}
        </For>
      </div>
      <div class="flex justify-end gap-2">
        <For each={visibleItems("right")}>
          {(id) => renderModule(id, props.provider)}
        </For>
        <ModularBox>
          <Settings />
        </ModularBox>
      </div>
    </main>
  );
};

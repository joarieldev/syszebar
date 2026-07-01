import { createEffect, on } from "solid-js";
import { createStore } from "solid-js/store";
import { Bar } from "../bar";
import { createProviderGroup } from "zebar";
import { theme } from "../../util/theme";
import { PROVIDERS_CONFIG, PROVIDER_IDS, type ProviderId } from "../../util/modules";

const providers = createProviderGroup(PROVIDERS_CONFIG);

type OutputMap = typeof providers.outputMap;

export const ProdMode = () => {
  const [output, setOutput] = createStore<OutputMap>(providers.outputMap);

  function subscribe(id: ProviderId) {
    (providers.raw[id] as any).onOutput((output: any) => setOutput(id as any, output));
  }

  for (const id of PROVIDER_IDS) {
    subscribe(id);
  }

  for (const id of PROVIDER_IDS) {
    if (theme.enabledModules[id]) {
      providers.raw[id].restart().catch(() => {});
    } else {
      setOutput(id, null as OutputMap[typeof id]);
      providers.raw[id].stop().catch(() => {});
    }
  }

  for (const id of PROVIDER_IDS) {
    createEffect(on(
      () => theme.enabledModules[id],
      (enabled) => {
        if (enabled) {
          providers.raw[id].restart().catch(() => {});
          subscribe(id);
        } else {
          setOutput(id, null as OutputMap[typeof id]);
          providers.raw[id].stop().catch(() => {});
        }
      },
      { defer: true },
    ));
  }

  return <Bar provider={output} />;
};

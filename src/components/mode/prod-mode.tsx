import { createEffect, on, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { Bar } from "../bar";
import { createProviderGroup } from "zebar";
import {
  PROVIDERS_CONFIG,
  PROVIDER_IDS,
  type ProviderId,
} from "../../util/providers";
import { module } from "../../util/modules";

const providers = createProviderGroup(PROVIDERS_CONFIG);
type OutputMap = typeof providers.outputMap;

export const ProdMode = () => {
  const [output, setOutput] = createStore<OutputMap>(providers.outputMap);

  function handleProviders(id: ProviderId, enabled: boolean) {
    if (enabled) {
      providers.raw[id]
        .restart()
        .then(() => {
          (providers.raw[id] as any).onOutput((out: any) =>
            setOutput(id as any, out),
          );
        })
        .catch((err: unknown) =>
          console.warn(`[providers] can't start "${id}"`, err),
        );
    } else {
      providers.raw[id]
        .stop()
        .catch((err: unknown) =>
          console.warn(`[providers] can't stop "${id}"`, err),
        );
      setOutput(id, null as OutputMap[typeof id]);
    }
  }

  onMount(() => {
    for (const id of PROVIDER_IDS) {
      (providers.raw[id] as any).onOutput((out: any) =>
        setOutput(id as any, out),
      );

      handleProviders(id, module[id]);
    }
  });

  for (const id of PROVIDER_IDS) {
    createEffect(
      on(
        () => module[id],
        (enabled) => handleProviders(id, enabled),
        { defer: true },
      ),
    );
  }

  return <Bar provider={output} />;
};

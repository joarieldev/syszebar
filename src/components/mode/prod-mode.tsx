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

const queues = new Map<ProviderId, Promise<void>>();

function enqueue(id: ProviderId, task: () => Promise<void>) {
  const prev = queues.get(id) ?? Promise.resolve();
  const next = prev.catch(() => {}).then(task);
  queues.set(id, next);
  return next;
}

export const ProdMode = () => {
  const [output, setOutput] = createStore<OutputMap>(providers.outputMap);

  function registerOutput(id: ProviderId) {
    (providers.raw[id] as any).onOutput((out: any) =>
      setOutput(id as any, out),
    );
  }

  function handleProviders(id: ProviderId, enabled: boolean) {
    return enqueue(id, async () => {
      if (enabled) {
        registerOutput(id);
        await providers.raw[id]
          .restart()
          .catch((err: unknown) =>
            console.warn(`[providers] can't start "${id}"`, err),
          );
      } else {
        await providers.raw[id]
          .stop()
          .catch((err: unknown) =>
            console.warn(`[providers] can't stop "${id}"`, err),
          );
        setOutput(id, null as OutputMap[typeof id]);
      }
    });
  }

  onMount(() => {
    for (const id of PROVIDER_IDS) {
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

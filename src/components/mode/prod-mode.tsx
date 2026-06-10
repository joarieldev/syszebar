import { createStore } from "solid-js/store";
import { Bar } from "../bar";
import { createProviderGroup } from "zebar";

const providers = createProviderGroup({
  cpu: { type: "cpu", refreshInterval: 2000 },
  battery: { type: "battery" },
  memory: { type: "memory", refreshInterval: 5000 },
  network: { type: "network", refreshInterval: 3000 },
  weather: { type: "weather" },
});

type OutputMap = typeof providers.outputMap;

export const ProdMode = () => {
  const [output, setOutput] = createStore<OutputMap>(providers.outputMap);

  providers.onOutput((outputMap) => {
    setOutput(outputMap)
  });

  return <Bar provider={output} />;
};

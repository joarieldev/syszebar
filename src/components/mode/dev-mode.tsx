import { mockProviders } from "../../util/mock";
import { Bar } from "../bar";

export const DevMode = () => {
  return <Bar provider={mockProviders} />;
};

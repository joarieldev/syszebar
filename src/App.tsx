import { createEffect } from "solid-js";
import { theme } from "./util/theme";
// import { DevMode } from "./components/mode/dev-mode";
import { ProdMode } from "./components/mode/prod-mode";

const App = () => {
  createEffect(() => {
    document.documentElement.dataset.theme = theme.mode;
    document.documentElement.dataset.transparent = String(theme.transparent);
  });

  return (
    <>
      {/* <DevMode /> */}
      <ProdMode />
    </>
  );
};

export default App;

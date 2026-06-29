import { createEffect } from "solid-js";
import { theme } from "./util/theme";
// import { DevMode } from "./components/mode/dev-mode";
import { ProdMode } from "./components/mode/prod-mode";

const App = () => {
  createEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme.mode;
    root.dataset.transparent = String(theme.transparent);

    if (theme.transparent) {
      root.style.setProperty("--surface-alpha", String(theme.alpha));
    } else {
      root.style.removeProperty("--surface-alpha");
    }
  });

  return (
    <>
      {/* <DevMode /> */}
      <ProdMode />
    </>
  );
};

export default App;

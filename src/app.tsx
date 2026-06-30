import { createEffect, onCleanup } from "solid-js";
import { theme, applyTheme, startStorageSync } from "./util/theme";
// import { DevMode } from "./components/mode/dev-mode";
import { ProdMode } from "./components/mode/prod-mode";

const App = () => {
  createEffect(() => applyTheme(theme));
  onCleanup(startStorageSync());

  return (
    <>
      {/* <DevMode /> */}
      <ProdMode />
    </>
  );
};

export default App;

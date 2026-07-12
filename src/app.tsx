import { createEffect, onCleanup } from "solid-js";
import { theme, applyTheme, startStorageSyncTheme } from "./util/theme";
import { typography, applyTypography, startStorageSyncTypography } from "./util/typography";
// import { DevMode } from "./components/mode/dev-mode";
import { ProdMode } from "./components/mode/prod-mode";
import { startStorageSyncModule } from "./util/modules";
import { startStorageSyncBarStyle } from "./util/bar-style";

const App = () => {
  createEffect(() => applyTheme(theme));
  createEffect(() => applyTypography(typography));

  onCleanup(startStorageSyncTheme());
  onCleanup(startStorageSyncTypography());
  onCleanup(startStorageSyncModule());
  onCleanup(startStorageSyncBarStyle());

  return (
    <>
      {/* <DevMode /> */}
      <ProdMode />
    </>
  );
};

export default App;

import { createEffect, onCleanup } from "solid-js";
import { theme, applyTheme, startStorageSyncTheme } from "./util/theme";
import {
  typography,
  applyTypography,
  startStorageSyncTypography,
} from "./util/typography";
import { DevMode } from "./components/mode/dev-mode";
import { ProdMode } from "./components/mode/prod-mode";
import { startStorageSyncModule } from "./util/modules";
import { startStorageSyncBarStyle } from "./util/bar-style";
import { startStorageSyncBarMargin } from "./util/bar-margin";
import { startStorageSyncContainers } from "./util/module-containers";
import { startStorageSyncModuleColors } from "./util/module-colors";

const App = () => {
  createEffect(() => applyTheme(theme));
  createEffect(() => applyTypography(typography));

  onCleanup(startStorageSyncTheme());
  onCleanup(startStorageSyncTypography());
  onCleanup(startStorageSyncModule());
  onCleanup(startStorageSyncBarStyle());
  onCleanup(startStorageSyncBarMargin());
  onCleanup(startStorageSyncContainers());
  onCleanup(startStorageSyncModuleColors());

  return (
    <>{import.meta.env.VITE_MODE === "dev" ? <DevMode /> : <ProdMode />}</>
  );
};

export default App;

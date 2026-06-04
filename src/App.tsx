//Nota: to run in Browser, uncomment the import and DevMode comp, comment the import and ProdMode comp. To run in Zedbar, do the opposite.

// import { DevMode } from "./components/mode/dev-mode";
import { ProdMode } from "./components/mode/prod-mode";

const App = () => {
  return (
    <>
      {/* <DevMode /> */}
      <ProdMode />
    </>
  );
};

export default App;

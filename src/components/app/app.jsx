import styles from "./App.module.css";
import { data, filling } from "../../utils/data";
//import Layout from "../layout/layout";
import AppHeader from "../AppHeader/AppHeader";
import { BurgerIngredients } from "../BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.containerConstructor}>
        <BurgerIngredients ingredients={data} />
        <BurgerConstructor ingredients={data} filling={filling} />
      </div>
    </div>
  );
}

export default App;

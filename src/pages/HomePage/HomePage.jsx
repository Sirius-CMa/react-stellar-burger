import styles from "./HomePage.module.css";

import { BurgerConstructor } from "Components/BurgerConstructor";
import { BurgerIngredients } from "Components/BurgerIngredients";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function HomePage() {
  return (
    <main className={styles.containerConstructor}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
}

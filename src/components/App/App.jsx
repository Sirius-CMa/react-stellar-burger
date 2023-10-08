/* eslint-disable react-hooks/exhaustive-deps */

import styles from "./App.module.css";

import { AppHeader } from "Components/AppHeader";
import { BurgerIngredients } from "Components/BurgerIngredients";
import { BurgerConstructor } from "Components/BurgerConstructor";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function App() {
  console.log("App");

  return (
    <div className={styles.container}>
      <AppHeader />
      <main className={styles.containerConstructor}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
}

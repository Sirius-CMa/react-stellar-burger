import { FC } from "react";
import styles from "./TabContainer.module.css";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { TTabContainerProps } from "../../typesData";




export const TabContainer: FC<TTabContainerProps> = ({ current, bunRef, sauceRef, mainRef, handleClick }) => {

  return (
    <div className={styles.tabContainer}>
      {" "}
      <Tab value="bun" active={current === "bun"} onClick={() => handleClick("bun", bunRef)}>
        Булки
      </Tab>
      <Tab value="sause" active={current === "sauce"} onClick={() => handleClick("sauce", sauceRef)}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={() => handleClick("main", mainRef)}>
        Начинки
      </Tab>
    </div>
  );
}

import { useState } from "react";
import styles from "./TabContainer.module.css";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export function TabContainer() {
  const [current, setCurrent] = useState("one");

  // const handeler = (arg) => {
  //   console.log(arg);
  // };

  return (
    <div className={styles.tabContainer}>
      {" "}
      <Tab value="one" active={current === "one"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === "two"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === "three"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}

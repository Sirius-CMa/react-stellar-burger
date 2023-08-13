import React from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsElement } from "../IngredientsElement";
import { ingredientsPropTypes } from "../../utils/prop-types";

export function BurgerIngredients({ ingredients }) {
  const [current, setCurrent] = React.useState("one");
  return (
    <div className={styles.container}>
      <h1>Соберите бургер</h1>
      <section style={{ display: "flex" }}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </section>
      {/*  */}
      <section className={styles.ingredients}>
        <div className={styles.div}>
          <h2>Булки</h2>
          <ul className={styles.ul}>
            {ingredients
              .filter((item) => item.type === "bun")
              .map((item) => (
                <li key={item._id} className={styles.li}>
                  <IngredientsElement element={item} />
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.div}>
          <h2>Соусы</h2>
          <ul className={styles.ul}>
            {ingredients
              .filter((item) => item.type === "sauce")
              .map((item) => (
                <li key={item._id} className={styles.li}>
                  <IngredientsElement element={item} />
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h2>Начинки</h2>
          <ul className={styles.ul}>
            {ingredients
              .filter((item) => item.type === "main")
              .map((item) => (
                <li key={item._id} className={styles.li}>
                  <IngredientsElement element={item} />
                </li>
              ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

// export default BurgerIngredients;
BurgerIngredients.propTypes = {
  ingredients: ingredientsPropTypes,
};

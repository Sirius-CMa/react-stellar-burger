import React from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsElement } from "../IngredientsElement";
import { ingredientsPropTypes } from "../../utils/prop-types";
import PropTypes from "prop-types";

export function BurgerIngredients({ ingredients, openPopup }) {
  const [current, setCurrent] = React.useState("one");
  return (
    <div className={styles.container}>
      <h2 className={`${styles.title}  text text_type_main-large mt-10 mb-5`}>Соберите бургер</h2>
      <section className={styles.tabContainer}>
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
      <section className={`${styles.ingredients} ${styles.aa}`}>
        <div className={styles.blockIngredient}>
          <h3 className={`${styles.subtitle} text text_type_main-medium`}>Булки</h3>
          <ul className={styles.wrapperList}>
            {ingredients
              .filter((item) => item.type === "bun")
              .map((item) => (
                <li key={item._id} className={styles.listItem}>
                  <IngredientsElement ingredient={item} openPopup={openPopup} />
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.blockIngredients}>
          <h3 className={`${styles.subtitle} text text_type_main-medium`}>Соусы</h3>
          <ul className={styles.wrapperList}>
            {ingredients
              .filter((item) => item.type === "sauce")
              .map((item) => (
                <li key={item._id} className={styles.listItem}>
                  <IngredientsElement ingredient={item} openPopup={openPopup} />
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.blockIngredients}>
          <h3 className={`${styles.subtitle} text text_type_main-medium`}>Начинки</h3>
          <ul className={styles.wrapperList}>
            {ingredients
              .filter((item) => item.type === "main")
              .map((item) => (
                <li key={item._id} className={styles.listItem}>
                  <IngredientsElement ingredient={item} openPopup={openPopup} />
                </li>
              ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

BurgerIngredients.propTypes = {
  ingredients: ingredientsPropTypes,
  openPopup: PropTypes.func.isRequired,
};

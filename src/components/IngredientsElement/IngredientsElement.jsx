import styles from "./IngredientsElement.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function IngredientsElement({ element }) {
  return (
    <div className={styles.container}>
      <Counter count={1} size="default" className={styles.image} />
      <img src={element.image} alt={element.name} />
      <div className={styles.description}>
        <p className={styles.price}>{element.price}</p>
        <CurrencyIcon />
      </div>
      <p className={styles.name}>{element.name}</p>
    </div>
  );
}

IngredientsElement.propTypes = {
  ingredients: ingredientPropType,
};

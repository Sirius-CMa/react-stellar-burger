import styles from "./IngredientsElement.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropTypes } from "../../utils/prop-types";
import PropTypes from "prop-types";
export function IngredientsElement({ ingredient, openPopup }) {
  return (
    <div key={new Date().getTime()} className={styles.container} onClick={() => openPopup(ingredient, "ingredient")}>
      <Counter count={1} size="default" />
      <img src={ingredient.image} alt={ingredient.name} className={styles.image} />
      <div className={styles.description}>
        <p className={`${styles.price} text text_type_main-default`}>{ingredient.price}</p>
        <CurrencyIcon />
      </div>
      <p className={`${styles.name} text text_type_main-small`}>{ingredient.name}</p>
    </div>
  );
}

IngredientsElement.propTypes = {
  ingredients: ingredientPropTypes,
  openPopup: PropTypes.func.isRequired,
};

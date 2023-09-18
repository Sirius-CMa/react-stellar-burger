import { useDispatch } from "react-redux";

import styles from "./IngredientsElement.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropTypes } from "Utils/prop-types";
// import PropTypes from "prop-types";

import { SET_IS_POPUP_OPEN } from "Action/popup";
// import { Popup } from "Components/Popup";
// import { IngredientDetails } from "Components/IngredientDetails";
import { SET_CURRENT_INGREDIENT } from "Action/burgerIngredients";

export function IngredientsElement({ ingredient }) {
  console.log("IngredientsElement");
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: SET_CURRENT_INGREDIENT, payload: ingredient });
    dispatch({ type: SET_IS_POPUP_OPEN });
  };

  return (
    <div>
      <div className={styles.container} onClick={handleClick}>
        <Counter count={1} size="default" />
        <img src={ingredient.image} alt={ingredient.name} className={styles.image} />
        <div className={styles.description}>
          <p className={`${styles.price} text text_type_main-default`}>{ingredient.price}</p>
          <CurrencyIcon />
        </div>
        <p className={`${styles.name} text text_type_main-small`}>{ingredient.name}</p>
      </div>
    </div>
  );
}

IngredientsElement.propTypes = {
  ingredient: ingredientPropTypes,
};

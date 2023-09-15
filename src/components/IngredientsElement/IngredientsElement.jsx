import { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./IngredientsElement.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropTypes } from "Utils/prop-types";
// import PropTypes from "prop-types";

import { managePopup } from "Action/popup";
export function IngredientsElement({ ingredient }) {
  const dispatch = useDispatch();

  const openPopupIngredient = () => {
    dispatch(managePopup({ type: "ingredient", ingredient }));
  };

  return (
    <div className={styles.container} onClick={openPopupIngredient}>
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
};

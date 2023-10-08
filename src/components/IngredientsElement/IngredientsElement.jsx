/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./IngredientsElement.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropTypes } from "Utils/prop-types";
// import PropTypes from "prop-types";

import { SET_IS_POPUP_OPEN } from "Action/popup";
import { SET_CURRENT_INGREDIENT } from "Action/burgerIngredients";
import { useDrag } from "react-dnd";

export function IngredientsElement({ ingredient }) {
  console.log("IngredientsElement");
  const [itemCount, setItemCount] = useState(0);
  const [bunCount, setBunCount] = useState(0);

  const dispatch = useDispatch();
  const { listIngredients, selectedBun } = useSelector((state) => state.burgerConstructor);

  useEffect(() => {
    if (ingredient.type === "bun" && ingredient._id === selectedBun._id) {
      setBunCount(2);
    } else {
      setBunCount(0);
    }
    setItemCount(listIngredients.filter((item) => item._id === ingredient._id).length);
  }, [listIngredients, selectedBun]);

  const handleClick = () => {
    dispatch({ type: SET_CURRENT_INGREDIENT, payload: ingredient });
    dispatch({ type: SET_IS_POPUP_OPEN });
  };

  const [{ opacity }, dragRef] = useDrag({
    type: "ingr",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
    }),
  });

  return (
    <div ref={dragRef} draggable style={{ opacity }}>
      <div className={styles.container} onClick={handleClick}>
        {(bunCount !== 0 || itemCount !== 0) && (
          <Counter count={ingredient.type === "bun" ? bunCount : itemCount} size="default" />
        )}
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

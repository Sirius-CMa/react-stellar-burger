import { useDispatch } from "react-redux";

import styles from "./IngredientsElement.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropTypes } from "Utils/prop-types";
// import PropTypes from "prop-types";

import { SET_IS_POPUP_OPEN } from "Action/popup";
import { SET_CURRENT_INGREDIENT } from "Action/burgerIngredients";
import { useDrag } from "react-dnd";

export function IngredientsElement({ ingredient }) {
  console.log("IngredientsElement");
  const dispatch = useDispatch();

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
    <div ref={dragRef} draggable="true" style={{ opacity }}>
      <div className={styles.container} onClick={handleClick}>
        {ingredient.count && <Counter count={ingredient.count} size="default" />}
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

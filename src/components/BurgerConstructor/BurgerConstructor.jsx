import { useDispatch, useSelector } from "react-redux";

import { BurgerElement } from "../BurgerElement";
import { Order } from "Components/Order";
import styles from "./BurgerConstructor.module.css";
// import { ingredientsPropTypes } from "Utils/prop-types";
// import PropTypes from "prop-types";
// import { filling } from "Utils/data";
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT } from "Action/burgerConstructor";
// import { FillingElement } from "Components/FillingElement";
// import { useCallback } from "react";
import { v4 } from "uuid";

export function BurgerConstructor() {
  const dispatch = useDispatch();
  const { listIngredients, selectedBun } = useSelector((state) => state.burgerConstructor);

  const [{ isOver }, dropTarget] = useDrop({
    accept: "ingr",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop(item) {
      dispatch({
        type: ADD_INGREDIENT,
        payload: item,
      });
    },
  });

  return (
    <div ref={dropTarget} className={styles.container}>
      <section className={!isOver ? styles.blockIngredients : styles.blockIngredientsHover}>
        <BurgerElement item={selectedBun} isTop isLocked />

        <ul className={styles.wrapperList}>
          {listIngredients &&
            listIngredients.map((item, i) => {
              return (
                <li key={v4()}>
                  <BurgerElement item={item} index={i} />
                </li>
              );
            })}
        </ul>

        <BurgerElement item={selectedBun} isBottom isLocked />
      </section>
      <Order />
    </div>
  );
}

// BurgerConstructor.propTypes = {
//   ingredients: ingredientsPropTypes,
//   filling: ingredientsPropTypes,
//   openPopup: PropTypes.func.isRequired,
// };

// const moveIngredient = useCallback(
//   (dragIndex, hoverIndex) => {
//     const dragItem = listIngredients[dragIndex];
//     const hoverItem = listIngredients[hoverIndex];
//     const newIngredients = [...listIngredients];
//     newIngredients[dragIndex] = hoverItem;
//     newIngredients[hoverIndex] = dragItem;

//     dispatch({ type: MOVE_INGREDIENT, sorted: newIngredients });
//   },
//   [dispatch, listIngredients]
// );

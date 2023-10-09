import { useDispatch, useSelector } from "react-redux";
import styles from "./BurgerConstructor.module.css";

import { useDrop } from "react-dnd";

import { BurgerElement } from "../BurgerElement";
import { Order } from "Components/Order";

import { ADD_INGREDIENT } from "Action/burgerConstructor";

import { v4 } from "uuid";
// import { ingredientsPropTypes } from "Utils/prop-types";
// import PropTypes from "prop-types";

export function BurgerConstructor() {
  const dispatch = useDispatch();
  const { listIngredients, selectedBun } = useSelector((state) => state.burgerConstructor);

  const [{ isOver }, dropTarget] = useDrop({
    accept: "element",
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
        <BurgerElement ingredient={selectedBun} isTop isLocked />

        <ul className={styles.wrapperList}>
          {listIngredients &&
            listIngredients.map((ingredient, i) => {
              return (
                <li key={v4()} className={styles.wrapperList__item}>
                  <BurgerElement ingredient={ingredient} index={i} />
                </li>
              );
            })}
        </ul>

        <BurgerElement ingredient={selectedBun} isBottom isLocked />
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

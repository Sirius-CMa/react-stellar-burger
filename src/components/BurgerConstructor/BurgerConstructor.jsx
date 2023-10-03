import { useDispatch, useSelector } from "react-redux";

import { BurgerElement } from "../BurgerElement";
import { Order } from "Components/Order";
import styles from "./BurgerConstructor.module.css";
// import { ingredientsPropTypes } from "Utils/prop-types";
// import PropTypes from "prop-types";
// import { filling } from "Utils/data";
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT } from "Action/burgerConstructor";
import { SET_COUNT_INGREDIENT } from "Action/burgerIngredients";

export function BurgerConstructor() {
  const dispatch = useDispatch();
  const { listIngredients, selectedBun } = useSelector((state) => state.burgerConstructor);
  // временная история с булочкой
  // const bun = listIngredients && listIngredients.find((element) => element.type === "bun");
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingr",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch({
        type: ADD_INGREDIENT,
        payload: item,
      });
      dispatch({
        type: SET_COUNT_INGREDIENT,
        payload: item,
      });
    },
  });

  return (
    <div className={styles.container} ref={dropTarget}>
      <section className={!isHover ? styles.blockIngredients : styles.blockIngredientsHover}>
        <BurgerElement item={selectedBun} isTop isLocked />

        <ul className={styles.wrapperList}>
          {listIngredients.map((item, i) => (
            <li key={i} className={styles.listElement}>
              <BurgerElement item={item} />
            </li>
          ))}{" "}
        </ul>

        <BurgerElement item={selectedBun} isBottom isLocked />
      </section>{" "}
      <Order />
    </div>
  );
}

// BurgerConstructor.propTypes = {
//   ingredients: ingredientsPropTypes,
//   filling: ingredientsPropTypes,
//   openPopup: PropTypes.func.isRequired,
// };

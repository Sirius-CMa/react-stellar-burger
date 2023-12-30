import styles from "./IngredientsElement.module.css";
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, FC } from "react";
import { useDrag } from "react-dnd";

import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { SET_IS_POPUP_OPEN } from "Action/popup";
import { SET_CURRENT_INGREDIENT } from "Action/burgerIngredients";

import { getDataBurgerConstructor } from "../../redux/Selectors";

import { TIngredientsElementProps, useAppDispatch, useAppSelector } from "../../typesData";



export const IngredientsElement: FC<TIngredientsElementProps> = ({ ingredient }) => {
  // console.log("IngredientsElement");
  const [itemCount, setItemCount] = useState<number>(0);
  const [bunCount, setBunCount] = useState<number>(0);

  const dispatch = useAppDispatch();
  const { listIngredients, selectedBun } = useAppSelector(getDataBurgerConstructor);

  useEffect(() => {
    if (ingredient.type === "bun" && ingredient._id === selectedBun._id) {
      setBunCount(2);
    } else {
      setBunCount(0);
    }
    setItemCount(listIngredients.filter((item: any) => item._id === ingredient._id).length);
  }, [listIngredients, selectedBun]);

  const handleClick = () => {
    dispatch({ type: SET_CURRENT_INGREDIENT, payload: ingredient });
    dispatch({ type: SET_IS_POPUP_OPEN });
  };

  const [{ opacity }, dragRefEl] = useDrag({
    type: "element",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
    }),
  });

  return (
    <div ref={dragRefEl} draggable className={styles.container} onClick={handleClick} style={{ opacity }}>
      {(bunCount !== 0 || itemCount !== 0) && (
        <Counter count={ingredient.type === "bun" ? bunCount : itemCount} size="default" />
      )}
      <img src={ingredient.image} alt={ingredient.name} className={styles.image} />
      <div className={styles.description}>
        <p className={`${styles.price} text text_type_main-default`}>{ingredient.price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p className={`${styles.name} text text_type_main-small`}>{ingredient.name}</p>
    </div>
  );
}

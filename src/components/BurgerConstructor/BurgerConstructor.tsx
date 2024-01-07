import styles from "./BurgerConstructor.module.css";

import { useDrop } from "react-dnd";

import { BurgerElement } from "../BurgerElement";
import { Order } from "Components/Order";

import { ADD_INGREDIENT } from "Action/burgerConstructor";

import { v4 } from "uuid";
import { getDataBurgerConstructor } from '../../redux/Selectors';
import { IIngredientTypes, TIngredient, useAppDispatch, useAppSelector } from "../../typesData";



export function BurgerConstructor() {
  const dispatch = useAppDispatch();

  const { listIngredients, selectedBun } = useAppSelector(getDataBurgerConstructor);

  const [{ isOver }, dropTarget] = useDrop({
    accept: "element",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop(item: IIngredientTypes) {
      dispatch({
        type: ADD_INGREDIENT,
        payload: { ...item, uuid: v4() },
      });
    },
  });

  return (
    <div ref={dropTarget} className={styles.container}>
      <section className={!isOver ? styles.blockIngredients : styles.blockIngredientsHover}>
        <BurgerElement ingredient={selectedBun} isTop isLocked index={55} />

        <ul className={styles.wrapperList}>
          {listIngredients &&
            listIngredients.map((ingredient: TIngredient, i: number) => {
              return (
                <li key={ingredient.uuid} className={styles.wrapperList__item}>
                  <BurgerElement ingredient={ingredient} index={i} />
                </li>
              );
            })}
        </ul>

        <BurgerElement ingredient={selectedBun} isBottom isLocked index={66} />
      </section>
      <Order />
    </div>
  );
}



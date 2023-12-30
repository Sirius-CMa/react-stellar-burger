import styles from "./OrderElement.module.css";
import { FC } from "react";

import { Link, useLocation } from "react-router-dom";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { getDataBurgerIngredients } from "../../redux/Selectors";
import { getTotalPrice } from "Utils/service-functions";
import { reformatData } from "Utils/formatTime";

import { TOrderElementProps, TSortDataById, orderStatus, useAppSelector } from "../../typesData";
import { DEFAULT_BUN } from "Utils/constants";




export const OrderElement: FC<TOrderElementProps> = ({ card, feed }) => {
  const { sortDataById } = useAppSelector(getDataBurgerIngredients);
  const location = useLocation();

  let sortListIngredientsById: TSortDataById = !sortDataById ? { '': DEFAULT_BUN } : sortDataById
  if (sortDataById === null) return null;

  const { time, currentDay } = reformatData(card);

  const cardIngredients = card.ingredients.filter((a) => a);
  const totalPrice = getTotalPrice(card.ingredients, sortDataById);
  return (
    <li className={`${feed ? styles.containerFeed : styles.container} mb-6`} key={card._id}>
      <Link className={styles.link} to={`${location.pathname}/${card.number}`} state={{ background: location }}>
        <div className={`${styles.info} mb-6`}>
          <p className="text text_type_digits-default">{`#0${card.number}`}</p>
          <p className="text text_type_main-default text_color_inactive">{`${currentDay}, в ${time} i-GMT+3`}</p>
        </div>
        <h2 className="text text_type_main-medium mb-2">{card.name}</h2>
        <p
          //: видимость статуса для popup и ленты
          className={`${styles.visible} text text_type_main-small mb-7`}
          style={{ color: orderStatus[card.status][1] }}
        >
          {orderStatus[card.status][0]}
        </p>
        <div className={styles.dataBox}>
          <ul className={styles.ingredientList}>
            {cardIngredients.length > 5 ? (
              <li className={styles.imageContainer} key={5}>
                <img className={styles.imgage} src={sortListIngredientsById[card.ingredients[5]].image} alt={sortListIngredientsById[card.ingredients[5]].name} />
                <p className={`${styles.number} text text_type_digits-default`}>{`+${cardIngredients.length - 5}`}</p>
              </li>
            ) : null}
            {cardIngredients &&
              cardIngredients.slice(0, 4).map((card, index) => (
                <li className={styles.imageContainer} key={index}>
                  <img className={styles.imgage} src={sortListIngredientsById[card].image} alt={sortListIngredientsById[card].name} />
                </li>
              ))}
          </ul>
          <div className={styles.priceContainer}>
            <p className="text text_type_digits-default mr-2">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
}


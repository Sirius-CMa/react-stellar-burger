import styles from "./OrderElement.module.css";

import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { reformatData } from "Utils/formatTime";

import { getDataBurgerIngredients } from "Selectors";
import { getTotalPrice } from "Utils/service-functions";
import { orderStatus } from "Utils/constants";

export function OrderElement({ card }) {
  const { sortDataById } = useSelector(getDataBurgerIngredients);
  const location = useLocation();

  if (sortDataById === null) return null;

  const { time, currentDay } = reformatData(card);

  const cardIngredients = card.ingredients.filter((a) => a);
  const totalPrice = getTotalPrice(card.ingredients, sortDataById);

  return (
    <li className={`${styles.listItem} mb-6`}>
      <Link className={styles.link} to={`${location.pathname}/${card.number}`} state={{ background: location }}>
        <div className={`${styles.textBox} mb-6`}>
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
          <ul className={styles.ingrList}>
            {cardIngredients.length > 5 ? (
              <li className={styles.ingItem} key={5}>
                <img src={sortDataById[card.ingredients[5]].image} alt={sortDataById[card.ingredients[5]].name} className={styles.img} />
                <p className={`${styles.ingDigit} text text_type_digits-default`}>{`+${cardIngredients.length - 5}`}</p>
              </li>
            ) : null}
            {cardIngredients &&
              cardIngredients.slice(0, 4).map((card, index) => (
                <li className={styles.ingItem} key={index}>
                  <img src={sortDataById[card].image} alt={sortDataById[card].name} className={styles.img} />
                </li>
              ))}
          </ul>
          <div className={styles.textContainer}>
            <p className="text text_type_digits-default mr-2">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
}

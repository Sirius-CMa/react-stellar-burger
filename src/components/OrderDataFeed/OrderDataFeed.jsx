import styles from "./OrderDataFeed.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { format } from "date-fns";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { getDataBurgerIngredients } from "Selectors";
import { getCurrentDate } from "Utils/formatTime";
import { getDataFeed } from "Selectors";
import { getTotalPrice } from "Utils/service-functions";
import { orderStatus } from "Utils/constants";

export function OrderDataFeed({ card }) {
  console.log(88);
  const { number } = useParams();
  console.log(number);
  // const location = useLocation();
  const { sortedOrdersByNumber } = useSelector(getDataFeed);
  const { sortDataById } = useSelector(getDataBurgerIngredients);

  const turgetOrder = sortedOrdersByNumber[number];
  const listIngredients = turgetOrder.ingredients;

  const time = format(new Date(turgetOrder.createdAt), "hh:mm");
  const date = new Date(turgetOrder.createdAt);
  const currentDay = getCurrentDate(date);

  const totalPrice = getTotalPrice(turgetOrder.ingredients, sortDataById);

  // GET https://norma.nomoreparties.space/api/orders/{номер заказа}
  // http://localhost:3000/feed/27376 создать отдельный редьюсер и action

  return (
    //: реализовать выбор класса через пропс для popup и страницы
    <div className={styles.container}>
      <p className="text text_type_digits-default mb-10 mt-1">#0{turgetOrder.number}</p>
      <h2 className="text text_type_main-medium mb-2">{turgetOrder.name}</h2>
      <p
        className={`${styles.statusText} text text_type_main-default mb-10`}
        style={{ color: orderStatus[turgetOrder.status][1] }}
      >
        {orderStatus[turgetOrder.status][0]}
      </p>
      <p className="text text_type_main-medium mb-8">Cостав</p>
      <ul className={`${styles.listIngredients}`}>
        {listIngredients &&
          listIngredients.map((idIngredient, index) => (
            <li className={styles.ingredient} key={index}>
              <div className={`${styles.imagContainer}`}>
                <img
                  src={sortDataById[idIngredient].image}
                  alt={sortDataById[idIngredient].name}
                  className={`${styles.image} mr-4`}
                />
                <p className={`text text_type_main-default`}>{sortDataById[idIngredient].name}</p>
              </div>
              <div className={`${styles.priceContainer}`}>
                <p className={`text text_type_digits-default mr-2`}>{sortDataById[idIngredient].price}</p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          ))}
      </ul>
      <div className={`${styles.infoBlock} mt-10`}>
        <p className="text text_type_main-default text_color_inactive">
          {`${currentDay}, в ${time} i-GMT+3` || "Загрузка..."}
        </p>
        <div className={`${styles.priceContainer}`}>
          <p className="text text_type_digits-default mr-4 mb-4">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

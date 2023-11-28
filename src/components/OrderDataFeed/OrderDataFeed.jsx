import styles from "./OrderDataFeed.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { getDataBurgerIngredients } from "Selectors";
import { reformatData } from "Utils/formatTime";
import { getTotalPrice } from "Utils/service-functions";
import { orderStatus } from "Utils/constants";
import { getOneOrder } from "Action/getOneOrder";
import { getDataOneOrder } from "Selectors";
import { getAllIngredients } from "Action/burgerIngredients";

export function OrderDataFeed({ notPopup }) {
  const dispatch = useDispatch();
  const { number } = useParams();

  const { sortDataById } = useSelector(getDataBurgerIngredients);
  const { order } = useSelector(getDataOneOrder);

  useEffect(() => {
    dispatch(getOneOrder(number));
    dispatch(getAllIngredients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (sortDataById === null || order === null) return null;

  const turgetOrder = order[0];

  const listIngredients = turgetOrder.ingredients.filter((a) => a);

  const { time, currentDay } = reformatData(turgetOrder);

  const totalPrice = getTotalPrice(turgetOrder.ingredients, sortDataById);

  return (
    <div className={notPopup ? styles.containerPage : styles.container}>
      <p className={`${notPopup && styles.title} text text_type_digits-default mb-10 mt-1`}>#0{turgetOrder.number}</p>
      <h2 className="text text_type_main-medium mb-2">{turgetOrder.name}</h2>
      <p className={`${styles.statusText} text text_type_main-default mb-10`} style={{ color: orderStatus[turgetOrder.status][1] }}>
        {orderStatus[turgetOrder.status][0]}
      </p>
      <p className="text text_type_main-medium mb-8">Cостав</p>
      <ul className={`${styles.listIngredients}`}>
        {listIngredients &&
          listIngredients.map((idIngredient, index) => (
            <li className={styles.ingredient} key={index}>
              <div className={`${styles.imagContainer}`}>
                <img src={sortDataById[idIngredient].image} alt={sortDataById[idIngredient].name} className={`${styles.image} mr-4`} />
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
        <p className="text text_type_main-default text_color_inactive">{`${currentDay}, в ${time} i-GMT+3` || "Загрузка..."}</p>
        <div className={`${styles.priceContainer}`}>
          <p className="text text_type_digits-default mr-4 mb-4">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

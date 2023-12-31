import styles from "./OrderDataFeed.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { useParams } from "react-router-dom";
import { FC, useEffect } from "react";

import { getDataBurgerIngredients, getDataOneOrder } from "../../redux/Selectors";
import { reformatData } from "Utils/formatTime";
import { getTotalPrice } from "Utils/service-functions";
// import { orderStatus } from "Utils/constants";
import { TOrderDataFeedProps, TSortDataById, orderStatus, useAppDispatch, useAppSelector } from "../../typesData";
import { getOneOrder } from "Action/getOneOrder";
import { getAllIngredients } from "Action/burgerIngredients";
import { DEFAULT_BUN } from "Utils/constants";

// type TParams2={
//   number?: number;
// }

export const OrderDataFeed: FC<TOrderDataFeedProps> = ({ notPopup }) => {
  const dispatch = useAppDispatch();
  const { number } = useParams();

  useEffect(() => {
    dispatch(getOneOrder(number));
    dispatch(getAllIngredients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const { sortDataById } = useAppSelector(getDataBurgerIngredients);
  const { order } = useAppSelector<any>(getDataOneOrder);



  const turgetOrder = order[0];
  const listIngredients: Array<string> = turgetOrder.ingredients.filter((a: any) => a);

  const { time, currentDay } = reformatData(turgetOrder);
  const totalPrice = getTotalPrice(turgetOrder.ingredients, sortDataById);
  let sortListIngredientsById: TSortDataById = !sortDataById ? { '': DEFAULT_BUN } : sortDataById;
  if (sortDataById === null || order === null) return null;


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
          listIngredients.map((idIngredient: string, index: number) => (

            <li className={styles.ingredient} key={index}>
              <div className={`${styles.description}`}>
                <img src={sortListIngredientsById[idIngredient].image} alt={sortListIngredientsById[idIngredient].name} className={`${styles.image} mr-4`} />
                <p className={`text text_type_main-default`}>{sortListIngredientsById[idIngredient]?.name}</p>
              </div>
              <div className={`${styles.priceContainer}`}>
                <p className={`text text_type_digits-default mr-2`}>{sortListIngredientsById[idIngredient].price}</p>
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
};

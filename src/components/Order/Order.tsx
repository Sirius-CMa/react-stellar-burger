import styles from "./Order.module.css";

import { useMemo } from "react";

import { useNavigate } from "react-router-dom";

import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { REMOVE_ORDER_DATA, getOrderDetailsAction } from "Action/order";
import { Popup } from "Components/Popup";
import { OrderDetails } from "Components/OrderDetails";
import { getDataBurgerConstructor, getDataOrder, selectAuth } from "../../redux/Selectors";

import { paths } from "Utils/paths";
import { IIngredientTypes, useAppDispatch, useAppSelector } from "../../typesData";

export function Order() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { number, requestOrder } = useAppSelector(getDataOrder);
  const { selectedBun, listIngredients } = useAppSelector(getDataBurgerConstructor);
  const auth = useAppSelector(selectAuth);

  const sum = useMemo(() => {
    return selectedBun.price * 2 + listIngredients.reduce((acc: number, el: IIngredientTypes) => acc + el.price, 0);
  }, [selectedBun, listIngredients]);

  const handleClick = () => {
    if (!auth) {
      navigate(paths.login);
    } else {
      const ingredientsId = [...Array(2).fill(selectedBun._id), ...listIngredients.map((el) => el._id)];
      dispatch(getOrderDetailsAction({ ingredients: ingredientsId }));
    }
  };

  const handleClosePopup = () => {
    dispatch({ type: REMOVE_ORDER_DATA })
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={`${styles.blockPrice} mr-10`}>
          <p className={`${styles.price} text text_type_main-large `}>{sum}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={handleClick}>
          {requestOrder ? "Отправка заказа ..." : auth ? "Оформить заказ" : "Войти"}
        </Button>
      </div>
      {number && (
        <Popup handleClosePopup={handleClosePopup}>
          <OrderDetails number={number} />
        </Popup>
      )}
    </div>
  );
}

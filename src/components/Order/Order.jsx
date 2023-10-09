import styles from "./Order.module.css";

import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { getOrderDetailsAction } from "Action/order";
import { Popup } from "Components/Popup";
import { OrderDetails } from "Components/OrderDetails";

export function Order() {
  const dispatch = useDispatch();
  const { number } = useSelector((store) => store.order);
  const { selectedBun, listIngredients } = useSelector((store) => store.burgerConstructor);

  const sum = useMemo(() => {
    return selectedBun.price * 2 + listIngredients.reduce((acc, el) => acc + el.price, 0);
  }, [selectedBun, listIngredients]);

  const handleClick = () => {
    const ingredientsId = [...Array(2).fill(selectedBun._id), ...listIngredients.map((el) => el._id)];
    // console.log(ingredientsId);
    dispatch(getOrderDetailsAction({ ingredients: ingredientsId }));
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={`${styles.blockPrice} mr-10`}>
          <p className={`${styles.price} text text_type_main-large `}>{sum}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={handleClick}>
          Оформить заказ
        </Button>
      </div>
      {number && (
        <Popup>
          <OrderDetails number={number} />
        </Popup>
      )}
    </div>
  );
}

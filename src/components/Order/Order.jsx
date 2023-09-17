import styles from "./Order.module.css";

import { useDispatch, useSelector } from "react-redux";

import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { getOrderDetailsAction } from "Action/order";
import { Popup } from "Components/Popup";
import { OrderDetails } from "Components/OrderDetails";
import { SET_IS_POPUP_OPEN } from "Action/popup";

export function Order() {
  const dispatch = useDispatch();
  const { isPopupOpen } = useSelector((store) => store.managePopup);
  const { id } = useSelector((store) => store.order);
  // const dd = undefined;
  const handleClick = () => {
    dispatch(getOrderDetailsAction({ ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa093c"] }));
    dispatch({ type: SET_IS_POPUP_OPEN });
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={`${styles.blockPrice} mr-10`}>
          <p className={`${styles.price} text text_type_main-large `}>12345</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={handleClick}>
          Оформить заказ
        </Button>
      </div>
      {id && isPopupOpen && (
        <Popup>
          <OrderDetails id={id} />
        </Popup>
      )}
    </div>
  );
}

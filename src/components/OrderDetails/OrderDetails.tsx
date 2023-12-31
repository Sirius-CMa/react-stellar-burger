import styles from "./OrderDetails.module.css";

import icon from "../../image/done.png";
import { TOrderDetailsProps } from "../../typesData";
import { FC } from "react";


export const OrderDetails: FC<TOrderDetailsProps> = ({ number }) => {
  return (
    <div className={`${styles.container} mt-30`}>
      <p className="text text_type_digits-large mb-8">{number}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={icon} alt="done" />
      <p className="text text_type_main-default mt-15 ">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-30  mt-2">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}



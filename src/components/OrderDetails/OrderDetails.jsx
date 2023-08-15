import styles from "./OrderDetails.module.css";
import icon from "../../image/done.png";

export function OrderDetails() {
  return (
    <div className={`${styles.container} `}>
      <p className="text text_type_digits-large mb-8">034536</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={icon} alt="done" />
      <p className="text text_type_main-default mt-15 mb-2 ">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

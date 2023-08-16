import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
// import { filling } from "../../utils/data";
import { BurgerElement } from "../BurgerElement";
import styles from "./BurgerConstructor.module.css";
import { ingredientsPropTypes } from "../../utils/prop-types";
import PropTypes from "prop-types";

export function BurgerConstructor({ ingredients, filling, openPopup }) {
  return (
    <div className={styles.container}>
      <section className={styles.blockIngredients}>
        <BurgerElement item={ingredients[0]} isTop isLocked />

        <ul className={styles.ul}>
          {filling.map((item, i) => (
            <li key={i} className={styles.li}>
              <BurgerElement item={item} />
            </li>
          ))}
        </ul>

        <BurgerElement item={ingredients[0]} isBottom isLocked />
      </section>
      <section className={styles.order}>
        <div className={`${styles.blockPrice} mr-10`}>
          <p className={`${styles.price} text text_type_main-large `}>12345</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {
            openPopup("", "order");
          }}
        >
          Оформить заказ
        </Button>
      </section>
    </div>
  );
}

BurgerConstructor.propTypes = {
  ingredients: ingredientsPropTypes,
  filling: ingredientsPropTypes,
  openPopup: PropTypes.func.isRequired,
};

import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerElement } from "../BurgerElement";
import styles from "./BurgerConstructor.module.css";
import { ingredientsPropTypes } from "../../utils/prop-types";
import PropTypes from "prop-types";

export function BurgerConstructor({ ingredients, filling, openPopup }) {
  // временная история с булочкой
  const bun = ingredients.find((element) => element.type === "bun");

  return (
    <div className={styles.container}>
      <section className={styles.blockIngredients}>
        <BurgerElement item={bun} isTop isLocked />

        <ul className={styles.ul}>
          {filling.map((item, i) => (
            <li key={i} className={styles.li}>
              <BurgerElement item={item} />
            </li>
          ))}
        </ul>

        <BurgerElement item={bun} isBottom isLocked />
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

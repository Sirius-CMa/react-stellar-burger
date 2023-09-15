import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerElement } from "../BurgerElement";
import styles from "./BurgerConstructor.module.css";
// import { ingredientsPropTypes } from "Utils/prop-types";
// import PropTypes from "prop-types";
import { filling } from "Utils/data";

export function BurgerConstructor() {
  // временная история с булочкой
  const bun = filling.find((element) => element.type === "bun");
  const aa = () => console.log(123);
  return (
    <div className={styles.container}>
      <section className={styles.blockIngredients}>
        <BurgerElement item={bun} isTop isLocked />

        <ul className={styles.wrapperList}>
          {filling.map((item, i) => (
            <li key={i} className={styles.listElement}>
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
          onClick={aa}
          // openPopup("", "order");
        >
          Оформить заказ
        </Button>
      </section>
    </div>
  );
}

// BurgerConstructor.propTypes = {
//   ingredients: ingredientsPropTypes,
//   filling: ingredientsPropTypes,
//   openPopup: PropTypes.func.isRequired,
// };

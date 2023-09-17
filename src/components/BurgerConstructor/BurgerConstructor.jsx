// import { useDispatch } from "react-redux";

import { BurgerElement } from "../BurgerElement";
import { Order } from "Components/Order";
import styles from "./BurgerConstructor.module.css";
// import { ingredientsPropTypes } from "Utils/prop-types";
// import PropTypes from "prop-types";
import { filling } from "Utils/data";

export function BurgerConstructor() {
  // временная история с булочкой
  const bun = filling.find((element) => element.type === "bun");
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
      <Order />
    </div>
  );
}

// BurgerConstructor.propTypes = {
//   ingredients: ingredientsPropTypes,
//   filling: ingredientsPropTypes,
//   openPopup: PropTypes.func.isRequired,
// };

//ConstructorElement
import styles from "./BurgerElement.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropTypes } from "../../utils/prop-types";
import PropTypes from "prop-types";

export function BurgerElement({ item, isTop, isBottom, isLocked }) {
  return (
    <div
      key={new Date().getTime()}
      className={`${styles.container} ${isLocked && styles.container_notIcon}`}
    >
      {/* лишний класс */}
      <div className={styles.blockElement}>
        {isLocked ? "" : <DragIcon type="secondary" />}

        <ConstructorElement
          text={`${item.name} ${isTop ? " (верх)" : isBottom && " (низ)"}`}
          thumbnail={item.image}
          type={isTop ? "top" : isBottom && "bottom"}
          isLocked={isLocked ? true : false}
          price={item.price}
        />
      </div>
    </div>
  );
}

BurgerElement.propTypes = {
  item: ingredientPropTypes,
  isTop: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]),
  isBottom: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]),
  isLocked: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]),
};

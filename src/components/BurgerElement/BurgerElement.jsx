//ConstructorElement
import styles from "./BurgerElement.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

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

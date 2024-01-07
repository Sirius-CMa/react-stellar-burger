import styles from "./BurgerElement.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { FC, useRef } from "react";

import { DELETE_INGREDIENT, moveIngredient } from "Action/burgerConstructor";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";

import { TBurgerElement, useAppDispatch } from "../../typesData";

type TDropItem = {
  index: number;
};


export const BurgerElement: FC<TBurgerElement> = ({ ingredient, isTop, isBottom, isLocked, index }) => {

  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickDelete = (index: number) => {
    dispatch({
      type: DELETE_INGREDIENT,
      index,
    });
  };

  const [, drop] = useDrop({
    accept: "ingredient",
    hover: (item: TDropItem, monitor: DropTargetMonitor) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const hoverActualY = monitor.getClientOffset()!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      dispatch(moveIngredient(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  dragRef(drop(ref));

  return (
    <div
      className={`${isLocked ? styles.container_notIcon : styles.container}`}
      ref={ref}
      style={{ opacity }}
    >
      <div className={styles.blockElement}>
        {isLocked ? "" : <DragIcon type={'primary'} />}

        <ConstructorElement
          text={`${ingredient.name} ${isTop ? " (верх)" : isBottom ? " (низ)" : ""}`}
          thumbnail={ingredient.image}
          type={isTop ? 'top' : isBottom ? 'bottom' : undefined}
          isLocked={isLocked ? true : false}
          price={ingredient.price}
          handleClose={() => handleClickDelete(index)}
        />
      </div>
    </div>
  );
}



import styles from "./BurgerElement.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropTypes } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { DELETE_INGREDIENT, moveIngredient } from "Action/burgerConstructor";
import { useDrag, useDrop } from "react-dnd";

export function BurgerElement({ ingredient, isTop, isBottom, isLocked, index }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const handleClickDelete = (index) => {
    dispatch({
      type: DELETE_INGREDIENT,
      index,
    });
  };

  const [, drop] = useDrop({
    accept: "ingredient",
    hover: (item, monitor) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

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
      className={`${styles.container} ${isLocked && styles.container_notIcon}`}
      ref={isLocked ? null : ref}
      style={{ opacity }}
    >
      <div className={styles.blockElement}>
        {isLocked ? "" : <DragIcon type="secondary" />}

        <ConstructorElement
          text={`${ingredient.name} ${isTop ? " (верх)" : isBottom ? " (низ)" : ""}`}
          thumbnail={ingredient.image}
          type={isTop ? "top" : isBottom && "bottom"}
          isLocked={isLocked ? true : false}
          price={ingredient.price}
          handleClose={() => handleClickDelete(index)}
        />
      </div>
    </div>
  );
}

BurgerElement.propTypes = {
  ingredient: ingredientPropTypes,
  isTop: PropTypes.oneOfType([PropTypes.bool.isRequired, PropTypes.oneOf([null])]),
  isBottom: PropTypes.oneOfType([PropTypes.bool.isRequired, PropTypes.oneOf([null])]),
  isLocked: PropTypes.oneOfType([PropTypes.bool.isRequired, PropTypes.oneOf([null])]),
  index: PropTypes.number,
};

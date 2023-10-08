import { BurgerElement } from "Components/BurgerElement";
import styles from "./FillingElement.module.css";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { DELETE_INGREDIENT, moveIngredient } from "Action/burgerConstructor";
// import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

export function FillingElement({ item, index }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const handleClickDelete = (index) => {
    dispatch({
      type: DELETE_INGREDIENT,
      index,
    });
  };

  const [, drop] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;
      dispatch(moveIngredient(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  const [{ opacity }, drag] = useDrag({
    type: "item",
    item: { item, index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  // drag(drop(ref));
  const dragDropRef = drag(drop(ref));

  return (
    <li ref={dragDropRef} key={new Date()} className={styles.listElement} style={{ opacity: opacity }}>
      <BurgerElement item={item} handleClickDelete={handleClickDelete} index={index} />
    </li>
  );
}

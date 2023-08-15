import styles from "./IngredientsElement.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Modal } from "../Modal";
import { IngredientDetails } from "../IngredientDetails";
import { ingredientPropType } from "../../utils/prop-types";
export function IngredientsElement({ element }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div
      key={new Date().getTime()}
      className={styles.container}
      onClick={openModal}
    >
      <Counter count={1} size="default" />
      <img src={element.image} alt={element.name} className={styles.image} />
      <div className={styles.description}>
        <p className={`${styles.price} text text_type_main-default`}>
          {element.price}
        </p>
        <CurrencyIcon />
      </div>
      <p className={`${styles.name} text text_type_main-small`}>
        {element.name}
      </p>
      {showModal && (
        <Modal close={closeModal}>
          <IngredientDetails props={element} />
        </Modal>
      )}
    </div>
  );
}

IngredientsElement.propTypes = {
  ingredients: ingredientPropType,
};

/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";

import styles from "./Popup.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { PopupOverlay } from "../PopupOverlay/PopupOverlay";
import PropTypes from "prop-types";

import { SET_IS_POPUP_CLOSE } from "Action/popup";
import { REMOVE_ORDER_DATA } from "Action/order";
import { REMOVE_CURRENT_INGREDIENT } from "Action/burgerIngredients";
import { getDataBurgerIngredients, getDataOrder } from "Selectors";

const $popupRoot = document.getElementById("popup");

export function Popup({ children }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(getDataBurgerIngredients);
  const { number } = useSelector(getDataOrder);

  useEffect(() => {
    const closePopupByEsc = (evt) => {
      if (evt.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("keydown", closePopupByEsc);
    return () => {
      document.removeEventListener("keydown", closePopupByEsc);
    };
  }, []);

  const closePopup = () => {
    number ? dispatch({ type: REMOVE_ORDER_DATA }) : dispatch({ type: REMOVE_CURRENT_INGREDIENT });
    dispatch({ type: SET_IS_POPUP_CLOSE });
  };

  return ReactDOM.createPortal(
    <>
      <PopupOverlay closePopup={closePopup} />
      <div className={`${styles.container}  ${isLoading && styles.load}`}>
        <button className={`${styles.closeButton} ${isLoading && styles.closeButton_loadScreen}`} onClick={closePopup}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </>,
    $popupRoot
  );
}

Popup.propTypes = {
  children: PropTypes.element,
};

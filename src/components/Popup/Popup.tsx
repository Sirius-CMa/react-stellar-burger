/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useEffect } from "react";

import styles from "./Popup.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import { PopupOverlay } from "../PopupOverlay/PopupOverlay";

// import { SET_IS_POPUP_CLOSE } from "Action/popup";
import { REMOVE_ORDER_DATA } from "Action/order";
import { REMOVE_CURRENT_INGREDIENT } from "Action/burgerIngredients";
import { selectIsLoading, selectNumber } from "../../redux/Selectors";
import { TPopupProps, useAppDispatch, useAppSelector } from "../../typesData";

const $popupRoot = document.getElementById("popup") as HTMLElement;



export const Popup: FC<TPopupProps> = ({ handleClosePopup, children }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const number = useAppSelector(selectNumber);

  useEffect(() => {
    const closePopupByEsc = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("keydown", closePopupByEsc);
    return () => {
      document.removeEventListener("keydown", closePopupByEsc);
    };
  }, []);

  const closePopup = useCallback(() => {
    if (number) {
      dispatch({ type: REMOVE_ORDER_DATA });
    } else {
      dispatch({ type: REMOVE_CURRENT_INGREDIENT });
      handleClosePopup();
    }
  }, [handleClosePopup]);

  return ReactDOM.createPortal(
    <>
      <PopupOverlay closePopup={closePopup} />
      <div className={`${styles.container}  ${isLoading && styles.load}`}>
        <button className={`${styles.closeButton} ${isLoading && styles.closeButton_loadScreen}`} onClick={closePopup} title={'closeButton'}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </>,
    $popupRoot
  );
};

// Popup.propTypes = {
//   children: PropTypes.element,
//   handleClosePopup: PropTypes.func,
// };

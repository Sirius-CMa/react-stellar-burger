/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";

import styles from "./Popup.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { PopupOverlay } from "../PopupOverlay/PopupOverlay";
import PropTypes from "prop-types";

import { managePopup } from "Action/popup";
import { REMOVE_ORDER_DATA } from "Action/order";

const $popupRoot = document.getElementById("popup");

export function Popup({ children }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.managePopup);

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
    dispatch({ type: REMOVE_ORDER_DATA });
    dispatch(managePopup({ type: "close" }));
  };

  return ReactDOM.createPortal(
    <>
      <PopupOverlay closePopup={closePopup} />
      <div className={`${styles.container}  ${loading && styles.load}`}>
        <button className={`${styles.closeButton} ${loading && styles.closeButton_loadScreen}`} onClick={closePopup}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </>,
    $popupRoot
  );
}

PopupOverlay.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

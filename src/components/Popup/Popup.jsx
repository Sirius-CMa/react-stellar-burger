/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./Popup.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { PopupOverlay } from "../PopupOverlay/PopupOverlay";
import PropTypes from "prop-types";

const $popupRoot = document.getElementById("popup");

export function Popup({ closePopup, load, children }) {
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

  return ReactDOM.createPortal(
    <>
      <PopupOverlay closePopup={closePopup} />
      <div className={`${styles.container}  ${load && styles.load}`}>
        <button className={`${styles.closeButton} ${load && styles.closeButton_loadScreen}`} onClick={closePopup}>
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

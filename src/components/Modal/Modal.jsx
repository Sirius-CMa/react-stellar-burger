/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../ModalOverlay";
import ReactDOM from "react-dom";
import { useEffect } from "react";

const modalRoot = document.getElementById("react-modals");

export function Modal({ close, children }) {
  console.log(close);
  const closeByEsc = (evt) => {
    if (evt.key === "Escape") {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closeByEsc);
    return () => {
      document.removeEventListener("keydown", closeByEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay close={close} />
      <div key={new Date().getTime()} className={`${styles.container}`}>
        <button className={`${styles.closeButton}`} onClick={close}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </>,
    modalRoot
  );
}

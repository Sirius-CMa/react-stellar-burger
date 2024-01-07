import { FC } from "react";
import styles from "./PopupOverlay.module.css";
import { TPopupOverlay } from "../../typesData";


export const PopupOverlay: FC<TPopupOverlay> = ({ closePopup }) => {
  return <div className={`${styles.overlay}`} onClick={closePopup} id="overlay"></div>;
};

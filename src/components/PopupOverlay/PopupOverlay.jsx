import styles from "./PopupOverlay.module.css";

export const PopupOverlay = (props) => {
  const closePopupByClickOverley = (e) => {
    if (e.target.id === "overlay") {
      props.closePopup();
    }
  };

  return (
    <div
      key={new Date().getTime()}
      className={`${styles.overlay}`}
      onClick={closePopupByClickOverley}
      id="overlay"
    ></div>
  );
};

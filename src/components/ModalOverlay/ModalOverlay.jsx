// ModalOverlay

import styles from "./ModalOverlay.module.css";

export const ModalOverlay = (props) => {
  const closeModal = (e) => {
    if (e.target.id === "overlay") {
      props.close();
    }
  };

  return (
    <div
      key={new Date().getTime()}
      className={`${styles.overlay}`}
      onClick={closeModal}
      id="overlay"
    ></div>
  );
};

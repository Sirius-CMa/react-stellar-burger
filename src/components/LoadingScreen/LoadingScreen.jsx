import styles from "./LoadingScreen.module.css";

import loadImage from "../../image/load3.jpg";
import errorimage from "../../image/load4.jpg";

export const LoadingScreen = ({ load, error }) => {
  return (
    <div className={`${styles.container}`}>
      {error ? <img src={errorimage} alt="Ошибка" /> : load && <img src={loadImage} alt="Загрузка" />}
    </div>
  );
};

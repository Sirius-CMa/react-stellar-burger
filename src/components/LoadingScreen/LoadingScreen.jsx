// import { useSelector } from "react-redux";

import styles from "./LoadingScreen.module.css";

import loadImage from "../../image/load3.jpg";
import errorimage from "../../image/load4.jpg";

export const LoadingScreen = ({ isLoading, isError }) => {
  // const { loading, error } = useSelector((store) => store.managePopup);
  return (
    <div className={`${styles.container}`}>
      {isError ? <img src={errorimage} alt="Ошибка" /> : isLoading && <img src={loadImage} alt="Загрузка" />}
    </div>
  );
};

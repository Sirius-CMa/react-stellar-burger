import styles from "./LoadingScreen.module.css";

import loadImage from "../../image/load3.jpg";
import errorimage from "../../image/load4.jpg";
import { TLoadingScreenProps } from "../../typesData";
import { FC } from "react";



export const LoadingScreen: FC<TLoadingScreenProps> = ({ isLoading, isError }) => {
  return (
    <div className={`${styles.container}`}>
      {isError ? <img src={errorimage} alt="Ошибка" /> : isLoading && <img src={loadImage} alt="Загрузка" />}
    </div>
  );
};

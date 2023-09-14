/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./App.module.css";

import { AppHeader } from "../AppHeader";
import { BurgerIngredients } from "../BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor";
import { IngredientDetails } from "../IngredientDetails";
import { Popup } from "../Popup";
import { useEffect, useState } from "react";
import { OrderDetails } from "../OrderDetails";
import { LoadingScreen } from "../LoadingScreen";

import Api from "../../utils/Api";
import { dataServer } from "../../utils/constants";
// начинка для бургера
import { filling } from "../../utils/data";
import { usePopup } from "../../hooks/usePopup";

export function App() {
  const api = new Api(dataServer);

  const { isPopupOpen, openPopup, closePopup, ingredient } = usePopup();
  const [serverData, setServerData] = useState({
    data: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    api
      .loadIngredients()
      .then((res) => {
        setServerData({ ...serverData, data: res.data, loading: false });
      })
      .catch((err) => {
        console.log("Ошибка сервера   : ", err);
        setServerData({ ...serverData, error: true, loading: true });
      });
  }, []);

  return (
    <div className={styles.container}>
      {!serverData.loading && (
        <>
          <AppHeader />
          <main className={styles.containerConstructor}>
            <BurgerIngredients ingredients={serverData.data} openPopup={openPopup} />
            <BurgerConstructor ingredients={serverData.data} filling={filling} openPopup={openPopup} />
          </main>
        </>
      )}

      {isPopupOpen && (
        <Popup closePopup={closePopup}>
          {ingredient ? <IngredientDetails props={ingredient} /> : <OrderDetails />}
        </Popup>
      )}

      {serverData.loading && (
        <Popup closePopup={closePopup} load={serverData.loading}>
          <LoadingScreen load={serverData.loading} error={serverData.error} />
        </Popup>
      )}
    </div>
  );
}

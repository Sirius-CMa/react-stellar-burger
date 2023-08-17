/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./App.module.css";
// начинка для бургера
import { filling } from "../../utils/data";
import { AppHeader } from "../AppHeader";
import { BurgerIngredients } from "../BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor";
import { IngredientDetails } from "../IngredientDetails";
import { Popup } from "../Popup";
import { useEffect, useState } from "react";
import { OrderDetails } from "../OrderDetails";
import Api from "../../utils/Api";
import { dataServer } from "../../utils/constants";
import { LoadingScreen } from "../LoadingScreen";

export function App() {
  const api = new Api(dataServer);

  const [showPopup, setShowPopup] = useState(false);
  const [ingredient, setIngredient] = useState({});
  const [targetPopup, setTargetPopup] = useState();
  const [serverData, setServerData] = useState({
    data: [],
    loading: true,
    error: false,
  });

  const openPopup = (ingredient, popup) => {
    popup === "ingredient" && setIngredient(ingredient);
    setTargetPopup(popup);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    ingredient && setIngredient({});
    setTargetPopup("");
  };

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
          <div className={styles.containerConstructor}>
            <BurgerIngredients ingredients={serverData.data} openPopup={openPopup} />
            <BurgerConstructor ingredients={serverData.data} filling={filling} openPopup={openPopup} />
          </div>
        </>
      )}

      {showPopup && (
        <Popup closePopup={closePopup}>
          {targetPopup === "ingredient" ? <IngredientDetails props={ingredient} /> : <OrderDetails />}
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

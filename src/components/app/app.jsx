import styles from "./App.module.css";
import { data, filling } from "../../utils/data";
import AppHeader from "../AppHeader/AppHeader";
import { BurgerIngredients } from "../BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor";
import { IngredientDetails } from "../IngredientDetails";
import { Popup } from "../Popup";
import { useState } from "react";
import { OrderDetails } from "../OrderDetails";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [ingredient, setIngredient] = useState({});
  const [targetPopup, setTargetPopup] = useState();

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

  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.containerConstructor}>
        <BurgerIngredients ingredients={data} openPopup={openPopup} />
        <BurgerConstructor
          ingredients={data}
          filling={filling}
          openPopup={openPopup}
        />
      </div>
      {showPopup && (
        <Popup closePopup={closePopup} openPopup={openPopup}>
          {targetPopup === "ingredient" ? (
            <IngredientDetails props={ingredient} />
          ) : (
            <OrderDetails />
          )}
        </Popup>
      )}
    </div>
  );
}

export default App;

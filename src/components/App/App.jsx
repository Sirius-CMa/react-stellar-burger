/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect } from "react"; //, useState
// import { useDispatch, useSelector } from "react-redux";

import styles from "./App.module.css";

import { AppHeader } from "Components/AppHeader";
import { BurgerIngredients } from "Components/BurgerIngredients";
import { BurgerConstructor } from "Components/BurgerConstructor";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import { IngredientDetails } from "Components/IngredientDetails";
// import { Popup } from "Components/Popup";
// import { OrderDetails } from "Components/OrderDetails";
// import { LoadingScreen } from "Components/LoadingScreen";

// import { getAllIngredients } from "Action/burgerIngredients";

export function App() {
  console.log("App");

  return (
    <div className={styles.container}>
      <AppHeader />
      <main className={styles.containerConstructor}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
}

// import { Api } from "Api";
// import { dataServer } from "../../utils/constants";

// const api = new Api(dataServer);

// const [serverData, setServerData] = useState({
//   data: [],
//   loading: true,
//   error: false,
// });

// useEffect(() => {
//   api
//     .loadIngredients()
//     .then((res) => {
//       setServerData({ ...serverData, data: res.data, loading: false });
//     })
//     .catch((err) => {
//       console.log("Ошибка сервера   : ", err);
//       setServerData({ ...serverData, error: true, loading: true });
//     });
// }, []);

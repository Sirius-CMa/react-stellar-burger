/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"; //, useState
import { useDispatch, useSelector } from "react-redux";

import styles from "./App.module.css";

import { AppHeader } from "Components/AppHeader";
import { BurgerIngredients } from "Components/BurgerIngredients";
import { BurgerConstructor } from "Components/BurgerConstructor";
// import { IngredientDetails } from "Components/IngredientDetails";
// import { Popup } from "Components/Popup";
// import { OrderDetails } from "Components/OrderDetails";
// import { LoadingScreen } from "Components/LoadingScreen";

// import { getAllIngredients } from "Action/burgerIngredients";

export function App() {
  console.log("App");
  // const [chapter, setChapter] = React.useState('bun')
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllIngredients());
  // }, [dispatch]);

  return (
    <div className={styles.container}>
      <AppHeader />
      <main className={styles.containerConstructor}>
        <BurgerIngredients />
        <BurgerConstructor />
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

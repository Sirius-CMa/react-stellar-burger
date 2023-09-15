/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"; //, useState
import { useDispatch, useSelector } from "react-redux";

import styles from "./App.module.css";

import { AppHeader } from "Components/AppHeader";
import { BurgerIngredients } from "Components/BurgerIngredients";
import { BurgerConstructor } from "Components/BurgerConstructor";
import { IngredientDetails } from "Components/IngredientDetails";
import { Popup } from "Components/Popup";
import { OrderDetails } from "Components/OrderDetails";
import { LoadingScreen } from "Components/LoadingScreen";

// начинка для бургера
import { filling } from "../../utils/data";
import { usePopup } from "Hooks/usePopup";

import { getAllIngredients } from "Action/api";

export function App() {
  // const [chapter, setChapter] = React.useState('bun')
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllIngredients());
  }, [dispatch]);

  const { data, error, loading } = useSelector((store) => store.serverData);
  const { isPopupOpen, ingredient } = useSelector((store) => store.managePopup);

  const { openPopup, closePopup } = usePopup();
  return (
    <div className={styles.container}>
      {!loading && (
        <>
          <AppHeader />
          <main className={styles.containerConstructor}>
            <BurgerIngredients ingredients={data} openPopup={openPopup} />
            <BurgerConstructor ingredients={data} filling={filling} openPopup={openPopup} />
          </main>
        </>
      )}

      {isPopupOpen && <Popup>{ingredient ? <IngredientDetails props={ingredient} /> : <OrderDetails />}</Popup>}

      {loading && (
        <Popup>
          <LoadingScreen />
        </Popup>
      )}
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

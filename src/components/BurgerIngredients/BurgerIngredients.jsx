import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; //useDispatch,

import styles from "./BurgerIngredients.module.css";
import { titleReplace } from "Utils/titleConstants";
import { getAllIngredients } from "Action/burgerIngredients";

import { TabContainer } from "Components/TabContainer";
import { BlockIngredient } from "Components/BlockIngredient";
import { LoadingScreen } from "Components/LoadingScreen";
import { Popup } from "Components/Popup";
import { IngredientDetails } from "Components/IngredientDetails";
// import { ADD_DRUGGED_INGREDIENT } from "Action/burgerConstructor";
// import { ingredientsPropTypes } from "Utils/prop-types";
// import PropTypes from "prop-types";

export function BurgerIngredients() {
  console.log("BurgerIngredients");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllIngredients());
  }, [dispatch]);

  const { data, isLoading, isError, currentProduct } = useSelector((store) => store.burgerIngredients);
  const bun = data.filter((el) => el.type === "bun");
  const main = data.filter((el) => el.type === "main");
  const sauce = data.filter((el) => el.type === "sauce");
  // const onDragStartHandler = (evt, ingredient) => {
  //   evt.preventDefault();
  //   dispatch({
  //     type: ADD_DRUGGED_INGREDIENT,
  //     payload: ingredient,
  //   });
  // };
  return (
    <div>
      <div className={styles.container}>
        <h2 className={`${styles.title}  text text_type_main-large mt-10 mb-5`}>Соберите бургер</h2>
        <TabContainer />

        <ul className={`${styles.ingredients}`}>
          <li key={1} className={styles.wrapperList}>
            <BlockIngredient title={titleReplace["bun"]} ingredients={bun} />
          </li>
          <li key={2} className={styles.wrapperList}>
            <BlockIngredient title={titleReplace["sauce"]} ingredients={sauce} />
          </li>
          <li key={3} className={styles.wrapperList}>
            <BlockIngredient title={titleReplace["main"]} ingredients={main} />
          </li>
          {/* {Object.keys(data).map((oneKey, i) => {
            return (
              <li key={i} className={styles.wrapperList}>
                {" "}
                <BlockIngredient title={titleReplace[oneKey]} ingredients={data[oneKey]} />
              </li>
            );
          })} */}
        </ul>
      </div>
      {isLoading && (
        <Popup>
          <LoadingScreen isLoading={isLoading} isError={isError} />
        </Popup>
      )}
      {currentProduct && (
        <Popup>
          <IngredientDetails />
        </Popup>
      )}
    </div>
  );
}

// BurgerIngredients.propTypes = {
//   ingredients: ingredientsPropTypes,
// };

//  <div className={styles.blockIngredient}>
//     <h3 className={`${styles.subtitle} text text_type_main-medium`}>Булки</h3>
//     <ul className={styles.wrapperList}>
//       {data["bun"].map((item) => (
//         <li key={item._id} className={styles.listItem}>
//           <IngredientsElement ingredient={item} />
//         </li>
//       ))}
//     </ul>
//   </div>
//   <div className={styles.blockIngredients}>
//     <h3 className={`${styles.subtitle} text text_type_main-medium`}>Соусы</h3>
//     <ul className={styles.wrapperList}>
//       {data["sauce"].map((item) => (
//         <li key={item._id} className={styles.listItem}>
//           <IngredientsElement ingredient={item} />
//         </li>
//       ))}
//     </ul>
//   </div>
//   <div className={styles.blockIngredients}>
//     <h3 className={`${styles.subtitle} text text_type_main-medium`}>Начинки</h3>
//     <ul className={styles.wrapperList}>
//       {data["main"].map((item) => (
//         <li key={item._id} className={styles.listItem}>
//           <IngredientsElement ingredient={item} />
//         </li>
//       ))}
//     </ul>
//   </div>

// import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; //useDispatch,

import styles from "./BurgerIngredients.module.css";
import { titleReplace } from "Utils/titleConstants";

import { TabContainer } from "Components/TabContainer";
import { BlockIngredient } from "Components/BlockIngredient";
// import { ingredientsPropTypes } from "Utils/prop-types";
// import PropTypes from "prop-types";

export function BurgerIngredients() {
  // const dispatch = useDispatch();
  const { data } = useSelector((store) => store.serverData);

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title}  text text_type_main-large mt-10 mb-5`}>Соберите бургер</h2>
      <TabContainer />

      <ul className={`${styles.ingredients}`}>
        {Object.keys(data).map((oneKey, i) => {
          return (
            <li key={i} className={styles.wrapperList}>
              {" "}
              <BlockIngredient title={titleReplace[oneKey]} ingredients={data[oneKey]} />
            </li>
          );
        })}
      </ul>
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

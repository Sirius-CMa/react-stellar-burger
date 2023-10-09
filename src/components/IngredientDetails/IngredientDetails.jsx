import { useSelector } from "react-redux";
import styles from "./IngredientDetails.module.css";

import { ingredientPropTypes } from "../../utils/prop-types";

export const IngredientDetails = () => {
  // console.log("IngredientDetails");
  const { currentProduct } = useSelector((store) => store.burgerIngredients);
  return (
    <div className={`${styles.container}  mt-10 mb-15`}>
      <h2 className={`${styles.title} ml-10 text text_type_main-large`}>Детали ингредиента</h2>
      <img src={currentProduct.image_large} alt={currentProduct.name} className={`ml-4 mr-4`} />
      <h3 className={`text text_type_main-medium`}>{currentProduct.name}</h3>
      <table className={`${styles.table}`}>
        <tbody>
          <tr>
            <th className="text text_type_main-default text_color_inactive">Калории,ккал</th>
            <th className="text text_type_main-default text_color_inactive">Белки, г</th>
            <th className="text text_type_main-default text_color_inactive">Жиры, г</th>
            <th className="text text_type_main-default text_color_inactive">Углеводы, г</th>
          </tr>
          <tr>
            <th className="text text_type_main-default text_color_inactive">{currentProduct.calories}</th>
            <th className="text text_type_main-default text_color_inactive">{currentProduct.proteins}</th>
            <th className="text text_type_main-default text_color_inactive">{currentProduct.fat}</th>
            <th className="text text_type_main-default text_color_inactive">{currentProduct.carbohydrates}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

IngredientDetails.propTypes = {
  currentProduct: ingredientPropTypes,
};

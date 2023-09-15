import { useSelector } from "react-redux";
import styles from "./IngredientDetails.module.css";
import { ingredientPropTypes } from "../../utils/prop-types";

export const IngredientDetails = () => {
  const { ingredient } = useSelector((store) => store.managePopup);
  return (
    <div className={`${styles.container}  mt-10 mb-15`}>
      <h2 className={`${styles.title} ml-10 text text_type_main-large`}>Детали ингредиента</h2>
      <img src={ingredient.image_large} alt={ingredient.name} className={`ml-4 mr-4`} />
      <h3 className={`text text_type_main-medium`}>{ingredient.name}</h3>
      <table className={`${styles.table}`}>
        <tbody>
          <tr>
            <th className="text text_type_main-default text_color_inactive">Калории,ккал</th>
            <th className="text text_type_main-default text_color_inactive">Белки, г</th>
            <th className="text text_type_main-default text_color_inactive">Жиры, г</th>
            <th className="text text_type_main-default text_color_inactive">Углеводы, г</th>
          </tr>
          <tr>
            <th className="text text_type_main-default text_color_inactive">{ingredient.calories}</th>
            <th className="text text_type_main-default text_color_inactive">{ingredient.proteins}</th>
            <th className="text text_type_main-default text_color_inactive">{ingredient.fat}</th>
            <th className="text text_type_main-default text_color_inactive">{ingredient.carbohydrates}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientPropTypes,
};

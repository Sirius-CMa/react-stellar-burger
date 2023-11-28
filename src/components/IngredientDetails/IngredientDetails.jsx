import styles from "./IngredientDetails.module.css";

import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";

import { ingredientPropTypes } from "../../utils/prop-types";
import { getDataBurgerIngredients } from "Selectors";
import { useParams } from "react-router-dom";
import { getAllIngredients } from "Action/burgerIngredients";

export const IngredientDetails = ({ notPopup }) => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { sortDataById } = useSelector(getDataBurgerIngredients);

  console.log(id, sortDataById);
  useEffect(() => {
    dispatch(getAllIngredients());
  }, [dispatch]);

  if (!sortDataById) return null;

  let ingredient = sortDataById[id];

  return (
    <div className={notPopup ? styles.containerPage : styles.container}>
      <h2 className={`${styles.title}  text text_type_main-large`}>Детали ингредиента</h2>
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
  currentProduct: ingredientPropTypes,
};

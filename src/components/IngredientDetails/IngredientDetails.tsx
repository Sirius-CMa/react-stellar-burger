import styles from "./IngredientDetails.module.css";

import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import { selectSortedIngredientsById } from '../../redux/Selectors';

import { getAllIngredients } from "Action/burgerIngredients";
import { TParams, IngredientDetailsProps, useAppDispatch, useAppSelector } from "../../typesData";
import { DEFAULT_BUN } from "Utils/constants";


export const IngredientDetails: FC<IngredientDetailsProps> = ({ notPopup }) => {
  const dispatch = useAppDispatch();

  const { id } = useParams<TParams>();
  const sortDataById = useAppSelector(selectSortedIngredientsById);



  useEffect(() => {
    dispatch(getAllIngredients());
  }, [dispatch]);

  if (!sortDataById) return null;

  let ingredient = !id ? DEFAULT_BUN : sortDataById[id];




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


import { IngredientsElement } from "Components/IngredientsElement";
import styles from "./BlockIngredient.module.css";

import { ingredientsPropTypes } from "Utils/prop-types";
import PropTypes from "prop-types";
import { memo } from "react";

export const BlockIngredient = memo(function BlockIngredient({ title, ingredients }) {
  // console.log("BlockIngredient");
  return (
    <div>
      <h3 className={`${styles.subtitle} text text_type_main-medium`}>{title}</h3>
      <ul className={styles.wrapperList}>
        {ingredients.map((item) => (
          <li key={item._id} className={styles.listItem}>
            <IngredientsElement ingredient={item} />
          </li>
        ))}
      </ul>
    </div>
  );
});

BlockIngredient.propTypes = {
  ingredients: ingredientsPropTypes,
  title: PropTypes.string.isRequired,
};

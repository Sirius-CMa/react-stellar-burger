import { IngredientsElement } from "Components/IngredientsElement";
import styles from "./BlockIngredient.module.css";

import { ingredientsPropTypes } from "Utils/prop-types";
import PropTypes from "prop-types";
import { memo } from "react";
import { NavLink } from "react-router-dom";

export const BlockIngredient = memo(function BlockIngredient({ title, ingredients, location }) {
  // console.log("BlockIngredient");
  return (
    <div>
      <h3 className={`${styles.subtitle} text text_type_main-medium`}>{title}</h3>
      <ul className={styles.wrapperList}>
        {ingredients.map((item) => (
          <NavLink to={`ingredients/${item._id}`} className={styles.link} key={item._id} state={{ background: location }}>
            <li key={item._id} className={styles.listItem}>
              <IngredientsElement ingredient={item} />
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
});

BlockIngredient.propTypes = {
  ingredients: ingredientsPropTypes,
  title: PropTypes.string.isRequired,
};

import styles from "./IngredientPage.module.css";

import { IngredientDetails } from "Components/IngredientDetails";

import PropTypes from "prop-types";

export function IngredientPage({ notPopup }) {
  return (
    <div className={styles.container}>
      <IngredientDetails notPopup={notPopup} />
    </div>
  );
}

IngredientPage.propTypes = {
  notPopup: PropTypes.bool,
};

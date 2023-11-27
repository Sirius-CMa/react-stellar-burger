import { IngredientDetails } from "Components/IngredientDetails";
import styles from "./IngredientPage.module.css";

export function IngredientPage({ notPopup }) {
  return (
    <div className={styles.container}>
      <IngredientDetails notPopup={notPopup} />
    </div>
  );
}

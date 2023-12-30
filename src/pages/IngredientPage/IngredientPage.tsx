import styles from "./IngredientPage.module.css";

import { IngredientDetails } from "Components/IngredientDetails";

import { TIngredientPageProps } from "../../typesData";
import { FC } from "react";


export const IngredientPage: FC<TIngredientPageProps> = ({ notPopup }) => {
  return (
    <div className={styles.container}>
      <IngredientDetails notPopup={notPopup} />
    </div>
  );
}



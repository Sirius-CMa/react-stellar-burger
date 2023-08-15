import styles from "./IngredientDetails.module.css";

export const IngredientDetails = ({ props }) => {
  return (
    <div className={`${styles.container}  mt-10 mb-15`}>
      <h2 className={`${styles.title} ml-10 text text_type_main-large`}>
        Детали ингредиента
      </h2>
      <img src={props.image_large} alt={props.name} className={`ml-4 mr-4`} />
      <h3 className={`text text_type_main-medium`}>{props.name}</h3>
      <table className={`${styles.table}`}>
        <tbody>
          <tr>
            <th className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </th>
            <th className="text text_type_main-default text_color_inactive">
              Белки, г
            </th>
            <th className="text text_type_main-default text_color_inactive">
              Жиры, г
            </th>
            <th className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </th>
          </tr>
          <tr>
            <th className="text text_type_main-default text_color_inactive">
              {props.calories}
            </th>
            <th className="text text_type_main-default text_color_inactive">
              {props.proteins}
            </th>
            <th className="text text_type_main-default text_color_inactive">
              {props.fat}
            </th>
            <th className="text text_type_main-default text_color_inactive">
              {props.carbohydrates}
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

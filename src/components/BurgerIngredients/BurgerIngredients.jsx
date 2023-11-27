import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; //useDispatch,

import styles from "./BurgerIngredients.module.css";

import { titleReplace } from "Utils/titleConstants";
import { getAllIngredients } from "Action/burgerIngredients";

import { TabContainer } from "Components/TabContainer";
import { BlockIngredient } from "Components/BlockIngredient";
import { LoadingScreen } from "Components/LoadingScreen";
import { Popup } from "Components/Popup";
import { getDataBurgerIngredients } from "Selectors";
import { useLocation } from "react-router-dom";

// import { ingredientsPropTypes } from "Utils/prop-types";

export function BurgerIngredients() {
  // console.log("BurgerIngredients");
  const dispatch = useDispatch();
  const location = useLocation();

  const [current, setCurrent] = useState("bun");
  const ingredientsContainer = useRef();
  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  function switchTabs() {
    const topContainer = ingredientsContainer.current.offsetTop;
    const topBun = bunRef.current.getBoundingClientRect().top;
    const topSauce = sauceRef.current.getBoundingClientRect().top - bunRef.current.clientHeight / 2;
    const topMain = mainRef.current.getBoundingClientRect().top - sauceRef.current.clientHeight / 2;

    if (topContainer >= topBun && topContainer <= topSauce) {
      setCurrent("bun");
    } else if (topContainer >= topSauce && topContainer <= topMain) {
      setCurrent("sauce");
    } else if (topContainer >= topMain) {
      setCurrent("main");
    }
  }

  function handleClick(target, ref) {
    setCurrent(target);
    ref.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    dispatch(getAllIngredients());
  }, [dispatch]);

  const { data, isLoading, isError } = useSelector(getDataBurgerIngredients);

  const bun = useMemo(() => data.filter((el) => el.type === "bun"), [data]);
  const main = useMemo(() => data.filter((el) => el.type === "main"), [data]);
  const sauce = useMemo(() => data.filter((el) => el.type === "sauce"), [data]);

  return (
    <div>
      <div className={styles.container}>
        <h2 className={`${styles.title}  text text_type_main-large mt-10 mb-5`}>Соберите бургер</h2>
        <TabContainer
          current={current}
          bunRef={bunRef}
          sauceRef={sauceRef}
          mainRef={mainRef}
          handleClick={handleClick}
        />

        <ul className={`${styles.ingredients}`} ref={ingredientsContainer} onScroll={switchTabs}>
          <li ref={bunRef} key={1} className={styles.wrapperList}>
            <BlockIngredient title={titleReplace["bun"]} ingredients={bun} location={location} />
          </li>
          <li ref={sauceRef} key={2} className={styles.wrapperList}>
            <BlockIngredient title={titleReplace["sauce"]} ingredients={sauce} />
          </li>
          <li ref={mainRef} key={3} className={styles.wrapperList}>
            <BlockIngredient title={titleReplace["main"]} ingredients={main} />
          </li>
        </ul>
      </div>
      {isLoading && (
        <Popup>
          <LoadingScreen isLoading={isLoading} isError={isError} />
        </Popup>
      )}
      {/* {currentProduct && (
        <Popup>
          <IngredientDetails />
        </Popup>
      )} */}
    </div>
  );
}

// BurgerIngredients.propTypes = {
//   ingredients: ingredientsPropTypes,
// };

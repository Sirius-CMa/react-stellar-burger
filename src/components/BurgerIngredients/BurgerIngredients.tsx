import { useEffect, useMemo, useRef, useState, RefObject } from "react";

import styles from "./BurgerIngredients.module.css";

import { titleReplace } from "Utils/titleConstants";
import { getAllIngredients } from "Action/burgerIngredients";

import { TabContainer } from "Components/TabContainer";
import { BlockIngredient } from "Components/BlockIngredient";
import { LoadingScreen } from "Components/LoadingScreen";
import { Popup } from "Components/Popup";
import { getDataBurgerIngredients } from "../../redux/Selectors";
import { useLocation } from "react-router-dom";
import { IIngredientTypes, useAppDispatch, useAppSelector } from "../../typesData";


export function BurgerIngredients() {
  // console.log("BurgerIngredients");
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [current, setCurrent] = useState<string>("bun");
  const ingredientsContainer = useRef<HTMLUListElement>(null);
  const bunRef = useRef<HTMLLIElement>(null);
  const sauceRef = useRef<HTMLLIElement>(null);
  const mainRef = useRef<HTMLLIElement>(null);

  function switchTabs() {
    const topContainer = ingredientsContainer.current!.offsetTop;
    const topBun = bunRef.current!.getBoundingClientRect().top;
    const topSauce = sauceRef.current!.getBoundingClientRect().top - bunRef.current!.clientHeight / 2;
    const topMain = mainRef.current!.getBoundingClientRect().top - sauceRef.current!.clientHeight / 2;

    if (topContainer >= topBun && topContainer <= topSauce) {
      setCurrent("bun");
    } else if (topContainer >= topSauce && topContainer <= topMain) {
      setCurrent("sauce");
    } else if (topContainer >= topMain) {
      setCurrent("main");
    }
  }

  const handleClick = (target: string, ref: RefObject<HTMLLIElement>) => {
    setCurrent(target);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }
  const { data, isLoading, isError } = useAppSelector(getDataBurgerIngredients);

  const bun = useMemo(() => data.filter((el: IIngredientTypes) => el.type === "bun"), [data]);
  const main = useMemo(() => data.filter((el: IIngredientTypes) => el.type === "main"), [data]);
  const sauce = useMemo(() => data.filter((el: IIngredientTypes) => el.type === "sauce"), [data]);

  useEffect(() => {
    dispatch(getAllIngredients());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.container}>
        <h2 className={`${styles.title}  text text_type_main-large mt-10 mb-5`}>Соберите бургер</h2>
        <TabContainer current={current} bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef} handleClick={handleClick} />

        <ul className={`${styles.ingredients}`} ref={ingredientsContainer} onScroll={switchTabs}>
          <li ref={bunRef} key={1} className={styles.wrapperList}>
            <BlockIngredient title={titleReplace["bun"]} ingredients={bun} location={location} />
          </li>
          <li ref={sauceRef} key={2} className={styles.wrapperList}>
            <BlockIngredient title={titleReplace["sauce"]} ingredients={sauce} location={location} />
          </li>
          <li ref={mainRef} key={3} className={styles.wrapperList}>
            <BlockIngredient title={titleReplace["main"]} ingredients={main} location={location} />
          </li>
        </ul>
      </div>
      {isLoading && (
        <Popup handleClosePopup={() => { }}>
          <LoadingScreen isLoading={isLoading} isError={isError} />
        </Popup>
      )}

    </div>
  );
}

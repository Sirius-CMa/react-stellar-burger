import { RootState } from "../../typesData";

export const getDataBurgerConstructor = (state: RootState) => state.burgerConstructor;
export const getDataBurgerIngredients = (store: RootState) => store.burgerIngredients;
export const getDataOrder = (store: RootState) => store.order
export const getDataAuth = (store: RootState) => store.auth
export const getDataFeed = (store: RootState) => store.wsFeed
export const getDataProfileFeed = (store: RootState) => store.wsProfileFeed
export const getDataOneOrder = (store: RootState) => store.oneOrder;

export const selectOneOrder = (store: RootState) => store.oneOrder.order
export const selectIngredients = (store: RootState) => store.burgerIngredients.data;
export const selectSortedIngredientsById = (store: RootState) => store.burgerIngredients.sortDataById;

import { RootState, TDataWS, TOrder, TSortDataById } from "../../typesData";

export const getDataBurgerConstructor = (state: RootState) => state.burgerConstructor;
export const getDataBurgerIngredients = (store: RootState) => store.burgerIngredients;
export const getDataOrder = (store: RootState) => store.order
export const getDataAuth = (store: RootState) => store.auth
export const getDataFeed = (store: RootState) => store.wsFeed
export const getDataProfileFeed = (store: RootState) => store.wsProfileFeed
export const getDataOneOrder = (store: RootState) => store.oneOrder;

export const selectOneOrder = (store: RootState) => store.oneOrder.order
export const selectIngredients = (store: RootState) => store.burgerIngredients.data;
export const selectSortedIngredientsById = (store: RootState): TSortDataById | null => store.burgerIngredients.sortDataById;

export const selectDataFeed = (store: RootState): TDataWS | null => store.wsFeed?.data
export const selectProfileDataFeed2 = (store: RootState): TOrder[] | null => store.wsProfileFeed?.data?.orders
export const selectProfileDataFeed = (store: RootState): TDataWS | null => store.wsProfileFeed?.data

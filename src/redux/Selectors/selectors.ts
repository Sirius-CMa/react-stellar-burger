import { TLoginResponse } from "src/typesData/authTypes";
import { IIngredientTypes, RootState, TDataWS, TSortDataById } from "../../typesData";

export const getDataBurgerConstructor = (state: RootState) => state.burgerConstructor;
export const getDataBurgerIngredients = (store: RootState) => store.burgerIngredients;
export const getDataOrder = (store: RootState) => store.order
export const getDataAuth = (store: RootState) => store.auth
export const getDataFeed = (store: RootState) => store.wsFeed
export const getDataProfileFeed = (store: RootState) => store.wsProfileFeed
export const getDataOneOrder = (store: RootState) => store.oneOrder;

export const selectOneOrder = (store: RootState) => store.oneOrder.order

export const selectIngredients = (store: RootState): Array<IIngredientTypes> => store.burgerIngredients?.data;
export const selectIsLoading = (store: RootState): boolean => store.burgerIngredients.isLoading;
export const selectSortedIngredientsById = (store: RootState): TSortDataById | null => store.burgerIngredients.sortDataById;

export const selectDataFeed = (store: RootState): TDataWS | null => store.wsFeed?.data

export const selectProfileDataFeed = (store: RootState): TDataWS | null => store.wsProfileFeed?.data

export const selectAuth = (store: RootState): boolean => store.auth.auth
export const selectUser = (store: RootState): TLoginResponse => store.auth?.user

export const selectNumber = (store: RootState): number | null => store.order?.number

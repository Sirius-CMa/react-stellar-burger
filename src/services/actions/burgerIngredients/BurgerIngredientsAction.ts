import { Api } from "../../../utils/api";
import { dataServer } from "Utils/constants";
import { getCookie } from "Utils/cookie";
import { AppDispatch, IIngredientTypes } from "../../../typesData";

const api = new Api(dataServer, getCookie);

export const GET_ALL_INGREDIENTS_REQUEST: 'GET_ALL_INGREDIENTS_REQUEST' = 'GET_ALL_INGREDIENTS_REQUEST';
export const GET_ALL_INGREDIENTS_SUCCESS: 'GET_ALL_INGREDIENTS_SUCCESS' = 'GET_ALL_INGREDIENTS_SUCCESS';
export const GET_ALL_INGREDIENTS_FAILED: 'GET_ALL_INGREDIENTS_FAILED' = 'GET_ALL_INGREDIENTS_FAILED';

export const GET_ONE_INGREDIENTS_REQUEST: 'GET_ONE_INGREDIENTS_REQUEST' = 'GET_ONE_INGREDIENTS_REQUEST';
export const GET_ONE_INGREDIENTS_SUCCESS: 'GET_ONE_INGREDIENTS_SUCCESS' = 'GET_ONE_INGREDIENTS_SUCCESS';
export const GET_ONE_INGREDIENTS_FAILED: 'GET_ONE_INGREDIENTS_FAILED' = 'GET_ONE_INGREDIENTS_FAILED';


export const SET_CURRENT_INGREDIENT: 'SET_CURRENT_INGREDIENT' = 'SET_CURRENT_INGREDIENT';
export const REMOVE_CURRENT_INGREDIENT: 'REMOVE_CURRENT_INGREDIENT' = 'REMOVE_CURRENT_INGREDIENT';

export const SET_COUNT_INGREDIENT: 'SET_COUNT_INGREDIENT' = 'SET_COUNT_INGREDIENT';
export const CLEAN_ALL_INGREDIENTS: 'CLEAN_ALL_INGREDIENTS' = 'CLEAN_ALL_INGREDIENTS';

export interface IGET_ALL_INGREDIENTS_REQUEST {
  readonly type: typeof GET_ALL_INGREDIENTS_REQUEST;
}

export interface IGET_ALL_INGREDIENTS_SUCCESS {
  readonly type: typeof GET_ALL_INGREDIENTS_SUCCESS;
  readonly payload: Array<IIngredientTypes>;
}

export interface IGET_ALL_INGREDIENTS_FAILED {
  readonly type: typeof GET_ALL_INGREDIENTS_FAILED;
}


export interface IGET_ONE_INGREDIENTS_REQUEST {
  readonly type: typeof GET_ONE_INGREDIENTS_REQUEST;
}

export interface IGET_ONE_INGREDIENTS_SUCCESS {
  readonly type: typeof GET_ONE_INGREDIENTS_SUCCESS;
  readonly payload: IIngredientTypes;
}


export interface IGET_ONE_INGREDIENTS_FAILED {
  readonly type: typeof GET_ONE_INGREDIENTS_FAILED;
}


export interface ISET_CURRENT_INGREDIENT {
  readonly type: typeof SET_CURRENT_INGREDIENT;
  readonly payload: IIngredientTypes;
}

export interface IREMOVE_CURRENT_INGREDIENT {
  readonly type: typeof REMOVE_CURRENT_INGREDIENT;
}

export interface ISET_COUNT_INGREDIENT {
  readonly type: typeof SET_COUNT_INGREDIENT;
}

export interface ICLEAN_ALL_INGREDIENTS {
  readonly type: typeof CLEAN_ALL_INGREDIENTS;
}

export type TBurgerIngredientsActions =
  IGET_ALL_INGREDIENTS_REQUEST |
  IGET_ALL_INGREDIENTS_SUCCESS |
  IGET_ALL_INGREDIENTS_FAILED |
  IGET_ONE_INGREDIENTS_REQUEST |
  IGET_ONE_INGREDIENTS_SUCCESS |
  IGET_ONE_INGREDIENTS_FAILED |
  ISET_CURRENT_INGREDIENT |
  IREMOVE_CURRENT_INGREDIENT |
  ISET_COUNT_INGREDIENT |
  ICLEAN_ALL_INGREDIENTS
  ;




export function getAllIngredients() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ALL_INGREDIENTS_REQUEST,
    });
    api
      .loadIngredients()
      .then((res) => {
        dispatch({
          type: GET_ALL_INGREDIENTS_SUCCESS,
          payload: res.data
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_INGREDIENTS_FAILED,
        })
      })
  }
}

// export function getOneIngredients(id) {
//   return function (dispatch: AppDispatch) {
//     dispatch({
//       type: GET_ONE_INGREDIENTS_REQUEST,
//     });
//     api.
//     api.loadOneIngredients(id)
//       .then((res) => {
//         // console.log(res.data);
//         dispatch({
//           type: GET_ONE_INGREDIENTS_SUCCESS,
//           payload: res.data
//         })
//       })
//       .catch(error => {
//         dispatch({
//           type: GET_ONE_INGREDIENTS_FAILED,
//         })
//       })
//   }
// }

import { Api } from "Api";
import { dataServer } from "Utils/constants";
import { sortIngredients } from "Utils/sortIngredients";

const api = new Api(dataServer);

export const GET_ALL_INGREDIENTS_REQUEST = 'GET_ALL_INGREDIENTS_REQUEST';
export const GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS';
export const GET_ALL_INGREDIENTS_FAILED = 'GET_ALL_INGREDIENTS_FAILED';
export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const REMOVE_CURRENT_INGREDIENT = 'REMOVE_CURRENT_INGREDIENT';


export function getAllIngredients() {
  console.log(33)
  return function (dispatch) {
    dispatch({
      type: GET_ALL_INGREDIENTS_REQUEST,
    });
    api
      .loadIngredients()
      .then((res) => {
        const ingredients = sortIngredients(res.data)
        console.log(ingredients);
        dispatch({
          type: GET_ALL_INGREDIENTS_SUCCESS,
          payload: ingredients
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_INGREDIENTS_FAILED,
        })
      })
  }
}

import { Api } from "Api";
import { dataServer } from "Utils/constants";

const api = new Api(dataServer);

export const GET_ALL_INGREDIENTS_REQUEST = 'GET_ALL_INGREDIENTS_REQUEST';
export const GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS';
export const GET_ALL_INGREDIENTS_FAILED = 'GET_ALL_INGREDIENTS_FAILED';

export const GET_ONE_INGREDIENTS_REQUEST = 'GET_ALL_INGREDIENTS_REQUEST';
export const GET_ONE_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS';
export const GET_ONE_INGREDIENTS_FAILED = 'GET_ALL_INGREDIENTS_FAILED';


export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const REMOVE_CURRENT_INGREDIENT = 'REMOVE_CURRENT_INGREDIENT';

export const SET_COUNT_INGREDIENT = 'SET_COUNT_INGREDIENT';
export const CLEAN_ALL_INGREDIENTS = 'CLEAN_ALL_INGREDIENTS';

export function getAllIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_ALL_INGREDIENTS_REQUEST,
    });
    api
      .loadIngredients()
      .then((res) => {
        // console.log(res.data);
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

export function getOneIngredients(id) {
  return function (dispatch) {
    dispatch({
      type: GET_ONE_INGREDIENTS_REQUEST,
    });
    api
      .loadOneIngredients(id)
      .then((res) => {
        // console.log(res.data);
        dispatch({
          type: GET_ONE_INGREDIENTS_SUCCESS,
          payload: res.data
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ONE_INGREDIENTS_FAILED,
        })
      })
  }
}

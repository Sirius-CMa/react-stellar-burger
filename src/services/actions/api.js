import { Api } from "Api";
import { dataServer } from "Utils/constants";
import { sortIngredients } from "Utils/sortIngredients";

const api = new Api(dataServer);

export const GET_ALL_INGREDIENTS_REQUEST = 'GET_ALL_INGREDIENTS_REQUEST';
export const GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS';
export const GET_ALL_INGREDIENTS_FAILED = 'GET_ALL_INGREDIENTS_FAILED';

export function getAllIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_ALL_INGREDIENTS_REQUEST,
    });
    api
      .loadIngredients()
      .then((res) => {
        const ff = sortIngredients(res.data)
        dispatch({
          type: GET_ALL_INGREDIENTS_SUCCESS,
          payload: ff
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_INGREDIENTS_FAILED,
        })
      })
  }
}

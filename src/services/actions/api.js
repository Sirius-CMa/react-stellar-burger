import { Api } from "Api";
import { dataServer } from "Utils/constants";

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
        dispatch({
          type: GET_ALL_INGREDIENTS_SUCCESS,
          payload: res.data,
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_INGREDIENTS_FAILED,
        })
      })
  }
}

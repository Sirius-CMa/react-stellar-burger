import { CLEAR_INGREDIENT } from "Action/burgerConstructor";
import { Api } from "Api"
import { dataServer } from "Utils/constants";
import { getCookie } from "Utils/cookie";

export const GET_ORDER_DATA_REQUEST = 'GET_ORDER_DATA_REQUEST';
export const GET_ORDER_DATA_SUCCESS = 'GET_ORDER_DATA_SUCCESS';
export const GET_ORDER_DATA_FAILED = 'GET_ORDER_DATA_FAILED';
export const REMOVE_ORDER_DATA = 'REMOVE_ORDER_DATA';



const api = new Api(dataServer)


export function getOrderDetailsAction(ingredients) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_DATA_REQUEST,
    });
    api
      .getOrderDetailsServer(ingredients, getCookie('token'))
      .then((res) => {
        // console.log('ответ серверв с заказом - ', res.order.number)
        const { name, order } = res
        dispatch({
          type: GET_ORDER_DATA_SUCCESS,
          name,
          id: order.number
        })
        dispatch({
          type: CLEAR_INGREDIENT,
        })

      })
      .catch(error => {
        dispatch({
          type: GET_ORDER_DATA_FAILED,
          errorText: error.text
        })
      })
  }
}

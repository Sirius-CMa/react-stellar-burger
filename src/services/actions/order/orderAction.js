import { Api } from "Api"
import { dataServer } from "Utils/constants";

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
      .getOrderDetailsServer(ingredients)
      .then((res) => {
        console.log('ответ серверв с заказом - ', res.order.number)
        const { name, order } = res
        dispatch({
          type: GET_ORDER_DATA_SUCCESS,
          name,
          id: order.number
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

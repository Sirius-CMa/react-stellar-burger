import { dataServer } from "Utils/constants"
import { Api } from "Api"

export const GET_ONE_ORDER_REQUEST = 'GET_ONE_ORDER_REQUEST'
export const GET_ONE_ORDER_SUCCESS = 'GET_ONE_ORDER_SUCCESS'
export const GET_ONE_ORDER_FAILED = 'GET_ONE_ORDER_FAILED'

const api = new Api(dataServer)

export function getOneOrder(number) {
  return function (dispatch) {
    dispatch({
      type: GET_ONE_ORDER_REQUEST,
    });
    api
      .getOneOrder(number)
      .then((res) => {
        dispatch({
          type: GET_ONE_ORDER_SUCCESS,
          payload: res
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ONE_ORDER_FAILED,
          errorText: error
        })
      })
  }
}

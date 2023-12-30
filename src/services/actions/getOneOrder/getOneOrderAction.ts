import { dataServer } from "Utils/constants"
import { Api } from "../../../utils/api"
import { getCookie } from "Utils/cookie"
import { AppDispatch, TOrder } from "../../../typesData"

export const GET_ONE_ORDER_REQUEST: 'GET_ONE_ORDER_REQUEST' = 'GET_ONE_ORDER_REQUEST'
export const GET_ONE_ORDER_SUCCESS: 'GET_ONE_ORDER_SUCCESS' = 'GET_ONE_ORDER_SUCCESS'
export const GET_ONE_ORDER_FAILED: 'GET_ONE_ORDER_FAILED' = 'GET_ONE_ORDER_FAILED'

const api = new Api(dataServer, getCookie)

export type TOneOrder =
  IGET_ONE_ORDER_REQUEST |
  IGET_ONE_ORDER_SUCCESS |
  IGET_ONE_ORDER_FAILED;

export interface IGET_ONE_ORDER_REQUEST {
  readonly type: typeof GET_ONE_ORDER_REQUEST;
}

export interface IGET_ONE_ORDER_SUCCESS {
  readonly type: typeof GET_ONE_ORDER_SUCCESS;
  readonly payload: TOrder;
}

export interface IGET_ONE_ORDER_FAILED {
  readonly type: typeof GET_ONE_ORDER_FAILED;
  readonly errorText: string;
}


export function getOneOrder(number: number | string | undefined) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ONE_ORDER_REQUEST,
    });
    api
      .getOneOrder(number)
      .then((res) => {
        dispatch({
          type: GET_ONE_ORDER_SUCCESS,
          payload: res.orders
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

import { CLEAR_INGREDIENT } from "Action/burgerConstructor";
import { Api } from "../../../utils/api"
import { dataServer } from "Utils/constants";
import { deleteCookie, getCookie, setCookie } from "Utils/cookie";
import { AppDispatch } from "../../../typesData";
import { TNewOrderRequest } from "../../../typesData/authTypes";

export const GET_ORDER_DATA_REQUEST: 'GET_ORDER_DATA_REQUEST' = 'GET_ORDER_DATA_REQUEST';
export const GET_ORDER_DATA_SUCCESS: 'GET_ORDER_DATA_SUCCESS' = 'GET_ORDER_DATA_SUCCESS';
export const GET_ORDER_DATA_FAILED: 'GET_ORDER_DATA_FAILED' = 'GET_ORDER_DATA_FAILED';
export const REMOVE_ORDER_DATA: 'REMOVE_ORDER_DATA' = 'REMOVE_ORDER_DATA';

// export interface IADD_INGREDIENT {
//   readonly type: typeof
// }

export interface IGET_ORDER_DATA_REQUEST {
  readonly type: typeof GET_ORDER_DATA_REQUEST
}

export interface IGET_ORDER_DATA_SUCCESS {
  readonly type: typeof GET_ORDER_DATA_SUCCESS;
  name: string;
  id: number;
}

export interface IGET_ORDER_DATA_FAILED {
  readonly type: typeof GET_ORDER_DATA_FAILED;
  errorText: string;
}

export interface IREMOVE_ORDER_DATA {
  readonly type: typeof REMOVE_ORDER_DATA
}

export type TOrderActions =
  IGET_ORDER_DATA_REQUEST |
  IGET_ORDER_DATA_SUCCESS |
  IGET_ORDER_DATA_FAILED |
  IREMOVE_ORDER_DATA;


const api = new Api(dataServer, getCookie, setCookie, deleteCookie)


export function getOrderDetailsAction(ingredients: TNewOrderRequest) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_DATA_REQUEST,
    });
    api
      .getOrderDetailsServer(ingredients)
      .then((res) => {
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

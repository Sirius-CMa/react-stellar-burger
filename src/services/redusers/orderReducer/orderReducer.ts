import {
  GET_ORDER_DATA_REQUEST,
  GET_ORDER_DATA_SUCCESS,
  GET_ORDER_DATA_FAILED,
  REMOVE_ORDER_DATA, TOrderActions
} from "Action/order"
import { TOrderInitialState } from "../../../typesData"



const initialState: TOrderInitialState = {
  number: null,
  name: null,
  requestOrder: false,
  errorOrder: ''
}

export const orderReduser = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case GET_ORDER_DATA_REQUEST: {
      return { ...state, requestOrder: true }
    }
    case GET_ORDER_DATA_SUCCESS: {
      return { ...state, number: action.id, name: action.name, requestOrder: false }
    }
    case GET_ORDER_DATA_FAILED: {
      return { ...state, errorOrder: action.errorText, requestOrder: false }
    }
    case REMOVE_ORDER_DATA: {
      return { ...state, number: null, name: null }
    }
    default: {
      return state
    }
  }
}


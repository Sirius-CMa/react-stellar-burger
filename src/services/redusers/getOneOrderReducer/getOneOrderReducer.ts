
import {
  GET_ONE_ORDER_REQUEST,
  GET_ONE_ORDER_SUCCESS,
  GET_ONE_ORDER_FAILED,
  TOneOrder
} from 'Action/getOneOrder'
import { TOneOrderInitialState } from '../../../typesData'


const initialState: TOneOrderInitialState = {
  number: null,
  order: [],
  requestOneOrder: false,
  errorOneOrder: null

}

export const oneOrderReduser = (state = initialState, action: TOneOrder) => {
  switch (action.type) {
    case GET_ONE_ORDER_REQUEST: {
      return { ...state, requestOneOrder: true, errorOneOrder: {} }
    }
    case GET_ONE_ORDER_SUCCESS: {
      return { ...state, order: action.payload, requestOneOrder: false }
    }

    case GET_ONE_ORDER_FAILED: {
      return { ...state, requestOneOrder: false, errorOneOrder: action.error }
    }
    default: {
      return state
    }
  }
}

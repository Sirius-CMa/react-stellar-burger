
import {
  GET_ONE_ORDER_REQUEST,
  GET_ONE_ORDER_SUCCESS,
  GET_ONE_ORDER_FAILED,
  TOneOrder
} from 'Action/getOneOrder'
import { TOneOrdeeInitialState } from '../../../typesData'



const initialState: TOneOrdeeInitialState = {
  number: null,
  order: null,
  requestOneOrder: false,
  errorOneOrder: false

}

export const oneOrderReduser = (state = initialState, action: TOneOrder) => {
  switch (action.type) {
    case GET_ONE_ORDER_REQUEST: {
      return { ...state, requestOneOrder: true }
    }
    case GET_ONE_ORDER_SUCCESS: {
      return { ...state, order: action.payload, requestOneOrder: false }
    }

    case GET_ONE_ORDER_FAILED: {
      return { ...state, requestOneOrder: false, errorOneOrder: action.errorText }
    }
    default: {
      return state
    }
  }
}

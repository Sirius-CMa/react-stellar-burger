
import {
  GET_ONE_ORDER_REQUEST,
  GET_ONE_ORDER_SUCCESS,
  GET_ONE_ORDER_FAILED
} from 'Action/getOneOrder'

const initialState = {
  number: null,
  order: null,
  requestOneOrder: false,
  errorOneOrder: false

}

export const oneOrderReduser = (state = initialState, action) => {
  switch (action.type) {
    case GET_ONE_ORDER_REQUEST: {
      return { ...state, requestOneOrder: true }
    }
    case GET_ONE_ORDER_SUCCESS: {
      return { ...state, order: action.payload.orders, requestOneOrder: false }
    }

    case GET_ONE_ORDER_FAILED: {
      return { ...state, requestOneOrder: false, errorOneOrder: action.payload }
    }
    default: {
      return state
    }
  }
}

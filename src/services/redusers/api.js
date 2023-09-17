import {
  GET_ALL_INGREDIENTS_REQUEST,
  GET_ALL_INGREDIENTS_SUCCESS,
  GET_ALL_INGREDIENTS_FAILED
} from 'Action/api'




const initialState = {
  data: [],
  loading: true,
  error: false,
  currentProduct: null
}

export const serverDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_INGREDIENTS_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_ALL_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      }
    }
    case GET_ALL_INGREDIENTS_FAILED: {
      return {
        ...state,
        loading: false,
        error: true,
      }
    }

    default: {
      return state
    }
  }
}

import {
  GET_ALL_INGREDIENTS_REQUEST,
  GET_ALL_INGREDIENTS_SUCCESS,
  GET_ALL_INGREDIENTS_FAILED,
  SET_CURRENT_INGREDIENT,
  REMOVE_CURRENT_INGREDIENT
} from 'Action/burgerIngredients'




const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  currentProduct: null
}

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_INGREDIENTS_REQUEST: {
      console.log(2);
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_ALL_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
      }
    }
    case GET_ALL_INGREDIENTS_FAILED: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentProduct: action.payload
      }
    }
    case REMOVE_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentProduct: null
      }
    }

    default: {
      return state
    }
  }
}

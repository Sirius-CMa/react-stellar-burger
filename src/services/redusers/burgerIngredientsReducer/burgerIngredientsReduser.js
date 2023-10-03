import {
  GET_ALL_INGREDIENTS_REQUEST,
  GET_ALL_INGREDIENTS_SUCCESS,
  GET_ALL_INGREDIENTS_FAILED,
  SET_CURRENT_INGREDIENT,
  REMOVE_CURRENT_INGREDIENT,
  SET_COUNT_INGREDIENT
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
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_ALL_INGREDIENTS_SUCCESS: {
      console.log(action.payload);
      return (
        {
          ...state,
          data: action.payload,
          isLoading: false,
          isError: false,
        })
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
    case SET_COUNT_INGREDIENT: {
      console.log(action.payload);
      const aa = state.data.map(el => el._id === action.payload._id ? el.count === undefined ? { ...el, count: 1 } : { ...el, count: el.count + 1 } : el)
      console.log(22, aa);
      return { ...state, data: aa };
    }

    default: {
      return state
    }
  }
}

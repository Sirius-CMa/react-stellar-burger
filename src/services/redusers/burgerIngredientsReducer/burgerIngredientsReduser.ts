import {
  GET_ALL_INGREDIENTS_REQUEST,
  GET_ALL_INGREDIENTS_SUCCESS,
  GET_ALL_INGREDIENTS_FAILED,

  GET_ONE_INGREDIENTS_REQUEST,
  GET_ONE_INGREDIENTS_SUCCESS,
  GET_ONE_INGREDIENTS_FAILED,

  SET_CURRENT_INGREDIENT,
  REMOVE_CURRENT_INGREDIENT,
  SET_COUNT_INGREDIENT,
  CLEAN_ALL_INGREDIENTS,
  TBurgerIngredientsActions
} from 'Action/burgerIngredients';

import { sortIngredientsById } from 'Utils/sort-ingredients-by-id';
import { TBurgerIngredientsInitialState, } from '../../../typesData';





const initialState: TBurgerIngredientsInitialState = {
  data: [],
  sortDataById: {},
  isLoading: false,
  isError: false,
  currentProduct: {}
}

export const burgerIngredientsReducer = (state = initialState, action: TBurgerIngredientsActions) => {
  switch (action.type) {

    case CLEAN_ALL_INGREDIENTS: {
      return {
        ...state,
        data: [],
        sortDataById: {}
      };
    }

    case GET_ALL_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_ALL_INGREDIENTS_SUCCESS: {
      return (
        {
          ...state,
          data: action.payload,
          isLoading: false,
          isError: false,
          sortDataById: sortIngredientsById(action.payload)
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
        currentProduct: {}
      }
    }
    case SET_COUNT_INGREDIENT: {

      return state;
    }

    case GET_ONE_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_ONE_INGREDIENTS_SUCCESS: {
      return (
        {
          ...state,
          currentProduct: action.payload,
          isLoading: false,
          isError: false,
          // sortDataById: sortIngredientsById(action.payload)
        })
    }
    case GET_ONE_INGREDIENTS_FAILED: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }

    default: {
      return state
    }
  }
}

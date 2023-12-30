import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  CLEAR_INGREDIENT,
  TBurgerConstructorActions,
} from 'Action/burgerConstructor'

import { DEFAULT_BUN } from 'Utils/constants';
import { TBurgerConstructorInitialState } from '../../../typesData';



const initialState: TBurgerConstructorInitialState = {
  selectedBun: DEFAULT_BUN,
  listIngredients: []
}

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.payload.type === "bun") {
        return { ...state, selectedBun: action.payload }
      }
      return { ...state, listIngredients: [...state.listIngredients, action.payload] }
    }
    case DELETE_INGREDIENT: {
      return { ...state, listIngredients: state.listIngredients.filter((el, index) => index !== action.payload) }
    }
    case MOVE_INGREDIENT: {
      const newArrow = [...state.listIngredients];

      const dragItem = newArrow[action.dragIndex];
      const hoveredItem = newArrow[action.hoverIndex];

      newArrow[action.hoverIndex] = dragItem;
      newArrow[action.dragIndex] = hoveredItem;

      return { ...state, listIngredients: newArrow }
    }

    case CLEAR_INGREDIENT: {
      return { ...state, listIngredients: [], selectedBun: initialState.selectedBun }
    }

    default: {
      return state;
    }
  }
}

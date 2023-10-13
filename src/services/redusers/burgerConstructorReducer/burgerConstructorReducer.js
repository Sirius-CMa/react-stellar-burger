import { ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT } from 'Action/burgerConstructor'
import { DEFAULT_BUN } from 'Utils/constants';



const initialState = {
  selectedBun: DEFAULT_BUN,
  listIngredients: []
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.payload.type === "bun") {
        return { ...state, selectedBun: action.payload }
      }
      // const newEngredient =action.payload
      // newEngredient.uuid: action.uuid
      return { ...state, listIngredients: [...state.listIngredients, action.payload] }
    }
    case DELETE_INGREDIENT: {
      return { ...state, listIngredients: state.listIngredients.filter((el, index) => index !== action.index) }
    }
    case MOVE_INGREDIENT: {
      const newArrow = [...state.listIngredients];

      const dragItem = newArrow[action.dragIndex];
      const hoveredItem = newArrow[action.hoverIndex];

      newArrow[action.hoverIndex] = dragItem;
      newArrow[action.dragIndex] = hoveredItem;

      return { ...state, listIngredients: newArrow }
    }
    default: {
      return state;
    }
  }
}

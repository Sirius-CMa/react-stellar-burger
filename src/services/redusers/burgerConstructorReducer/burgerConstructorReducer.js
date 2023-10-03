import { ADD_INGREDIENT } from 'Action/burgerConstructor'
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
      return { ...state, listIngredients: [...state.listIngredients, action.payload] }
    }
    default: {
      return state;
    }
  }
}

import { ADD_ELEMENT } from 'Action/burgerConstructor'



const initialState = {
  listIngredients: []
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ELEMENT: {
      return state
    }

    default: {
      return state;
    }
  }
}

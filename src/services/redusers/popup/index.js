import {
  SET_IS_POPUP_INGREDIENT_OPEN,
  SET_IS_POPUP_ORDER_ID_OPEN,
  SET_IS_POPUP_CLOSE,
  SET_INGREDIENT,
  REMOVE_INGREDIENT
}
  from 'Action/popup';


const initialState = {
  isPopupOpen: false,
  ingredient: null,
  orderId: null
};

export const managePopupReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_IS_POPUP_INGREDIENT_OPEN: {
      return {
        ...state,
        isPopupOpen: true,
        ingredient: action.payload
      }
    }
    case SET_IS_POPUP_ORDER_ID_OPEN: {
      return {
        ...state,
        isPopupOpen: true,
        orderId: action.payload
      }
    }
    case SET_IS_POPUP_CLOSE: {
      return {
        ...state,
        isPopupOpen: false,
        ingredient: null,
        orderId: null
      }
    }

    default: {
      return state
    }
  }
}


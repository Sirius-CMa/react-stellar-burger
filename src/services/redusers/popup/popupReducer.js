import {
  SET_IS_POPUP_CLOSE,
  SET_IS_POPUP_OPEN
}
  from 'Action/popup';


const initialState = {
  isPopupOpen: false,
};

export const popupReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_IS_POPUP_OPEN: {
      return {
        ...state,
        isPopupOpen: true
      }
    }

    case SET_IS_POPUP_CLOSE: {
      return ({
        ...state,
        isPopupOpen: false
      })
    }

    default: {
      return state
    }
  }
};

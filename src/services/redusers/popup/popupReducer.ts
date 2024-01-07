import {
  SET_IS_POPUP_CLOSE,
  SET_IS_POPUP_OPEN,
  TPopupActions
}
  from 'Action/popup';
import { TPopupInitialState } from '../../../typesData';



const initialState: TPopupInitialState = {
  isPopupOpen: false,
};

export const popupReducer = (state = initialState, action: TPopupActions) => {

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

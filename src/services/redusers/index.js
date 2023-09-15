import { combineReducers } from 'redux';
// import { burgerConstructorReducer } from './burgerConstructorReducer';
import { serverDataReducer } from 'Reducer/api'
import { managePopupReducer } from 'Reducer/popup';



export const rootReducer = combineReducers({
  serverData: serverDataReducer,
  managePopup: managePopupReducer
});

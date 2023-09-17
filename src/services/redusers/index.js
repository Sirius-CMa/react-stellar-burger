import { combineReducers } from 'redux';
import { burgerConstructorReducer } from 'Reducer/burgerConstructorReducer';
import { serverDataReducer } from 'Reducer/api'
import { managePopupReducer } from 'Reducer/popup';
import { orderReduser } from 'Reducer/orderReducer';



export const rootReducer = combineReducers({
  serverData: serverDataReducer,
  managePopup: managePopupReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReduser
});

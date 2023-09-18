import { combineReducers } from 'redux';
import { burgerConstructorReducer } from 'Reducer/burgerConstructorReducer';
import { popupReducer } from 'Reducer/popup';
import { orderReduser } from 'Reducer/orderReducer';
import { burgerIngredientsReducer } from 'Reducer/burgerIngredientsReducer';



export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  popup: popupReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReduser
});

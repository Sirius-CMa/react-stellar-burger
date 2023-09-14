import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burgerConstructorReducer';



export const rootReducer = combineReducers({
  constructor: burgerConstructorReducer
  //  step: stepReducer,
  //  cart: cartReducer,
});

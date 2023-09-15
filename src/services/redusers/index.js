import { combineReducers } from 'redux';
// import { burgerConstructorReducer } from './burgerConstructorReducer';
import { serverDataReducer } from 'Reducer/api'



export const rootReducer = combineReducers({
  serverData: serverDataReducer
});

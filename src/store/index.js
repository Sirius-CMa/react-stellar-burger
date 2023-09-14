import { legacy_createStore as createStore, compose } from 'redux'
import { rootReducer } from '../services/redusers'


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers();


export const store = createStore(rootReducer, enhancer);

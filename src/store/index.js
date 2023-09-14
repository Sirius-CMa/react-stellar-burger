import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import { rootReducer } from 'Reducer/';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));


export const store = createStore(rootReducer, enhancer);

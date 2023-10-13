import { rootReducer } from 'Reducer/';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';


export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});


// import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux'

// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const enhancer = composeEnhancers(applyMiddleware(thunk));



// export const store = configureStore({ reducer: rootReducer, enhancer });
// export const store = createStore(rootReducer, enhancer);

// import throttle from 'lodash.throttle'
import { throttle } from 'lodash';
import { loadState, saveState } from 'Utils/service-functions';

// import { rootReducer } from '../services/redusers';
import { configureStore } from '@reduxjs/toolkit';


import { socketMiddleware } from '../middleware/socket-middleware';


import {
  FEED_CONNECT,
  FEED_DISCONNECT,
  FEED_WS_CLOSE,
  FEED_WS_CONNECTING,
  FEED_WS_ERROR,
  FEED_WS_MESSAGE,
  FEED_WS_OPEN
} from 'Action/ws';

import {
  PROFILE_FEED_CONNECT,
  PROFILE_FEED_DISCONNECT,
  PROFILE_FEED_WS_CLOSE,
  PROFILE_FEED_WS_CONNECTING,
  PROFILE_FEED_WS_ERROR,
  PROFILE_FEED_WS_MESSAGE,
  PROFILE_FEED_WS_OPEN
} from 'Action/wsProfileFeed';
import { burgerIngredientsReducer } from 'Reducer/burgerIngredientsReducer';
import { popupReducer } from 'Reducer/popup';
import { burgerConstructorReducer } from 'Reducer/burgerConstructorReducer';
import { orderReduser } from 'Reducer/orderReducer';
import { authorizationReducer } from 'Reducer/authorizationReducer';
import { wsFeedReducer } from 'Reducer/wsFeedReduser';
import { wsProfileFeedReducer } from 'Reducer/wsProfileFeedReducer';
import { oneOrderReduser } from 'Reducer/getOneOrderReducer';



const feedSocketMiddlewareFeed = socketMiddleware({
  wsActions: {
    wsConnect: FEED_CONNECT,
    onOpen: FEED_WS_OPEN,
    onClose: FEED_WS_CLOSE,
    onError: FEED_WS_ERROR,
    onMessage: FEED_WS_MESSAGE,
    wsConnecting: FEED_WS_CONNECTING,
    wsDisconnect: FEED_DISCONNECT
  }
})

const feedSocketMiddlewareProfileFeed = socketMiddleware({
  wsActions: {
    wsConnect: PROFILE_FEED_CONNECT,
    onOpen: PROFILE_FEED_WS_OPEN,
    onClose: PROFILE_FEED_WS_CLOSE,
    onError: PROFILE_FEED_WS_ERROR,
    onMessage: PROFILE_FEED_WS_MESSAGE,
    wsConnecting: PROFILE_FEED_WS_CONNECTING,
    wsDisconnect: PROFILE_FEED_DISCONNECT
  }
})

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    burgerIngredients: burgerIngredientsReducer,
    popup: popupReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReduser,
    auth: authorizationReducer,
    wsFeed: wsFeedReducer,
    wsProfileFeed: wsProfileFeedReducer,
    oneOrder: oneOrderReduser
  },

  middleware: (getDefaultMiddelware) => {
    return getDefaultMiddelware({ serializableCheck: false }).concat(feedSocketMiddlewareFeed, feedSocketMiddlewareProfileFeed)
  },
  preloadedState
});


store.subscribe(throttle(() => {
  saveState(store.getState())
}, 1000));



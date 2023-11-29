import { rootReducer } from 'Reducer/';
import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from '../middelware/socket-middleware';
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

const feedSocketMiddlewareFeed = socketMiddleware({
  wsConnect: FEED_CONNECT,
  onOpen: FEED_WS_OPEN,
  onClose: FEED_WS_CLOSE,
  onError: FEED_WS_ERROR,
  onMessage: FEED_WS_MESSAGE,
  wsConnecting: FEED_WS_CONNECTING,
  wsDisconnect: FEED_DISCONNECT
})

const feedSocketMiddlewareProfileFeed = socketMiddleware({
  wsConnect: PROFILE_FEED_CONNECT,
  onOpen: PROFILE_FEED_WS_OPEN,
  onClose: PROFILE_FEED_WS_CLOSE,
  onError: PROFILE_FEED_WS_ERROR,
  onMessage: PROFILE_FEED_WS_MESSAGE,
  wsConnecting: PROFILE_FEED_WS_CONNECTING,
  wsDisconnect: PROFILE_FEED_DISCONNECT
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddelware) => {
    return getDefaultMiddelware({ serializableCheck: false }).concat(feedSocketMiddlewareFeed, feedSocketMiddlewareProfileFeed)
  }
});




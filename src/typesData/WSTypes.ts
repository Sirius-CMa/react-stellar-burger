import {
  PROFILE_FEED_CONNECT,
  PROFILE_FEED_DISCONNECT,
  PROFILE_FEED_WS_CLOSE,
  PROFILE_FEED_WS_CONNECTING,
  PROFILE_FEED_WS_ERROR,
  PROFILE_FEED_WS_MESSAGE,
  PROFILE_FEED_WS_OPEN,
} from "Action/wsProfileFeed";

import {
  FEED_CONNECT,
  FEED_DISCONNECT,
  FEED_WS_CLOSE,
  FEED_WS_CONNECTING,
  FEED_WS_ERROR,
  FEED_WS_MESSAGE,
  FEED_WS_OPEN
} from "Action/ws";


type TWSProfileFeedSActions = {
  wsConnect: typeof PROFILE_FEED_CONNECT;
  wsDisconnect: typeof PROFILE_FEED_DISCONNECT;

  onOpen: typeof PROFILE_FEED_WS_OPEN;
  onClose: typeof PROFILE_FEED_WS_CLOSE;
  onError: typeof PROFILE_FEED_WS_ERROR;
  onMessage: typeof PROFILE_FEED_WS_MESSAGE;

  wsConnecting: typeof PROFILE_FEED_WS_CONNECTING;

};

type TWSFeedSActions
  = {
    wsConnect: typeof FEED_CONNECT;
    wsDisconnect: typeof FEED_DISCONNECT;

    onOpen: typeof FEED_WS_OPEN;
    onClose: typeof FEED_WS_CLOSE;
    onError: typeof FEED_WS_ERROR;
    onMessage: typeof FEED_WS_MESSAGE;

    wsConnecting: typeof FEED_WS_CONNECTING;
  };

export type TWSActions = TWSProfileFeedSActions | TWSFeedSActions;

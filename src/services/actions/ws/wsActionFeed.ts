import { AppDispatch, TOrder } from "../../../typesData"

export const FEED_CONNECT: 'FEED_CONNECT' = 'FEED_CONNECT';
export const FEED_DISCONNECT: 'FEED_DISCONNECT' = 'FEED_DISCONNECT';

export const FEED_WS_CONNECTING: 'FEED_WS_CONNECTING' = 'FEED_WS_CONNECTING';
export const FEED_WS_OPEN: 'FEED_WS_OPEN' = 'FEED_WS_OPEN';
export const FEED_WS_CLOSE: 'FEED_WS_CLOSE' = 'FEED_WS_CLOSE';
export const FEED_WS_ERROR: 'FEED_WS_ERROR' = 'FEED_WS_ERROR';
export const FEED_WS_MESSAGE: 'FEED_WS_MESSAGE' = 'FEED_WS_MESSAGE';

export type TWSActionFeed =
  IFEED_CONNECT |
  IADD_INGREIFEED_DISCONNECTDIENT |
  IFEED_WS_CONNECTING |
  IFEED_WS_OPEN |
  IFEED_WS_CLOSE |
  IFEED_WS_ERROR |
  IFEED_WS_MESSAGE
  ;

// const url = 'wss://norma.nomoreparties.space/orders/all'

export interface IFEED_CONNECT {
  readonly type: typeof FEED_CONNECT;
  readonly payload: string;
}
export interface IADD_INGREIFEED_DISCONNECTDIENT {
  readonly type: typeof FEED_DISCONNECT;
}

export interface IFEED_WS_CONNECTING {
  readonly type: typeof FEED_WS_CONNECTING;
}

export interface IFEED_WS_OPEN {
  readonly type: typeof FEED_WS_OPEN;
}

export interface IFEED_WS_CLOSE {
  readonly type: typeof FEED_WS_CLOSE;
}

export interface IFEED_WS_ERROR {
  readonly type: typeof FEED_WS_ERROR;
  readonly payload: string;
}

export interface IFEED_WS_MESSAGE {
  readonly type: typeof FEED_WS_MESSAGE;
  readonly payload: Array<TOrder>;
}


export const connectWsFeed = (url: string) => {
  console.log('connecting');

  return function (dispatch: AppDispatch) {
    dispatch({
      type: FEED_CONNECT,
      payload: url
    })
  }
}

export const disconnectWsFeed = () => {
  console.log('disconnecting');
  return function (dispatch: AppDispatch) {
    dispatch({
      type: FEED_DISCONNECT
    })
  }
}

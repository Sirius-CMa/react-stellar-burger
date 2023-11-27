import { getCookie } from "Utils/cookie"

export const PROFILE_FEED_CONNECT = 'PROFILE_FEED_CONNECT'
export const PROFILE_FEED_DISCONNECT = 'PROFILE_FEED_DISCONNECT'

export const PROFILE_FEED_WS_CONNECTING = 'PROFILE_FEED_WS_CONNECTING'
export const PROFILE_FEED_WS_OPEN = 'PROFILE_FEED_WS_OPEN'
export const PROFILE_FEED_WS_CLOSE = 'PROFILE_FEED_WS_CLOSE'
export const PROFILE_FEED_WS_ERROR = 'PROFILE_FEED_WS_ERROR'
export const PROFILE_FEED_WS_MESSAGE = 'PROFILE_FEED_WS_MASSEGE'

// const url = 'wss://norma.nomoreparties.space/orders/all'

export const connectWsProfileFeed = (url) => {
  console.log('connecting');
  // console.log(`${url}?token=${getCookie('token').slice(7)}`);
  return function (dispatch) {
    dispatch({
      type: PROFILE_FEED_CONNECT,
      payload: `${url}?token=${getCookie('token').slice(7)}`
    })
  }
}

export const disconnectWsProfileFeed = () => {
  console.log('disconnecting');
  return function (dispatch) {
    dispatch({
      type: PROFILE_FEED_DISCONNECT
    })
  }
}

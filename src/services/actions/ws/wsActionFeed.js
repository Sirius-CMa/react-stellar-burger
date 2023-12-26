export const FEED_CONNECT = 'FEED_CONNECT'
export const FEED_DISCONNECT = 'FEED_DISCONNECT'

export const FEED_WS_CONNECTING = 'FEED_WS_CONNECTING'
export const FEED_WS_OPEN = 'FEED_WS_OPEN'
export const FEED_WS_CLOSE = 'FEED_WS_CLOSE'
export const FEED_WS_ERROR = 'FEED_WS_ERROR'
export const FEED_WS_MESSAGE = 'FEED_WS_MASSEGE'

// const url = 'wss://norma.nomoreparties.space/orders/all'

export const connectWsFeed = (url) => {
  console.log('connecting');

  return function (dispatch) {
    dispatch({
      type: FEED_CONNECT,
      payload: url
    })
  }
}

export const disconnectWsFeed = () => {
  console.log('disconnecting');
  return function (dispatch) {
    dispatch({
      type: FEED_DISCONNECT
    })
  }
}

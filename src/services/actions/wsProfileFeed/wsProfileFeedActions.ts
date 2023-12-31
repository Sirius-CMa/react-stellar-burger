import { Api } from "Utils/api"
import { dataServer } from "Utils/constants"
import { deleteCookie, getCookie, setCookie } from "Utils/cookie"
import { AppDispatch } from "../../../typesData"

const api = new Api(dataServer, getCookie, setCookie, deleteCookie)

export const PROFILE_FEED_CONNECT: 'PROFILE_FEED_CONNECT' = 'PROFILE_FEED_CONNECT'
export const PROFILE_FEED_DISCONNECT: 'PROFILE_FEED_DISCONNECT' = 'PROFILE_FEED_DISCONNECT'

export const PROFILE_FEED_WS_CONNECTING: 'PROFILE_FEED_WS_CONNECTING' = 'PROFILE_FEED_WS_CONNECTING'
export const PROFILE_FEED_WS_OPEN: 'PROFILE_FEED_WS_OPEN' = 'PROFILE_FEED_WS_OPEN'
export const PROFILE_FEED_WS_CLOSE: 'PROFILE_FEED_WS_CLOSE' = 'PROFILE_FEED_WS_CLOSE'
export const PROFILE_FEED_WS_ERROR: 'PROFILE_FEED_WS_ERROR' = 'PROFILE_FEED_WS_ERROR'
export const PROFILE_FEED_WS_MESSAGE: 'PROFILE_FEED_WS_MESSAGE' = 'PROFILE_FEED_WS_MESSAGE'

export const PROFILE_FEED_CLEAN: 'PROFILE_FEED_CLEAN' = 'PROFILE_FEED_CLEAN'

export type TWSProfileFeedActions =
  IPROFILE_FEED_CONNECT |
  IPROFILE_FEED_DISCONNECT |
  IPROFILE_FEED_WS_CONNECTING |
  IPROFILE_FEED_WS_OPEN |
  IPROFILE_FEED_WS_CLOSE |
  IPROFILE_FEED_WS_ERROR |
  IPROFILE_FEED_WS_MESSAGE |
  IPROFILE_FEED_CLEAN
  ;

export interface IPROFILE_FEED_CONNECT {
  readonly type: typeof PROFILE_FEED_CONNECT
}

export interface IPROFILE_FEED_DISCONNECT {
  readonly type: typeof PROFILE_FEED_DISCONNECT;
}

export interface IPROFILE_FEED_WS_CONNECTING {
  readonly type: typeof PROFILE_FEED_WS_CONNECTING
}

export interface IPROFILE_FEED_WS_OPEN {
  readonly type: typeof PROFILE_FEED_WS_OPEN
}

export interface IPROFILE_FEED_WS_CLOSE {
  readonly type: typeof PROFILE_FEED_WS_CLOSE
}

export interface IPROFILE_FEED_WS_ERROR {
  readonly type: typeof PROFILE_FEED_WS_ERROR;
  readonly payload: any;
}

export interface IPROFILE_FEED_WS_MESSAGE {
  readonly type: typeof PROFILE_FEED_WS_MESSAGE;
  readonly payload: any;
}

export interface IPROFILE_FEED_CLEAN {
  readonly type: typeof PROFILE_FEED_CLEAN
}


export const connectWsProfileFeed = (url: string) => {
  console.log('connecting');
  // console.log(`${url}?token=${getCookie('token').slice(7)}`);
  return function (dispatch: AppDispatch) {
    api.getUserAuth()
      .then(res => {
        res.success && dispatch({
          type: PROFILE_FEED_CONNECT,
          payload: `${url}?token=${getCookie('token')?.slice(7)}`
        })
      })
      .catch((error) => console.log(error))

  }
}

export const disconnectWsProfileFeed = () => {
  console.log('disconnecting');
  return function (dispatch: AppDispatch) {
    dispatch({
      type: PROFILE_FEED_DISCONNECT
    })
  }
}


// export interface IADD_INGREDIENT {
//   readonly type: typeof
// }

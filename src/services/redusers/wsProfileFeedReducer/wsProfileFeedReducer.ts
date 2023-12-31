import {
  PROFILE_FEED_WS_CONNECTING,
  PROFILE_FEED_WS_OPEN,
  PROFILE_FEED_WS_CLOSE,
  PROFILE_FEED_WS_ERROR,
  PROFILE_FEED_WS_MESSAGE,
  PROFILE_FEED_CLEAN,
  PROFILE_FEED_DISCONNECT,
  TWSProfileFeedActions
} from 'Action/wsProfileFeed'
import { TDataWS } from '../../../typesData';
// import { sortOrdersById } from 'Utils/sort-ingredients-by-id'

export type TWSProfileFeedInisialstate = {
  status: string;
  data: TDataWS | null;
  connectingError: {} | null;
  // sortedOrdersByNumber: TSortedOrdersByNumber;
}

const inisialstate: TWSProfileFeedInisialstate = {
  status: '',
  data: {
    success: false,
    orders: [],
    total: null,
    totalToday: null,
  },
  connectingError: {},
  // sortedProfileOrdersById: []
}

export const wsProfileFeedReducer = (state = inisialstate, action: TWSProfileFeedActions) => {
  switch (action.type) {
    case PROFILE_FEED_WS_CONNECTING:
      console.log('Сервер установил соединение для ProfileFEED.');
      return { ...state, status: 'connecting' }

    case PROFILE_FEED_WS_OPEN:
      return { ...state, status: 'online' }

    case PROFILE_FEED_WS_ERROR:
      return { ...state, connectingError: action.payload }

    case PROFILE_FEED_WS_MESSAGE:
      return { ...state, data: action.payload } //sortedProfileOrdersById: sortOrdersById(action.payload.orders)

    case PROFILE_FEED_WS_CLOSE:
      return { ...state, status: 'close' }

    case PROFILE_FEED_CLEAN:
      return { ...state, status: 'close' }

    case PROFILE_FEED_DISCONNECT:
      return {
        ...state, status: '',
        data: {
          success: false,
          orders: [],
          total: null,
          totalToday: null,
        }
      }

    default: return state
  }
}

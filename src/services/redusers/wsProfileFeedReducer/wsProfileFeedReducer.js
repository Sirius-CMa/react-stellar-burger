import {
  PROFILE_FEED_WS_CONNECTING,
  PROFILE_FEED_WS_OPEN,
  PROFILE_FEED_WS_CLOSE,
  PROFILE_FEED_WS_ERROR,
  PROFILE_FEED_WS_MESSAGE
} from 'Action/wsProfileFeed'
import { sortOrdersById } from 'Utils/sort-ingredients-by-id'

const inisialstate = {
  status: '',
  data: null,
  connectingError: null,
  sortedProfileOrdersById: null
}

export const wsProfileFeedReducer = (state = inisialstate, action) => {
  switch (action.type) {
    case PROFILE_FEED_WS_CONNECTING:
      return { ...state, status: 'connecting' }

    case PROFILE_FEED_WS_OPEN:
      return { ...state, status: 'online' }

    case PROFILE_FEED_WS_ERROR:
      return { ...state, connectingError: action.payload }

    case PROFILE_FEED_WS_MESSAGE:
      return { ...state, data: action.payload, } //sortedProfileOrdersById: sortOrdersById(action.payload.orders)

    case PROFILE_FEED_WS_CLOSE:
      return { ...state, status: 'close' }

    default: return state
  }
}

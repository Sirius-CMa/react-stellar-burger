import {
  FEED_WS_CONNECTING,
  FEED_WS_OPEN,
  FEED_WS_CLOSE,
  FEED_WS_ERROR,
  FEED_WS_MESSAGE
} from 'Action/ws'
import { sortOrdersByNumber } from 'Utils/sort-ingredients-by-id'

const inisialstate = {
  status: '',
  data: null,
  connectingError: null,
  sortedOrdersByNumber: null
}

export const wsFeedReducer = (state = inisialstate, action) => {
  switch (action.type) {
    case FEED_WS_CONNECTING:
      return { ...state, status: 'connecting' }

    case FEED_WS_OPEN:
      return { ...state, status: 'online' }

    case FEED_WS_ERROR:
      return { ...state, connectingError: action.payload }

    case FEED_WS_MESSAGE:
      return { ...state, data: action.payload, sortedOrdersByNumber: sortOrdersByNumber(action.payload.orders) }

    case FEED_WS_CLOSE:
      return { ...state, status: 'close' }

    default: return state
  }
}


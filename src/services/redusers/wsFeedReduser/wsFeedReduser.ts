import {
  FEED_WS_CONNECTING,
  FEED_WS_OPEN,
  FEED_WS_CLOSE,
  FEED_WS_ERROR,
  FEED_WS_MESSAGE,
  TWSActionFeed
}
  from 'Action/ws'
import { sortOrdersByNumber } from 'Utils/sort-ingredients-by-id'
import { TWSFeedInisialstate } from '../../../typesData'



const inisialstate: TWSFeedInisialstate = {
  status: '',
  data: {
    success: false,
    orders: [],
    total: null,
    totalToday: null,
  },
  connectingError: null,
  sortedOrdersByNumber: []
}

export const wsFeedReducer = (state = inisialstate, action: TWSActionFeed) => {
  switch (action.type) {
    case FEED_WS_CONNECTING:
      return { ...state, status: 'connecting' }

    case FEED_WS_OPEN:
      return { ...state, status: 'online' }

    case FEED_WS_ERROR:
      return { ...state, connectingError: action.payload }

    case FEED_WS_MESSAGE:
      console.log(55, action.payload);
      return { ...state, data: action.payload, sortedOrdersByNumber: sortOrdersByNumber(action.payload) }

    case FEED_WS_CLOSE:
      return { ...state, status: 'close' }



    default: return state
  }
}


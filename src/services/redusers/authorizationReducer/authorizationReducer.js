import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED
} from 'Action/authorization'


const initialState = {
  user: {},
  auth: false
}

export const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS: { return { ...state, auth: true } }
    default: { return state }
  }
}


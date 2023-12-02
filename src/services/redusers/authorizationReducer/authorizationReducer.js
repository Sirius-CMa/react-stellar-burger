import {
  CHEK_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,

  RESET_PASSWORD_USER_REQUEST,
  RESET_PASSWORD_USER_SUCCESS,
  RESET_PASSWORD_USER_FAILED,

  FORGOT_PASSWORD_USER_REQUEST,
  FORGOT_PASSWORD_USER_SUCCESS,
  FORGOT_PASSWORD_USER_FAILED,

  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,

  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,

  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,

  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,

  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILED
} from 'Action/authorization'

// добавить AUTH из getUSER

const initialState = {
  user: null,
  auth: false,

  registerRequest: false,
  registerRequestError: false,

  loginRequest: false,
  loginRequestError: false,

  logoutRequest: false,
  logoutRequestError: false,

  forgotPasswordRequest: false,
  forgotPasswordRequestError: false,
  forgotPasswordData: {},

  resetPasswordRequest: false,
  resetPasswordRequestError: false,
  resetPasswordData: false,
  failedResetPassword: true,

  refreshRequest: null,
  dataRefresh: null,
  refreshRequestError: null,

  authRequest: null,
  authRequestError: null
}


export const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {

    case AUTH_USER_REQUEST: {
      return { ...state, authRequest: true }
    }
    case AUTH_USER_SUCCESS: {

      return { ...state, authRequest: false, authRequestError: false }
    }
    case AUTH_USER_FAILED: {
      return {
        ...state, authRequest: false,
        authRequestError: action.payload
      }
    }

    case RESET_PASSWORD_USER_REQUEST: {
      return { ...state, resetPasswordRequest: true }
    }
    case RESET_PASSWORD_USER_SUCCESS: {

      return {
        ...state,
        resetPasswordData: action.payload,
        resetPasswordRequest: false,
        resetPasswordRequestError: false,
        forgotPasswordData: false,
        isPasswordReset: false,
        failedResetPassword: false

      }
    }
    case RESET_PASSWORD_USER_FAILED: {
      return {
        ...state, resetPasswordRequest: false,
        resetPasswordRequestError: action.payload,
        isPasswordReset: false,
        forgotPasswordData: false,
        failedResetPassword: true
      }
    }

    case FORGOT_PASSWORD_USER_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
        failedResetPassword: false
      }
    }
    case FORGOT_PASSWORD_USER_SUCCESS: {
      return {
        ...state,
        forgotPasswordData: action.payload,
        forgotPasswordRequest: false,
        forgotPasswordRequestError: false,
        isPasswordReset: action.payload.success,

      }
    }
    case FORGOT_PASSWORD_USER_FAILED: {
      return {
        ...state, forgotPasswordRequest: false,
        forgotPasswordRequestError: action.payload
      }

    }


    case UPDATE_USER_REQUEST: {
      return { ...state, updateRequest: true }
    }
    case UPDATE_USER_SUCCESS: {
      return { ...state, user: action.payload, auth: true, updateRequest: false, updateRequestError: false }
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state, updateRequest: false,
        updateRequestError: action.payload,
        auth: false,
        user: null
      }
    }

    case LOGOUT_USER_REQUEST: {
      return { ...state, logoutRequest: true }
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        user: null, auth: false,
        logoutRequest: false,
        logoutRequestError: false,
        dataRefresh: null
      }
    }
    case LOGOUT_USER_FAILED: {
      return {
        ...state, logoutRequest: false,
        logoutRequestError: action.payload
      }
    }

    case LOGIN_USER_REQUEST: {
      return { ...state, loginRequest: true }
    }
    case LOGIN_USER_SUCCESS: {
      return { ...state, user: action.payload, auth: true, loginRequest: false, loginRequestError: false, forgotPasswordData: false, resetPasswordData: false }
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state, loginRequest: false,
        loginRequestError: action.payload
      }
    }

    case REGISTER_USER_REQUEST: {
      return { ...state, registerRequest: true }
    }
    case REGISTER_USER_SUCCESS: {
      return { ...state, user: action.payload, auth: true, registerRequest: false, }
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state, registerRequest: false,
        registerRequestError: action.payload
      }
    }

    case REFRESH_TOKEN_REQUEST: {
      return { ...state, refreshRequest: true }
    }
    case REFRESH_TOKEN_SUCCESS: {
      return { ...state, dataRefresh: action.payload, auth: true, refreshRequest: false }
    }
    case REFRESH_TOKEN_FAILED: {
      return {
        ...state, refreshRequest: false,
        refreshRequestError: action.payload
      }
    }

    case CHEK_FAILED: {
      return {
        ...state, auth: false
      }
    }


    default: { return state }
  }
}

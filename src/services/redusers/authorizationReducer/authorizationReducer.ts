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
  AUTH_USER_FAILED,
  TAuthorizationActions
} from 'Action/authorization'
import { TLoginResponse } from '../../../typesData/authTypes';

// добавить AUTH из getUSER

export type TAuthorizationInitialState = {
  user: TLoginResponse,
  auth: boolean;

  registerRequest: boolean;
  registerRequestError: {};

  loginRequest: boolean;
  loginRequestError: {};

  logoutRequest: boolean;
  logoutSuccess: boolean;
  logoutRequestError: {};

  forgotPasswordRequest: boolean;
  forgotPasswordRequestError: {};
  forgotPasswordData: {},
  isForgotPassword: boolean;
  isPasswordReset: boolean;

  resetPasswordRequest: boolean;
  resetPasswordRequestError: {};
  resetPasswordData: {};
  isPasswordResetSuccess: boolean;
  failedResetPassword: boolean;

  refreshRequest: boolean;
  dataRefresh: {};
  refreshRequestError: {};

  authRequest: boolean;
  authRequestError: {};
}

const initialState: TAuthorizationInitialState = {
  user: {
    email: '',
    name: ''
  },
  auth: false,

  loginRequest: false,
  loginRequestError: {},

  registerRequest: false,
  registerRequestError: {},



  logoutRequest: false,
  logoutSuccess: false,
  logoutRequestError: {},

  forgotPasswordRequest: false,
  forgotPasswordRequestError: {},
  forgotPasswordData: {},
  isForgotPassword: false,
  isPasswordReset: false,

  resetPasswordRequest: false,
  resetPasswordRequestError: {},
  resetPasswordData: {},
  isPasswordResetSuccess: false,
  failedResetPassword: true,

  refreshRequest: false,
  dataRefresh: {},
  refreshRequestError: {},

  authRequest: false,
  authRequestError: {}
}


export const authorizationReducer = (state = initialState, action: TAuthorizationActions) => {
  switch (action.type) {

    case LOGIN_USER_REQUEST: {
      return { ...state, loginRequest: true, isForgotPassword: false, isPasswordResetSuccess: false }
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        auth: true,
        loginRequest: false,
        loginRequestError: {},
        forgotPasswordData: {},
        resetPasswordData: {}
      }
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state, loginRequest: false,
        loginRequestError: action.payload
      }
    }


    case AUTH_USER_REQUEST: {
      return { ...state, authRequest: true, authRequestError: {} }
    }
    case AUTH_USER_SUCCESS: {

      return { ...state, authRequest: false, user: action.payload }
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
        isPasswordResetSuccess: action.payload.success,
        resetPasswordRequest: false,
        resetPasswordRequestError: {},
        forgotPasswordData: {},
        isPasswordReset: false,
        failedResetPassword: false,
        isForgotPassword: false

      }
    }
    case RESET_PASSWORD_USER_FAILED: {
      return {
        ...state, resetPasswordRequest: false,
        resetPasswordRequestError: action.payload,
        isPasswordReset: false,
        forgotPasswordData: {},
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
        isForgotPassword: true,
        forgotPasswordRequest: false,
        forgotPasswordRequestError: {},
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
      return { ...state, user: action.payload, auth: true, updateRequest: false, updateRequestError: {} }
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state, updateRequest: false,
        updateRequestError: action.payload,
        auth: false,
        user: {
          email: '',
          name: ''
        }
      }
    }

    case LOGOUT_USER_REQUEST: {
      return { ...state, logoutRequest: true }
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        auth: false,
        user: {
          email: '',
          name: ''
        },
        logoutRequest: false,
        logoutRequestError: {},
        dataRefresh: {}
      }
    }
    case LOGOUT_USER_FAILED: {
      return {
        ...state,
        auth: false,
        user: {
          email: '',
          name: ''
        },
        logoutRequest: false,
        logoutRequestError: action.payload,

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

// import { CLEAN_ALL_INGREDIENTS } from "Action/burgerIngredients";
import { Api } from "../../../utils/api";
import { dataServer } from "Utils/constants";
import { deleteCookie, getCookie, setCookie } from "Utils/cookie";
import { AppDispatch } from "../../../typesData";
import { TForgotPasswordRequest, TForgotPasswordResponse, TLoginRequest, TLoginResponse, TRefreshToken, TRegisterRequest, TResetPasswordRequest, TResetPasswordResponse } from "../../../typesData/authTypes";

const api = new Api(dataServer, getCookie, setCookie, deleteCookie);

export type TAuthorizationActions =
  IAUTH_USER_REQUEST | IAUTH_USER_SUCCESS | IAUTH_USER_FAILED |
  IREGISTER_USER_REQUEST | IREGISTER_USER_SUCCESS | IREGISTER_USER_FAILED |
  ILOGIN_USER_REQUEST | ILOGIN_USER_SUCCESS | ILOGIN_USER_FAILED |
  ILOGOUT_USER_REQUEST | ILOGOUT_USER_SUCCESS | ILOGOUT_USER_FAILED |
  IUPDATE_USER_REQUEST | IUPDATE_USER_SUCCESS | IUPDATE_USER_FAILED |
  IFORGOT_PASSWORD_USER_REQUEST | IFORGOT_PASSWORD_USER_SUCCESS | IFORGOT_PASSWORD_USER_FAILED |
  IRESET_PASSWORD_USER_REQUEST | IRESET_PASSWORD_USER_SUCCESS | IRESET_PASSWORD_USER_FAILED |
  IREFRESH_TOKEN_REQUEST | IREFRESH_TOKEN_SUCCESS | IREFRESH_TOKEN_FAILED |
  ICHEK_FAILED
  ;

export const LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST' = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS' = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILED: 'LOGIN_USER_FAILED' = 'LOGIN_USER_FAILED'

export interface ILOGIN_USER_REQUEST {
  readonly type: typeof LOGIN_USER_REQUEST;
}

export interface ILOGIN_USER_SUCCESS {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly payload: TLoginResponse
}

export interface ILOGIN_USER_FAILED {
  readonly type: typeof LOGIN_USER_FAILED;
  readonly payload: any
}

export function loginUser(body: TLoginRequest) {
  console.log(body);
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST
    });
    api.loginUser(body)
      .then(res => {
        console.log('ww', res.user);
        localStorage.setItem("refreshToken", res.refreshToken);
        setCookie('token', res.accessToken);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: res.user,
        });

      })
      .catch((error) => {
        console.log('fail', error);
        dispatch({
          type: LOGIN_USER_FAILED,
          payload: error
        });
      })
  };
}


export const AUTH_USER_REQUEST: 'AUTH_USER_REQUEST' = 'AUTH_USER_REQUEST'
export const AUTH_USER_SUCCESS: 'AUTH_USER_SUCCESS' = 'AUTH_USER_SUCCESS'
export const AUTH_USER_FAILED: 'AUTH_USER_FAILED' = 'AUTH_USER_FAILED'

export interface IAUTH_USER_REQUEST {
  readonly type: typeof AUTH_USER_REQUEST;
  readonly payload: boolean
}
export interface IAUTH_USER_SUCCESS {
  readonly type: typeof AUTH_USER_SUCCESS;
  readonly payload: TLoginResponse;
}

export interface IAUTH_USER_FAILED {
  readonly type: typeof AUTH_USER_FAILED;
  readonly payload: any
}

export function getUser() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: AUTH_USER_REQUEST,
      authChecked: false,
    });
    api.getUserAuth()// api.getUserAuth(getCookie('token'))
      .then(res => {

        dispatch({
          type: AUTH_USER_SUCCESS,
          user: res.user
        })
      })
      .catch(error => {
        console.log('fail', error.message);
        dispatch({
          type: AUTH_USER_FAILED,
          payload: error
        });
      })
  };
}

export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILED: 'UPDATE_USER_FAILED' = 'UPDATE_USER_FAILED'

export interface IUPDATE_USER_REQUEST {
  readonly type: typeof UPDATE_USER_REQUEST
}

export interface IUPDATE_USER_SUCCESS {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: TLoginResponse
}

export interface IUPDATE_USER_FAILED {
  readonly type: typeof UPDATE_USER_FAILED;
  readonly payload: any;
}

export function updateUser(body: TRegisterRequest) {
  // console.log('body', body);
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST
    });
    api.updateUser(body)
      .then((res) => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: res.user,
        });
      })
      .catch(error => {
        console.log('user fail', error);
        dispatch({
          type: UPDATE_USER_FAILED,
          payload: error
        });
      })
  }
}

export const FORGOT_PASSWORD_USER_REQUEST: 'FORGOT_PASSWORD_USER_REQUEST' = 'FORGOT_PASSWORD_USER_REQUEST'
export const FORGOT_PASSWORD_USER_SUCCESS: 'FORGOT_PASSWORD_USER_SUCCESS' = 'FORGOT_PASSWORD_USER_SUCCESS'
export const FORGOT_PASSWORD_USER_FAILED = 'FORGOT_PASSWORD_USER_FAILED'

export interface IFORGOT_PASSWORD_USER_REQUEST {
  readonly type: typeof FORGOT_PASSWORD_USER_REQUEST
}

export interface IFORGOT_PASSWORD_USER_SUCCESS {
  readonly type: typeof FORGOT_PASSWORD_USER_SUCCESS;
  readonly payload: TForgotPasswordResponse
}

export interface IFORGOT_PASSWORD_USER_FAILED {
  readonly type: typeof FORGOT_PASSWORD_USER_FAILED;
  readonly payload: any;
}

export function forgotPassword(body: TForgotPasswordRequest) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: FORGOT_PASSWORD_USER_REQUEST
    });
    api.forgotPassword(body)
      .then(res => {
        console.log('forgot', res);
        dispatch({
          type: FORGOT_PASSWORD_USER_SUCCESS,
          payload: res

        })
      })
      .catch(error => {
        console.log('fail', error);
        dispatch({
          type: FORGOT_PASSWORD_USER_FAILED,
          payload: error
        });
      })
  };
}

export const RESET_PASSWORD_USER_REQUEST: 'RESET_PASSWORD_USER_REQUEST' = 'RESET_PASSWORD_USER_REQUEST'
export const RESET_PASSWORD_USER_SUCCESS: 'RESET_PASSWORD_USER_SUCCESS' = 'RESET_PASSWORD_USER_SUCCESS'
export const RESET_PASSWORD_USER_FAILED = 'RESET_PASSWORD_USER_FAILED'

export interface IRESET_PASSWORD_USER_REQUEST {
  readonly type: typeof RESET_PASSWORD_USER_REQUEST
}

export interface IRESET_PASSWORD_USER_SUCCESS {
  readonly type: typeof RESET_PASSWORD_USER_SUCCESS
  readonly payload: TResetPasswordResponse;
}

export interface IRESET_PASSWORD_USER_FAILED {
  readonly type: typeof RESET_PASSWORD_USER_FAILED;
  readonly payload: any;
}



export function resetPassword(body: TResetPasswordRequest) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: RESET_PASSWORD_USER_REQUEST
    });
    api.resetPassword(body)
      .then(res => {
        console.log('reset - ', res);
        dispatch({
          type: RESET_PASSWORD_USER_SUCCESS,
          payload: res

        })
      })
      .catch(error => {
        console.log('fail', error);
        dispatch({
          type: RESET_PASSWORD_USER_FAILED,
          payload: error
        });
      })
  };
}

export const REFRESH_TOKEN_REQUEST: 'REFRESH_TOKEN_REQUEST' = 'REFRESH_TOKEN_REQUEST'
export const REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS' = 'REFRESH_TOKEN_SUCCESS'
export const REFRESH_TOKEN_FAILED: 'REFRESH_TOKEN_FAILED' = 'REFRESH_TOKEN_FAILED'

export interface IREFRESH_TOKEN_REQUEST {
  readonly type: typeof REFRESH_TOKEN_REQUEST
}
export interface IREFRESH_TOKEN_SUCCESS {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
  readonly payload: TRefreshToken
}
export interface IREFRESH_TOKEN_FAILED {
  readonly type: typeof REFRESH_TOKEN_FAILED;
  readonly payload: any;
}



export function refreshToken(token: TRefreshToken) {
  console.log('refreshTokenAction', token);
  return function (dispatch: AppDispatch) {
    deleteCookie('token')
    dispatch({
      type: REFRESH_TOKEN_REQUEST
    });
    api.refreshToken()
      .then(res => {
        console.log('refToken', res);
        localStorage.setItem("refreshToken", res.refreshToken);
        setCookie('token', res.accessToken)
        // setCookie('token', res.accessToken);
        dispatch({
          type: REFRESH_TOKEN_SUCCESS,
          payload: res.refreshToken,
        });
      })
      .catch(error => {
        console.log('refresh fail', error);
        dispatch({
          type: REFRESH_TOKEN_FAILED,
          payload: error
        });
      })
  };
}

export const CHEK_FAILED: 'CHEK_FAILED' = 'CHEK_FAILED'

export interface ICHEK_FAILED {
  readonly type: typeof CHEK_FAILED
}

export const REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST' = 'REGISTER_USER_REQUEST'
export const REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS' = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAILED: 'REGISTER_USER_FAILED' = 'REGISTER_USER_FAILED'

export interface IREGISTER_USER_REQUEST {
  readonly type: typeof REGISTER_USER_REQUEST
}

export interface IREGISTER_USER_SUCCESS {
  readonly type: typeof REGISTER_USER_SUCCESS
  readonly payload: TLoginResponse
}

export interface IREGISTER_USER_FAILED {
  readonly type: typeof REGISTER_USER_FAILED
  readonly payload: any;
}

//https://norma.nomoreparties.space/api/auth/register
export function registerUser(body: TRegisterRequest) {
  // console.log('body', body);
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST
    });
    api.registerUser(body)
      .then(res => {
        console.log('qqq', res.user);
        localStorage.setItem("refreshToken", res.refreshToken);
        setCookie('token', res.accessToken);
        dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: res.user,
        });

      })
      .catch((error) => {
        console.log('user fail', error);
        dispatch({
          type: REGISTER_USER_FAILED,
          payload: error
        });
      })
  };
}


export const LOGOUT_USER_REQUEST: 'LOGOUT_USER_REQUEST' = 'LOGOUT_USER_REQUEST'
export const LOGOUT_USER_SUCCESS: 'LOGOUT_USER_SUCCESS' = 'LOGOUT_USER_SUCCESS'
export const LOGOUT_USER_FAILED: 'LOGOUT_USER_FAILED' = 'LOGOUT_USER_FAILED'

export interface ILOGOUT_USER_REQUEST {
  readonly type: typeof LOGOUT_USER_REQUEST;
}

export interface ILOGOUT_USER_SUCCESS {
  readonly type: typeof LOGOUT_USER_SUCCESS
}

export interface ILOGOUT_USER_FAILED {
  readonly type: typeof LOGOUT_USER_FAILED;
  readonly payload: any;
}


export function logoutUser() {
  console.log('logOut');
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGOUT_USER_REQUEST
    });
    api.logoutUser({ token: localStorage.getItem('refreshToken') })
      .then(res => {
        console.log('logout', res.success, res.message);
        deleteCookie("token")
        localStorage.removeItem("refreshToken");
        dispatch({
          type: LOGOUT_USER_SUCCESS
        });

      })
      .catch(error => {
        console.log('fail', error);
        deleteCookie("token")
        localStorage.removeItem("refreshToken");
        dispatch({
          type: LOGOUT_USER_FAILED,
          payload: error
        });
      })
  };
}

































// {
//   "success": true,
//   "accessToken": "Bearer ...",
//   "refreshToken": ""
// }

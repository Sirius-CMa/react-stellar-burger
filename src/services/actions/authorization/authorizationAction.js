import { Api } from "Api";
import { dataServer } from "Utils/constants";
import { deleteCookie, getCookie, setCookie } from "Utils/cookie";

const api = new Api(dataServer);


export const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST'
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS'
export const AUTH_USER_FAILED = 'AUTH_USER_FAILED'

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED'

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED'

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST'
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS'
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED'

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED'

export const FORGOT_PASSWORD_USER_REQUEST = 'FORGOT_PASSWORD_USER_REQUEST'
export const FORGOT_PASSWORD_USER_SUCCESS = 'FORGOT_PASSWORD_USER_SUCCESS'
export const FORGOT_PASSWORD_USER_FAILED = 'FORGOT_PASSWORD_USER_FAILED'

export const RESET_PASSWORD_USER_REQUEST = 'RESET_PASSWORD_USER_REQUEST'
export const RESET_PASSWORD_USER_SUCCESS = 'RESET_PASSWORD_USER_SUCCESS'
export const RESET_PASSWORD_USER_FAILED = 'RESET_PASSWORD_USER_FAILED'



export function resetPassword(body) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_USER_REQUEST
    });
    api.resetPassword(body)
      .then(res => {
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

export function forgotPassword(body) {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_USER_REQUEST
    });
    api.forgotPassword(body)
      .then(res => {
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



export function logoutUser() {
  console.log('logOut');
  return function (dispatch) {
    dispatch({
      type: LOGOUT_USER_REQUEST
    });
    api.logoutUser({ token: localStorage.getItem('refreshToken') })
      .then(res => {
        if (res && res.success) {
          console.log('succces logout');
          deleteCookie("token")
          localStorage.removeItem("refreshToken");
          dispatch({
            type: LOGOUT_USER_SUCCESS
          });
        }
      })
      .catch(error => {
        console.log('fail', error);
        dispatch({
          type: LOGOUT_USER_FAILED,
          payload: error
        });
      })
  };
}




export function getUser() {
  return function (dispatch) {
    dispatch({
      type: AUTH_USER_REQUEST,
      authChecked: false,
    });
    api.getUserAuth(getCookie('token'))
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

//https://norma.nomoreparties.space/api/auth/register
export function registerUser(body) {
  console.log('body', body);
  return function (dispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST
    });
    api.registerUser(body)
      .then(res => {
        console.log(22);
        if (res && res.success) {
          console.log('succces');
          dispatch({
            type: REGISTER_USER_SUCCESS,
            user: res.user,
          });
        }
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

export function loginUser(body) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST
    });
    api.loginUser(body)
      .then(res => {

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


export function updateUser(body) {
  console.log('body', body);
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST
    });
    api.updateUser(getCookie('token'), body)
      .then(res => {
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
  };
}

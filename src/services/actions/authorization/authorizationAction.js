import { Api } from "Api";
import { dataServer } from "Utils/constants";
import { getCookie, setCookie } from "Utils/cookie";

const api = new Api(dataServer);


export const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST'
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS'
export const AUTH_USER_FAILED = 'AUTH_USER_FAILED'

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED'

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS = 'LOGINR_USER_SUCCESS'
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED'

export function getUser() {
  console.log('getUser');
  return function (dispatch) {
    dispatch({
      type: AUTH_USER_REQUEST,
      authChecked: false,
    });
    api.getUserAuth(getCookie('token'))
      .then(res => {
        if (res && res.success) {
          console.log('succces');
          dispatch({
            type: AUTH_USER_SUCCESS,
            user: res.user,
          });
        }
      })
      .catch(err => {
        console.log('user fail');
        dispatch({
          type: AUTH_USER_FAILED,
          err
        });
      })
  };
}

//https://norma.nomoreparties.space/api/auth/register
export function registerUser(body) {
  console.log('body', body);
  return function (dispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST,
      authChecked: false,
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
      .catch(err => {

        console.log('user fail', err);
        dispatch({
          type: REGISTER_USER_FAILED,
          err
        });
      })
  };
}

export function loginUser(body) {
  console.log('body', body);
  return function (dispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST,
      authChecked: false,
    });
    api.loginUser(body)
      .then(res => {

        localStorage.setItem("refreshToken", res.refreshToken);
        setCookie('token', res.accessToken);

        console.log('куки и рефрештокен установлены');

        dispatch({
          type: LOGIN_USER_SUCCESS,
          user: res.user,
        });

      })
      .catch(err => {

        console.log('user fail', err);
        dispatch({
          type: LOGIN_USER_FAILED,
          err
        });
      })
  };
}

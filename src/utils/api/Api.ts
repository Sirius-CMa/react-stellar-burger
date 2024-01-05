import {
  DictionaryStrStr,
  TErrorResponse,
  TFetch,
  TForgotPasswordRequest,
  TForgotPasswordResponse,
  TGetOneOrderResponse,
  TLoadIngredientsResponse,
  TLoginRequest,
  TLoginUserResponse,
  TLogoutRequest,
  TLogoutResponse,
  TNewOrderRequest,
  TNewOrderResponse,
  TOptions,
  TRefreshTokenResponse,
  TRegisterRequest,
  TRegisterUserResponse,
  TResetPasswordRequest,
  TUpdateProfileResponse,
  TUserAuthResponse
} from "../../typesData/authTypes";




export class Api {
  _baseUrl: string;
  _headers: {};
  _getCookie: (a: string) => string | undefined;
  _setCookie: (name: string, value: string) => void;
  _deleteCookie: (name: string) => void;

  constructor(
    dataServer: { baseUrl: string, headers: DictionaryStrStr },
    getCookie: (a: string) => string | undefined,
    setCookie: (name: string, value: string) => void,
    deleteCookie: (name: string) => void) {


    this._baseUrl = dataServer.baseUrl;
    this._headers = dataServer.headers;
    this._getCookie = getCookie;
    this._setCookie = setCookie;
    this._deleteCookie = deleteCookie;
  }

  _endpoints = {
    ingredients: '/ingredients',
    orders: '/orders',
    register: '/auth/register',
    login: '/auth/login',
    forgotPassword: '/password-reset',
    resetPassword: '/password-reset/reset',
    refreshToken: '/auth/token',
    userInfo: '/auth/user'
  }

  _onResponse(res: Response) {
    return res.ok
      ? res.json()
      : res.json().then((error) => {
        error.statusCode = res.status;
        return Promise.reject(error);
      })//Promise.reject(res`Ошибка: ${res.status}`)
  }

  refreshToken = (): Promise<TRefreshTokenResponse> => {
    return this.requestFetch({ endpoint: this._endpoints.refreshToken, data: { token: localStorage.getItem("refreshToken") }, method: 'POST' });
  }


  requesFetchfetchWithRefresh = async <T, R>({ endpoint, data, method = 'GET' }: TFetch<T>): Promise<R> => {
    try {
      return await this.requestFetch({ endpoint, data, method });
    } catch (err) {
      const { message } = err as unknown as TErrorResponse;
      if (message === "jwt expired" || message === "jwt malformed") {
        const refreshData = await this.refreshToken();
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        };
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        this._setCookie("token", refreshData.accessToken);
        return await this.requestFetch({ endpoint, data, method });
      } else {
        return Promise.reject(err);
      };
    };
  }

  requestFetch = async <T, R>({ endpoint, data, method = 'GET' }: TFetch<T>): Promise<R> => {
    // console.log(1, endpoint);
    const options: TOptions = {
      headers: method === 'GET' ? {} : this._headers,
      method
    }
    if (data) {
      options.method = method;
      options.body = JSON.stringify(data);
    };
    const accessToken = this._getCookie('token');
    if (accessToken) {
      options.headers.authorization = accessToken;
    };
    const request = await fetch(this._baseUrl + endpoint, options);
    return this._onResponse(request)
  }


  getUserAuth = () => {
    return this.requesFetchfetchWithRefresh<never, TUserAuthResponse>({ endpoint: this._endpoints.userInfo, method: 'GET' });
  };

  getOrderDetailsServer = (ingredients: TNewOrderRequest) => {
    return this.requesFetchfetchWithRefresh<TNewOrderRequest, TNewOrderResponse>({ endpoint: this._endpoints.orders, data: ingredients, method: 'POST' });
  };

  updateUser = (data: TRegisterRequest) => {
    return this.requesFetchfetchWithRefresh<DictionaryStrStr, TUpdateProfileResponse>({ endpoint: this._endpoints.userInfo, data, method: 'PATCH' });
  };

  // : ----------------------------------------------------------------

  resetPassword(data: TResetPasswordRequest) {
    return this.requestFetch({ endpoint: this._endpoints.resetPassword, data, method: 'POST' })
  }

  forgotPassword(data: TForgotPasswordRequest) {
    return this.requestFetch<DictionaryStrStr, TForgotPasswordResponse>({ endpoint: this._endpoints.forgotPassword, data, method: 'POST' })
  }

  loginUser(data: TLoginRequest) {
    // console.log('loginUser - DRY');
    return this.requestFetch<DictionaryStrStr, TLoginUserResponse>({ endpoint: this._endpoints.login, data, method: 'POST' })
  }

  registerUser(data: TRegisterRequest) {
    // console.log('registerUser - DRY');
    return this.requestFetch<DictionaryStrStr, TRegisterUserResponse>({ endpoint: this._endpoints.register, data, method: 'POST' })
  }


  getOneOrder(number: string | number | undefined) {
    // console.log('getOneOrder - DRY', number);
    return this.requestFetch<never, TGetOneOrderResponse>({ endpoint: `${this._endpoints.orders}/${number}`, method: 'GET' })
  }

  loadIngredients = () => {
    // console.log('loadIngredients - DRY');
    return this.requestFetch<never, TLoadIngredientsResponse>({ endpoint: this._endpoints.ingredients, method: 'GET' })
  }

  logoutUser = () => {
    // console.log('loadIngredients - DRY');
    return this.requestFetch<TLogoutRequest, TLogoutResponse>({
      endpoint: this._endpoints.ingredients,
      data: { token: localStorage.getItem("refreshToken") },
      method: 'POST'
    })
  }


  // checkUserAuth = async (token) => {
  //   console.log('checkUserAuth');
  //   try {
  //     return await this.getUserAuth(token)
  //   } catch (error) {
  //     console.log('error message', error.message);
  //     if (error.message === 'invalid token' || error.message === 'jwt expired') {
  //       const refreshData = await this.refreshToken({ token: localStorage.getItem("refreshToken") })

  //       if (refreshData.success) {
  //         localStorage.setItem("refreshToken", refreshData.refreshToken);
  //         let accessToken = refreshData.accessToken;
  //         this._deleteCookie('token')
  //         this._setCookie('token', accessToken);
  //         return await this.getUserAuth(accessToken)
  //       }
  //     } else {
  //       Promise.reject(error)
  //     }
  //   }
  // }


  // updateUserWithRefresh = async (token, body) => {
  //   try {
  //     return await this.updateUser(token, body)
  //   } catch (error) {
  //     console.log('error message', error.message);
  //     if (error.message === 'invalid token' || error.message === 'jwt expired') {
  //       const refreshData = await this.refreshToken({ token: localStorage.getItem("refreshToken") })
  //       // console.log(refreshData);
  //       if (refreshData.success) {
  //         // : при переходе к DRY здесь надо вернуть данные из Promise
  //         // : потом с ними работат
  //         localStorage.setItem("refreshToken", refreshData.refreshToken);
  //         let accessToken = refreshData.accessToken
  //         this._deleteCookie('token')
  //         this._setCookie('token', accessToken)
  //         return await this.updateUser(accessToken, body)
  //       }
  //     } else {
  //       Promise.reject(error)
  //     }
  //   }
  // }



  // getOrderDetailsServerWithRefresh = async (ingredients, token) => {
  //   console.log('getUserAuthWithRefresh');
  //   try {
  //     return await this.getOrderDetailsServer(ingredients, token)
  //   } catch (error) {
  //     console.log('error message', error.message);
  //     if (error.message === 'invalid token' || error.message === 'jwt expired') {
  //       const refreshData = await this.refreshToken({ token: localStorage.getItem("refreshToken") })
  //       if (refreshData.success) {
  //         localStorage.setItem("refreshToken", refreshData.refreshToken);
  //         let accessToken = refreshData.accessToken
  //         this._setCookie('token', accessToken)
  //         return await this.getOrderDetailsServer(ingredients, accessToken)
  //       }
  //     } else {
  //       Promise.reject(error)
  //     }
  //   }
  // }


  // getUserAuthWithRefresh = async (token: string) => {
  //   console.log('getUserAuthWithRefresh');
  //   try {
  //     return await this.getUserAuth(token)
  //   } catch (error) {
  //     console.log('error message', error.message);
  //     if (error.message === 'invalid token' || error.message === 'jwt expired') {
  //       const refreshData = await this.refreshToken({ token: localStorage.getItem("refreshToken") })
  //       if (refreshData.success) {
  //         localStorage.setItem("refreshToken", refreshData.refreshToken);
  //         let accessToken = refreshData.accessToken
  //         this._setCookie('token', accessToken)
  //         return await this.getUserAuth(accessToken)
  //       }
  //     } else {
  //       Promise.reject(error)
  //     }
  //   }
  // }


  // updateUser2(token: string, body: {}) {
  //   // console.log('up', token, body)
  //   return fetch(`${this._baseUrl}/auth/user`, {
  //     method: 'PATCH',
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token
  //     },
  //     body: JSON.stringify(body)
  //   })
  //     .then(this._onResponse)
  // }


  // getOrderDetailsServer(ingredients: string[], token: string) {
  //   return fetch(`${this._baseUrl}/orders`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: token
  //     },
  //     body: JSON.stringify(ingredients)
  //   })
  //     .then(this._onResponse)
  // }


  // getUserAuth2(token) {
  //   return fetch(`${this._baseUrl}/auth/user`, {
  //     method: 'GET',
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token
  //     },
  //   })
  //     .then(this._onResponse)
  // }


  // logoutUser2(body: {}) {
  //   return fetch(`${this._baseUrl}/auth/logout`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(body)
  //   })
  //     .then(this._onResponse)
  // }
  // refreshToken1(token: string) {
  //   // console.log('refresh', token)
  //   return fetch(`${this._baseUrl}/auth/token`, {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(token)
  //   })
  //     .then(this._onResponse)
  // }

  // resetPassword(body) {
  //   return fetch(`${this._baseUrl}/password-reset/reset`, {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body)
  //   })
  //     .then(this._onResponse)
  // }



  // forgotPassword(body) {
  //   return fetch(`${this._baseUrl}/password-reset`, {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body)
  //   })
  //     .then(this._onResponse)
  // }



  // loginUser(body) {
  //   return fetch(`${this._baseUrl}/auth/login`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(body)
  //   })
  //     .then(this._onResponse)
  // }


  // registerUser(body) {
  //   return fetch(`${this._baseUrl}/auth/register`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(body)
  //   })
  //     .then(this._onResponse)
  // }



  // getOrderDetailsServer(ingredients) {
  //   console.log('getOrderDetailsServer - DRY');
  //   return this.requestFetch({ endpoint: this._endpoints.orders, data: ingredients, method: 'POST' })
  // }


  // getOrderDetailsServer(ingredients, token) {
  //   return fetch(`${this._baseUrl}/orders`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: token
  //     },
  //     body: JSON.stringify(ingredients)
  //   })
  //     .then(this._onResponse)
  // }




  //?  baseUrl: 'https://norma.nomoreparties.space/api',

  // getOneOrder(number) {
  //   console.log('getOneOrder - DRY');
  //   return fetch(` https://norma.nomoreparties.space/api/orders/${number}`, {
  //     headers: this._headers,
  //     method: 'GET'
  //   })
  //     .then(this._onResponse)
  // }

  // loadIngredients() {
  //   return fetch(`${this._baseUrl}/ingredients`, {
  //     headers: this._headers
  //   })
  //     .then(this._onResponse)
  // }
}

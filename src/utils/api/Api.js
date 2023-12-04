
export class Api {
  constructor(dataServer, getCookie, setCookie, deleteCookie) {
    this._baseUrl = dataServer.baseUrl;
    this._headers = dataServer.headers;
    this._getCookie = getCookie;
    this._setCookie = setCookie;
    this._deleteCookie = deleteCookie;
  }

  _onResponse(res) {
    return res.ok
      ? res.json()
      : res.json().then((error) => {
        error.statusCode = res.status;
        return Promise.reject(error);
      })//Promise.reject(res`Ошибка: ${res.status}`)
  }










  getUserAuth(token) {
    return fetch(`${this._baseUrl}/auth/user`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
    })
      .then(this._onResponse)
  }


  logoutUser(body) {
    return fetch(`${this._baseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(this._onResponse)
  }

  updateUser(token, body) {
    // console.log('up', token, body)
    return fetch(`${this._baseUrl}/auth/user`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(body)
    })
      .then(this._onResponse)
  }






  getUserAuthWithRefresh = async (token) => {
    console.log('getUserAuthWithRefresh');
    try {
      return await this.getUserAuth(token)
    } catch (error) {
      console.log('error message', error.message);
      if (error.message === 'invalid token' || error.message === 'jwt expired') {
        const refreshData = await this.refreshToken({ token: localStorage.getItem("refreshToken") })
        if (refreshData.success) {
          localStorage.setItem("refreshToken", refreshData.refreshToken);
          let accessToken = refreshData.accessToken
          this._setCookie('token', accessToken)
          return await this.getUserAuth(accessToken)
        }
      } else {
        Promise.reject(error)
      }
    }
  }

  getOrderDetailsServerWithRefresh = async (ingredients, token) => {
    console.log('getUserAuthWithRefresh');
    try {
      return await this.getOrderDetailsServer(ingredients, token)
    } catch (error) {
      console.log('error message', error.message);
      if (error.message === 'invalid token' || error.message === 'jwt expired') {
        const refreshData = await this.refreshToken({ token: localStorage.getItem("refreshToken") })
        if (refreshData.success) {
          localStorage.setItem("refreshToken", refreshData.refreshToken);
          let accessToken = refreshData.accessToken
          this._setCookie('token', accessToken)
          return await this.getOrderDetailsServer(ingredients, accessToken)
        }
      } else {
        Promise.reject(error)
      }
    }
  }

  checkUserAuth = async (token) => {
    console.log('checkUserAuth');
    try {
      return await this.getUserAuth(token)
    } catch (error) {
      console.log('error message', error.message);
      if (error.message === 'invalid token' || error.message === 'jwt expired') {
        const refreshData = await this.refreshToken({ token: localStorage.getItem("refreshToken") })

        if (refreshData.success) {
          localStorage.setItem("refreshToken", refreshData.refreshToken);
          let accessToken = refreshData.accessToken;
          this._deleteCookie('token')
          this._setCookie('token', accessToken);
          return await this.getUserAuth(accessToken)
        }
      } else {
        Promise.reject(error)
      }
    }
  }

  updateUserWithRefresh = async (token, body) => {
    try {
      return await this.updateUser(token, body)
    } catch (error) {
      console.log('error message', error.message);
      if (error.message === 'invalid token' || error.message === 'jwt expired') {
        const refreshData = await this.refreshToken({ token: localStorage.getItem("refreshToken") })
        // console.log(refreshData);
        if (refreshData.success) {
          // : при переходе к DRY здесь надо вернуть данные из Promise
          // : потом с ними работат
          localStorage.setItem("refreshToken", refreshData.refreshToken);
          let accessToken = refreshData.accessToken
          this._deleteCookie('token')
          this._setCookie('token', accessToken)
          return await this.updateUser(accessToken, body)
        }
      } else {
        Promise.reject(error)
      }
    }
  }



  //: DRY для запросов

  requestFetchWithRefresh = () => {
    return true
  }
  function2 = (data) => {
    return this.requestFetchWithRefresh()
  }


  requestFetch = async ({ endpoint, data, method }) => {
    // console.log(1, endpoint);
    const options = {
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

    // console.log('requestFetch', options);
    // console.log(this._baseUrl + endpoint);
    const request = await fetch(this._baseUrl + endpoint, options);
    return this._onResponse(request)
  }


  _endpoints = {
    ingredients: '/ingredients',
    orders: '/orders',
    register: '/auth/register',
    login: '/auth/login',
    forgotPassword: '/password-reset',
    resetPassword: '/password-reset/reset',
    refreshToken: '/auth/token'
  }

  // : без refresh - loadIngredients-!, getOneOrder-!, registerUser-!, loginUser-!, forgotPassword-!,
  // : resetPassword-!, refreshToken - !

  // refreshToken() {
  //   console.log('refresh - DRY', token)
  //   return this.requestFetch({ endpoint: this._endpoints.refreshToken, data: localStorage.getItem("refreshToken"), method: 'POST' })
  // }


  resetPassword(data) {
    return this.requestFetch({ endpoint: this._endpoints.resetPassword, data, method: 'POST' })
  }

  forgotPassword(data) {
    return this.requestFetch({ endpoint: this._endpoints.forgotPassword, data, method: 'POST' })
  }

  loginUser(data) {
    // console.log('loginUser - DRY');
    return this.requestFetch({ endpoint: this._endpoints.login, data, method: 'POST' })
  }

  registerUser(data) {
    // console.log('registerUser - DRY');
    return this.requestFetch({ endpoint: this._endpoints.register, data, method: 'POST' })
  }

  getOneOrder(number) {
    // console.log('getOneOrder - DRY', number);
    return this.requestFetch({ endpoint: `${this._endpoints.orders}/${number}`, method: 'GET' })
  }

  loadIngredients = () => {
    // console.log('loadIngredients - DRY');
    return this.requestFetch({ endpoint: this._endpoints.ingredients, method: 'GET' })
  }

  refreshToken(token) {
    // console.log('refresh', token)
    return fetch(`${this._baseUrl}/auth/token`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token)
    })
      .then(this._onResponse)
  }

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

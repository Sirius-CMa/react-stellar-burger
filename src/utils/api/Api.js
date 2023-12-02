
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




  loadIngredients() {
    return fetch(`${this._baseUrl}/ingredients`, {
      headers: this._headers
    })
      .then(this._onResponse)
  }

  getOneOrder(number) {
    return fetch(` https://norma.nomoreparties.space/api/orders/${number}`, {
      headers: this._headers,
      method: 'GET'
    })
      .then(this._onResponse)
  }

  getOrderDetailsServer(ingredients, token) {
    return fetch(`${this._baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(ingredients)
    })
      .then(this._onResponse)
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

  registerUser(body) {
    return fetch(`${this._baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(this._onResponse)
  }

  loginUser(body) {
    return fetch(`${this._baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
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

  forgotPassword(body) {
    return fetch(`${this._baseUrl}/password-reset`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
      .then(this._onResponse)
  }

  resetPassword(body) {
    return fetch(`${this._baseUrl}/password-reset/reset`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
      .then(this._onResponse)
  }

  refreshToken(token) {
    console.log('refresh', token)
    return fetch(`${this._baseUrl}/auth/token`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token)
    })
      .then(this._onResponse)
  }

  updateUserWithRefresh = async (token, body) => {
    try {
      return await this.updateUser(token, body)
    } catch (error) {
      console.log('error message', error.message);
      if (error.message === 'invalid token' || error.message === 'jwt expired') {
        const refreshData = await this.refreshToken({ token: localStorage.getItem("refreshToken") })
        console.log(refreshData);
        if (refreshData.success) {
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

}

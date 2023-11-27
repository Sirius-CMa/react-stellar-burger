export class Api {
  constructor(dataServer) {
    this._baseUrl = dataServer.baseUrl;
    this._headers = dataServer.headers;
  }

  _onResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status}`)
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
    return fetch(`${this._baseUrl}/token`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token)
    })
      .then(this._onResponse)
  }

}

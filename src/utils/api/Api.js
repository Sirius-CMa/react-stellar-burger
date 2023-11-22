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

  getOrderDetailsServer(ingredients) {
    // console.log('Api - ', ingredients)
    return fetch(`${this._baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ingredients)
    })
      .then(this._onResponse)
  }
  getUserAuth(token) {
    return fetch(`${this._baseUrl}/auth/user`, {
      method: 'GET',
      // mode: 'cors',
      // cache: 'no-cache',
      // credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      // redirect: 'follow',
      // referrerPolicy: 'no-referrer'

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

}

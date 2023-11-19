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
    console.log('Api - ', ingredients)
    return fetch(`${this._baseUrl}/orders`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(ingredients)
    })
      .then(this._onResponse)
  }


}

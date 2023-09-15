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
    return fetch(`${this._baseUrl}`, {
      headers: this._headers
    })
      .then(this._onResponse)
  }
}

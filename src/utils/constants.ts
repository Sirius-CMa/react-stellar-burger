import lo from '../image/defBun.svg'

export const dataServer = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json'
  }
};

export const urlOrdersFeed = "wss://norma.nomoreparties.space/orders/all";
export const urlOrdersFeedProfile = "wss://norma.nomoreparties.space/orders"; // ?token=${accessToken}



export const DEFAULT_BUN = {
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  image: lo,
  image_large: "",
  image_mobile: "",
  name: "Сначала выберите булочку, перетянув сюда",
  price: 0,
  proteins: 0,
  type: "bun",
  __v: 0,
  _id: '0',

}


export const orderStatus = {
  done: ["Выполнен", "#00CCCC"],
  pending: ["В обработке", "#add8e6"],
  created: ["Создан", "#ffffff"],
  canceled: ["Отменен", "#ffff00"],
};

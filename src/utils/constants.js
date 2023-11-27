import lo from '../image/defBun.svg'

export const dataServer = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json'
  }
};

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
  done: ["Выполнен", "00CCCC"],
  pending: ["В обработке", "ligntblue"],
  created: ["Создан", "white"],
  canceled: ["Отменен", "yellow"],
};

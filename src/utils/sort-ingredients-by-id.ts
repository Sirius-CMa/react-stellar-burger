import { IIngredientTypes, TOrder, TSortDataById } from "../typesData"

export const sortIngredientsById = (data: Array<IIngredientTypes>, sortDataById: TSortDataById = {}) => {
  data.map((item) => sortDataById = { ...sortDataById, [item._id]: item })
  return sortDataById
}

export const sortOrdersByNumber = (data: Array<TOrder>, sortedOrdersByNumber = {}) => {
  data.map((item) => sortedOrdersByNumber = { ...sortedOrdersByNumber, [item.number]: item })
  return sortedOrdersByNumber
}

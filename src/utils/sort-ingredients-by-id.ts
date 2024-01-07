import { IIngredientTypes, TDataWS, TSortDataById } from "../typesData"

export const sortIngredientsById = (data: Array<IIngredientTypes>, sortDataById: TSortDataById = {}) => {
  data.map((item) => sortDataById = { ...sortDataById, [item._id]: item })
  return sortDataById
}

export const sortOrdersByNumber = (data: TDataWS, sortedOrdersByNumber = {}) => {
  data.orders.map((item: any) => sortedOrdersByNumber = { ...sortedOrdersByNumber, [item.number]: item })
  return sortedOrdersByNumber
}

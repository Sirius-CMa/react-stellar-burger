import { number } from "prop-types"
import { IIngredientTypes, TDataWS, TOrder, TSortDataById } from "../typesData"

export const sortIngredientsById = (data: Array<IIngredientTypes>, sortDataById: TSortDataById = {}) => {
  data.map((item) => sortDataById = { ...sortDataById, [item._id]: item })
  return sortDataById
}

export const sortOrdersByNumber = (data: TDataWS, sortedOrdersByNumber = {}) => {
  console.log(4);
  data.orders.map((item: any) => sortedOrdersByNumber = { ...sortedOrdersByNumber, [item.number]: item })
  console.log(553, sortedOrdersByNumber);
  return sortedOrdersByNumber
}

export const sortIngredientsById = (data, sortDataById = {}) => {
  data.map((item) => sortDataById = { ...sortDataById, [item._id]: item })
  return sortDataById
}

export const sortOrdersByNumber = (data, sortedOrdersByNumber = {}) => {
  data.map((item) => sortedOrdersByNumber = { ...sortedOrdersByNumber, [item.number]: item })
  return sortedOrdersByNumber
}

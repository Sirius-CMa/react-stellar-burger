export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT'




// export const aa = (ingredient) => {
//   return {
//     type: ADD_DRUGGED_INGREDIENT,
//     payload: ingredient
//   }
// }
export function moveIngredient(dragIndex, hoverIndex) {
  return ({ type: MOVE_INGREDIENT, dragIndex, hoverIndex })
}

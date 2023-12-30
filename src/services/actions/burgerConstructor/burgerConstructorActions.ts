import { IIngredientTypes } from "../../../typesData";

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT'
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT'
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT'
export const CLEAR_INGREDIENT: 'CLEAR_INGREDIENT' = 'CLEAR_INGREDIENT'

export interface IADD_INGREDIENT {
  readonly type: typeof ADD_INGREDIENT;
  payload: IIngredientTypes
}

export interface IDELETE_INGREDIENT {
  readonly type: typeof DELETE_INGREDIENT;
  payload: number;
}

export interface IMOVE_INGREDIENT {
  readonly type: typeof MOVE_INGREDIENT;
  dragIndex: number;
  hoverIndex: number;
}

export interface ICLEAR_INGREDIENT {
  readonly type: typeof CLEAR_INGREDIENT
}

// export interface IADD_INGREDIENT {
//   readonly type: typeof
// }

export type TBurgerConstructorActions = IADD_INGREDIENT | IDELETE_INGREDIENT | IMOVE_INGREDIENT | ICLEAR_INGREDIENT;

export function moveIngredient(dragIndex: number, hoverIndex: number) {
  return ({ type: MOVE_INGREDIENT, dragIndex, hoverIndex })
}

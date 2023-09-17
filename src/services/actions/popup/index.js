// import { usePopup } from "Hooks/usePopup";


export const SET_IS_POPUP_INGREDIENT_OPEN = 'SET_IS_POPUP_INGREDIENT_OPEN';
export const SET_IS_POPUP_ORDER_ID_OPEN = 'SET_IS_POPUP_ORDER_ID_OPEN';
export const SET_IS_POPUP_CLOSE = 'SET_IS_POPUP_CLOSE';


export const SET_IS_POPUP_OPEN = 'SET_IS_POPUP_OPEN';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';



// export function managePopup() {
//   return function (dispatch) {
//     dispatch({
//       type: SET_IS_POPUP_INGREDIENT_OPEN
//     })
//   }
// }


export const managePopup = ({ type, ingredient, id }) => {
  switch (type) {
    case 'ingredient': {
      return {
        type: SET_IS_POPUP_INGREDIENT_OPEN,
        payload: ingredient
      }
    }
    case 'orderId': {
      return {
        type: SET_IS_POPUP_ORDER_ID_OPEN,
        payload: id
      }
    }
    case 'close': {
      return {
        type: SET_IS_POPUP_CLOSE,
      }
    }
    default: return null
  }
}


// type: SET_IS_POPUP_INGREDIENT_OPEN,
// payload: ingredient

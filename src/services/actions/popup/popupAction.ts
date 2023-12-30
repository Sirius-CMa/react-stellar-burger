export const SET_IS_POPUP_CLOSE: 'SET_IS_POPUP_CLOSE' = 'SET_IS_POPUP_CLOSE';
export const SET_IS_POPUP_OPEN: 'SET_IS_POPUP_OPEN' = 'SET_IS_POPUP_OPEN';

export interface ISET_IS_POPUP_CLOSE {
  readonly type: typeof SET_IS_POPUP_CLOSE;
}

export interface ISET_IS_POPUP_OPEN {
  readonly type: typeof SET_IS_POPUP_OPEN;
}

export type TPopupActions = ISET_IS_POPUP_CLOSE | ISET_IS_POPUP_OPEN;

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { store } from '../store';
import { RefObject } from "react";

export type TypeDEFAULT_BUN = {
  image: SVGElement;
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image_mobile: string;
  image_large: string
  __v: number;
}

export type TParams = {
  id?: string;
};

export type TProtectedRouteTypes = {
  onlyNotAuth?: boolean;
  element: JSX.Element;
};

export interface IIngredientTypes {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TOrder = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;

}

export type TBurgerElement = {
  ingredient: IIngredientTypes;
  isTop?: boolean;
  isBottom?: boolean;
  isLocked?: boolean;
  index: number
}

type TLOcation = {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: any;
}

export type TBlockIngredient = {
  ingredients: Array<IIngredientTypes>;
  title: string;
  location?: TLOcation;
}

export type TLoadingScreenProps = {
  isLoading?: boolean;
  isError?: boolean;
}

export type TOrderDetailsProps = {
  number: number;
}



export const orderStatus: Record<string, [string, string]> = {
  done: ["Выполнен", "#00CCCC"],
  pending: ["В обработке", "#add8e6"],
  created: ["Создан", "#ffffff"],
  canceled: ["Отменен", "#ffff00"],
};

export type TTabContainerProps = {
  current?: string;
  bunRef: RefObject<HTMLLIElement>;
  sauceRef: RefObject<HTMLLIElement>;
  mainRef: RefObject<HTMLLIElement>;
  handleClick: (a: string, b: RefObject<HTMLLIElement>) => void;
}

export type TOrderElementProps = {
  feed?: boolean;
  card: TOrder
}

export type TIngredient = {
  uuid?: string
} & IIngredientTypes

export type TIngredientsElementProps = {
  ingredient: IIngredientTypes
};

export type TPopupProps = {
  handleClosePopup: () => void;
  children: JSX.Element;
};

type TOptionalProps = {
  notPopup?: boolean
};

export type TPopupOverlay = {
  closePopup: () => void;
};


export type TBurgerConstructorInitialState = {
  selectedBun: IIngredientTypes,
  listIngredients: Array<IIngredientTypes>
}

export type TOrderInitialState = {
  number: number | null;
  name: string | null;
  requestOrder: boolean;
  errorOrder: string;
}

// export defArr =

export type TSortDataById = { [key: string]: IIngredientTypes };

export type TBurgerIngredientsInitialState = {
  data: Array<IIngredientTypes>,
  sortDataById: TSortDataById | null,
  isLoading: boolean;
  isError: boolean;
  currentProduct: {}
}

export type TOneOrdeeInitialState = {
  number: number | null;
  order: number | null;
  requestOneOrder: boolean;
  errorOneOrder: boolean;
}

export type TPopupInitialState = {
  isPopupOpen: boolean
}

export type TSortedOrdersByNumber = Record<number, Array<Object>>;

export type TIngredientPageProps = TOptionalProps;
export type IngredientDetailsProps = TOptionalProps;
export type TOrderDataFeedProps = TOptionalProps;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

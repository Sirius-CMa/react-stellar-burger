import { IIngredientTypes, TOrder } from "./typesData";

export type DictionaryStrStr = Record<string, string>;
export type DictionaryStrBool = Record<string, boolean>;

export type TFetch<T> = {
  endpoint: string;
  data?: T;
  method?: string;
}

export type TOptions = {
  headers: DictionaryStrStr;
  method: string;
  body?: string;
};

export type TErrorResponse = {
  message: string;
  statusCode: number;
  [key: string]: unknown;
};



// :  Omit - отсекает keys
// :  Pick - выбирает keys

type TBaseTypeRequest = {
  name: string;
  token: string | null;
  password: string
  email: string
  ingredients: string[];
}

export type TForgotPasswordRequest = Pick<TBaseTypeRequest, 'email'>;
export type TResetPasswordRequest = Pick<TBaseTypeRequest, 'token' | 'password'>;
export type TRegisterRequest = Omit<TBaseTypeRequest, 'token' | 'ingredients'>;
export type TLoginRequest = Omit<TBaseTypeRequest, 'name' | 'token' | 'ingredients'>;
export type TNewOrderRequest = Pick<TBaseTypeRequest, 'ingredients'>
export type TLogoutRequest = Pick<TBaseTypeRequest, 'token'>


// :  Omit - отсекает keys
// :  Pick - выбирает keys

type TUserData = {
  email: string;
  name: string;
}

type TBaseTypeResponse = {
  email: string;
  name: string;
  token: string | null;
  message: string;
  success: boolean;
  accessToken: string;
  refreshToken: string;
  orders: TOrder[];
  data: IIngredientTypes[];
  user: TUserData;
  order: {
    number: number
  };
}

export type TLoginResponse = Pick<TBaseTypeResponse, 'email' | 'name'>
export type TRefreshToken = Pick<TBaseTypeResponse, 'token'>
export type TResetPasswordResponse = Pick<TBaseTypeResponse, 'success' | 'message'>
export type TRefreshTokenResponse = Pick<TBaseTypeResponse, 'success' | 'accessToken' | 'refreshToken'>

// export type TOrderResponse = Pick<TBaseTypeResponse, 'success' | 'orders'>
export type TGetOneOrderResponse = Pick<TBaseTypeResponse, 'success' | 'orders'>

export type TLogoutResponse = Pick<TBaseTypeResponse, 'success' | 'message'>
export type TLoadIngredientsResponse = Pick<TBaseTypeResponse, 'success' | 'data'>
export type TRegisterUserResponse = Pick<TBaseTypeResponse, 'success' | 'user' | 'accessToken' | 'refreshToken'>;
export type TUserAuthResponse = Pick<TBaseTypeResponse, 'success' | 'user'>
export type TNewOrderResponse = Pick<TBaseTypeResponse, 'success' | 'order' | 'name'>

export type TLoginUserResponse = TRegisterUserResponse;
export type TForgotPasswordResponse = TLogoutResponse;
export type TUpdateProfileResponse = TUserAuthResponse;

// export type RRegisterUserResponse = {
//   success: boolean;
//   user: TUserData;
//   accessToken: string;
//   refreshToken: string;
// };

// export type TLoginResponse = {
//   email: string;
//   name: string;
// };

// export type TRefreshToken = {
//   token: string | null;
// }

// export type TResetPasswordResponse = {
//   message: string;
//   success: boolean;
// };

// export type TRefreshTokenResponse = {
//   success: boolean;
//   accessToken: string;
//   refreshToken: string;
// };

// export type TUserAuth = {
//   success: boolean;
//   user: TUserData;
// }

// export type TOrderResponse = {
//   success: boolean;
//   orders: TOrder[];
// };

// export type TNewOrderResponse = {
//   name: string;
//   order: {
//     number: number
//   };
//   success: boolean;
// };

// export type TLogoutResponse = {
//   success: boolean;
//   message: string;
// };

// export type TRegisterUserResponse = {
//   success: boolean;
//   user: TUserData;
//   accessToken: string;
//   refreshToken: string;
// };

// export type TLoadIngredientsResponse = {
//   success: boolean;
//   data: IIngredientTypes[];
// };

// export type TGetOneOrderResponse = {
//   success: boolean;
//   orders: TOrder[];
// };

// export type TConstructor = {
//   dataServer: { baseUrl: string, headers: DictionaryStrStr };
//   getCookie: (a: string) => string | undefined;
//   setCookie: (name: string, value: string) => void;
//   deleteCookie: (name: string) => void;
// }

// export type TConstructor = {
//   dataServer: { baseUrl: string, headers: DictionaryStrStr };
//   getCookie?: () => string;
//   setCookie?: () => { [key: string]: string };
//   deleteCookie?: () => string;
// }

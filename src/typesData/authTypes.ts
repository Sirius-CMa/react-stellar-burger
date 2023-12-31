import { IIngredientTypes, TOrder } from "./typesData";

export type DictionaryStrStr = Record<string, string>;
export type DictionaryStrBool = Record<string, boolean>;

export type TLoginRequest = {
  email: string;
  password: string;
}

export type TLoginResponse = {
  email: string;
  name: string;
}

export type TRegisterRequest = {
  name: string;
  password: string;
  email: string;
}

export type TRefreshToken = {
  token: string | null;
}

export type TResetPasswordRequest = {
  token: string;
  password: string
};

export type TResetPasswordResponse = {
  message: string;
  success: boolean;
};

export type TForgotPasswordRequest = {
  email: string
};



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

export type TRefreshTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TErrorResponse = {
  message: string;
  statusCode: number;
  [key: string]: unknown;
};
export type TUserAuth = {
  success: boolean;
  user: TUserData;
}
export type TUserData = {
  email: string;
  name: string;
}
export type TOrderResponse = {
  success: boolean;
  orders: TOrder[];
};

export type TNewOrderRequest = {
  ingredients: string[];
};

export type TNewOrderResponse = {
  name: string;
  order: {
    number: number
  };
  success: boolean;
};



export type TUpdateProfileResponse = TUserAuth;

export type RRegisterUserResponse = {
  success: boolean;
  user: TUserData;
  accessToken: string;
  refreshToken: string;
};

export type TLoginUserResponse = RRegisterUserResponse;

export type TLogoutRequest = {
  token: string | null;
};

export type TLogoutResponse = {
  success: boolean;
  message: string;
};

export type TForgotPasswordResponse = TLogoutResponse

export type TRegisterUserResponse = {
  success: boolean;
  user: TUserData;
  accessToken: string;
  refreshToken: string;
};

export type TLoadIngredientsResponse = {
  success: boolean;
  data: IIngredientTypes[];
};

export type TGetOneOrderResponse = {
  success: boolean;
  orders: TOrder[];
};











export type TConstructor = {
  dataServer: { baseUrl: string, headers: DictionaryStrStr };
  getCookie: (a: string) => string | undefined;
  setCookie: (name: string, value: string) => void;
  deleteCookie: (name: string) => void;
}

// export type TConstructor = {
//   dataServer: { baseUrl: string, headers: DictionaryStrStr };
//   getCookie?: () => string;
//   setCookie?: () => { [key: string]: string };
//   deleteCookie?: () => string;
// }

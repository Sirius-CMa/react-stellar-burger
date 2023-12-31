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
  token: string;
}

export type TResetPasswordRequest = {
  token: string;
  password: string
}

export type TResetPasswordResponse = {
  message: string;
  success: boolean;
}


export type TForgotPasswordRequest = {
  email: string
}

export type TForgotPasswordResponse = {
  message: string;
  success: boolean;
}

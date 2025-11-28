import { User } from "./user";

export type SignIn = {
  email: string;
  password: string;
};

export type SignUp = SignIn & {
  nickname: string;
  passwordConfirmation: string;
};

export type RefreshToken = string;

export type Token = string | null;

export type OauthProvider = {
  state: string;
  redirectUri: string;
  token: string;
};
export type AuthSuccessPayload = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

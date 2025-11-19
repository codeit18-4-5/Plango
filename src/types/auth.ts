import { User } from "./user";

export type SignIn = {
  email: string;
  password: string;
};

export type SignUp = SignIn & {
  nickname: string;
  passwordConfirmation: string;
};

export type SNSAuth = {
  state: string;
  redirectUri: string;
  token: string;
};

export type OAuth = {
  appSecret?: string;
  appKey?: string;
  provider: "KAKAO";
};

export type RefreshToken = string;

export type AuthResponse = RefreshToken & {
  accessToken: string;
  user: User;
};

export type OAuthResponse = OAuth & {
  id: number;
  createdAt: string;
  updatedAt: string;
  teamId: string;
};
export type Token = string | null;

export type OauthProvider = {
  state: string;
  redirectUri: string;
  token: string;
};

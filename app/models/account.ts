export interface LoginInput {
  grant_type: string;
  token: string;
  client_id: string;
  client_secret?: string;
}

export interface RefreshTokenInput extends Omit<LoginInput, 'token'> {
  refresh_token: string;
}

export interface PasswordForApp {
  password: string;
}

export interface Auth {
  access_token: string;
  expires_in: number;
  expires_at: number;
  token_type: string;
  refresh_token: string;
  scope: string;
}

export interface IProfile {
  userName: string;
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  isExternal: boolean;
  hasPassword: boolean;
  concurrencyStamp: string;
  language: string;
  gender: string;
  birthday: string;
  picture: string;
}

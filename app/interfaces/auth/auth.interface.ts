export interface ILoginInput {
  username: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  refreshTokenExpiresAt: number;
  me: IProfile;
}

export interface IGenAccessTokenInput {
  refreshToken: string;
}

export interface IProfile {
  _id: string;
  username: string;
  roles: Role[];
}

export enum Role {
  CUSTOMER = 'CUSTOMER',
  STAFF = 'STAFF',
  ADMIN = 'ADMIN',
}

export interface IAccount {
  _id: string;
  username: string;
  userId: string;
}

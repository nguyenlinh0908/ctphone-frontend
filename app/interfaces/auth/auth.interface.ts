export interface ILoginInput {
  username: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

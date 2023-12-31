import { Gender, ICustomer } from '@interfaces/customer/customer.interface';
import { IStaff } from '@interfaces/staff/staff.interface';
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
  userId?: ICustomer | IStaff
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

export interface IRegisterCustomerAccountInput {
  fullName:string;
  gender: Gender;
  dateOfBirth:string;
  address:string;
  phone:string
  username: string;
  password: string;
}

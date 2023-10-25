export interface ICustomer {
  _id: string;
  fullName: string;
  gender: Gender;
  address: string;
  dateOfBirth: string;
  phone: string;
  email?:string
}

export interface ICreateCustomerInput {
  fullName: string;
  gender: Gender;
  address: string;
  dateOfBirth: string;
  phone: string;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

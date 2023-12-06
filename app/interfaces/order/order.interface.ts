import { IAccount } from '@interfaces/auth/auth.interface';
import { IDeliveryAddress } from '@interfaces/delivery_address/delivery_address.interface';

export enum OrderStatus {
  CART = 'CART',
  PENDING = 'PENDING',
  PREPARES_PACKAGE = 'PREPARES_PACKAGE',
  IN_TRANSPORT = 'IN_TRANSPORT',
  SUCCESS = 'SUCCESS',
  CANCEL = 'CANCEL',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export interface IOrder {
  _id: string;

  code: string;

  status: OrderStatus;

  paymentStatus: PaymentStatus;

  totalQuantity: number;

  totalAmountBeforeDiscount: number;

  totalAmountAfterDiscount: number;

  createdAt?: Date;

  deliveryAddress?:IDeliveryAddress
}

export interface IOrderInfo {
  _id: string;

  code: string;

  status: OrderStatus;

  totalQuantity: number;

  totalAmountBeforeDiscount: number;

  totalAmountAfterDiscount: number;

  createdAt?: Date;

  ownerId: IAccount;

  merchandiserId: IAccount;

  deliveryAddress:IDeliveryAddress
}

export interface IOrderFilter {
  status?: OrderStatus | string;
  code?: string;
}

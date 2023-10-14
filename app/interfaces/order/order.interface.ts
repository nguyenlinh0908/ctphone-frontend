export enum OrderStatus {
  CART = 'CART',
  PENDING = 'PENDING',
  PREPARES_PACKAGE = 'PREPARES_PACKAGE',
  IN_TRANSPORT = 'IN_TRANSPORT',
  SUCCESS = 'SUCCESS',
  CANCEL = 'CANCEL',
}

export interface IOrder {
  _id: string;

  code: string;

  status: OrderStatus;

  totalQuantity: number;

  totalAmountBeforeDiscount: number;

  totalAmountAfterDiscount: number;

  createdAt?: Date;
}

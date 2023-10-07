export enum OrderStatus {
  CART = 'CART',
  PEDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}

export interface IOrder {
  _id: string;

  status: string;

  totalQuantity: number;

  totalAmountBeforeDiscount: number;

  totalAmountAfterDiscount: number;
}

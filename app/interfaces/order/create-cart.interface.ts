import { IOrderItem } from './order-item.interface';

export enum CartAction {
  ADD = 'ADD',
  MINUS = 'MINUS',
}

export interface IUpdateCart {
  productId: string;
  action: CartAction;
}

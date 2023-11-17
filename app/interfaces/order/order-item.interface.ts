import { IProduct } from '@interfaces/product/product.interface';
import { IOrder } from './order.interface';

export interface IOrderItem {
  _id: string;

  orderId: IOrder;

  productId: IProduct;

  amount: number;

  quantity: number;

  
}

import { IProduct } from '@interfaces/product/product.interface';
import { IOrder } from './order.interface';
import { IMedia } from '@interfaces/upload/media.interface';

export interface IOrderItem {
  _id: string;

  orderId: IOrder;

  productId: IProduct;

  amount: number;

  quantity: number;

  media?: IMedia[];
}

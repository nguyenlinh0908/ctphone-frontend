import { IProduct } from '@interfaces/product/product.interface';

export interface IOrderItem {
  _id: string;

  productId: IProduct;

  amount: number;

  quantity: number;
}

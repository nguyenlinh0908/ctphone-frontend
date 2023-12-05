import { IProduct } from '@interfaces/product/product.interface';

export interface IWarehouseReceiptInput {
  delivererName: string;
  deliveryTime: string;
  products: IWarehouseReceiptProductInput[];
}

export interface IWarehouseReceiptProductInput {
  _id?: string;
  productId: string;
  name: string;
  amount: number;
  quantity: number;
}

export interface IWarehouseReceipt {
  _id: string;
  delivererName: string;
  deliveryTime: string;
  totalQuantity: number;
  totalAmount: number;
  accountId: string;
  status: WarehouseReceiptStatus;
  details?: IWarehouseReceiptProductDetail[];
}

export interface IWarehouseReceiptProductDetail {
  _id: string;
  productId: IProduct;
  quantity: number;
  amount: number;
  product?: IProduct;
}

export enum WarehouseReceiptStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  CANCEL = 'CANCEL',
}

export interface IUpdateWarehouseReceiptProductInput {
  warehouseReceiptId?: string;
  status?: WarehouseReceiptStatus;
  delivererName?: string;
  deliveryTime?: string;
  products?: IWarehouseReceiptProductInput[];
}

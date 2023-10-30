import { IProduct } from '@interfaces/product/product.interface';

export interface IWarehouseReceiptInput {
  delivererName: string;
  deliveryDate: string;
  products: IWarehouseReceiptProductInput[];
}

export interface IWarehouseReceiptProductInput {
  productId: string;
  name: string;
  amount: number;
  quantity: number;
}

export interface IWarehouseReceipt {
  _id: string;
  delivererName: string;
  deliveryDate: string;
  totalQuantity: number;
  totalAmount: number;
  accountId: string;
  status: WarehouseReceiptStatus;
}

export interface IWarehouseReceiptProductDetail {
  productId: IProduct;
  quantity: number;
  amount: number;
}

export enum WarehouseReceiptStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  CANCEL = 'CANCEL',
}

export interface IUpdateWarehouseReceiptProductInput {
  warehouseReceiptId?: string;
  status?: WarehouseReceiptStatus;
}

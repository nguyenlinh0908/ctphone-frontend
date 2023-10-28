import { ICategory } from '@interfaces/category/category.interface';

export interface IProduct {
  _id: string;

  avatar: string;

  name: string;

  price: string;

  enable: boolean;

  sku?: string;

  rom: number;

  romUnit: string;

  ram: number;

  ramUnit: string;

  colorCode?: string;

  colorName?: string;

  categoryId: ICategory;
}

export interface IProductFilter {
  name?: string;

  categoryId?: string;

  sku?: string;
}

export interface IUpdateProductStatusInput {
  id: string;

  status: boolean;
}

export interface ICreateProductInput{
  name: string;

  price: string;

  sku: string;

  rom: number;

  romUnit: string;

  ram: number;

  ramUnit: string;

  colorCode: string;

  colorName: string;

  categoryId: ICategory;
}
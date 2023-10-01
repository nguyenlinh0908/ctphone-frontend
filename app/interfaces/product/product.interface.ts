export interface IProduct {
  _id: string;

  avatar: string;

  name: string;

  price: string;

  status?: string;

  sku?: string;

  rom: number;

  ram: number;

  colorCode?: string;

  colorName?: string;
}

export interface IProductFilter {
  name?: string;

  categoryId?: string;

  sku?: string;
}

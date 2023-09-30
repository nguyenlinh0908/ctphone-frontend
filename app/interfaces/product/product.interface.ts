export interface IProduct {
  _id: string;

  avatar: string;

  name: string;

  price: string;

  status?: string;
}

export interface IProductFilter {
  name?: string;
  
  categoryId?: string;
}

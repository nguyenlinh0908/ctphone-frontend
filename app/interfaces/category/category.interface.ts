export interface ICategory {
  _id: string;

  name: string;

  left: number;

  right: number;

  dept: number;
}

export interface IFilterCategory {
  id?: string;

  dept?: number;
}

export interface ICreateCategoryInput {
  name: string;
  parentId: string;
}

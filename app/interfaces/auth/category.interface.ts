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

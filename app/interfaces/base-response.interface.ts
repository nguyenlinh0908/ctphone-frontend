export interface IResAPI<T> {
  message?: string;
  statusCode: string;
  data: T;
}

export interface IQuantity {
  quantity: number;
}

export interface IRevenue {
  month: number;
  amount: number;
}

export interface ICost {
  month: number;
  amount: number;
}

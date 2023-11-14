export interface IResAPI<T> {
  message?: string;
  statusCode: string;
  data: T;
}

export interface IQuantity {
  quantity: number;
}

export interface IRevenue {
  amount: number;
}

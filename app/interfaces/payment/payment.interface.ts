export interface ICreatePaymentVnpayUrl {
  orderId: string;
  bankCode?: string;
}

export interface ICreatePaymentVnpayUrlRes {
  url: string;
}

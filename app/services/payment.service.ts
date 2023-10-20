import { IResAPI } from '@interfaces/base-response.interface';
import { BaseService, GATEWAY } from './base';
import { ICreatePaymentVnpayUrl, ICreatePaymentVnpayUrlRes } from '@interfaces/payment/payment.interface';

export class PaymentService {
  private paymentService: BaseService;
  constructor() {
    this.paymentService = new BaseService();
  }

  createPaymentUrl(data: ICreatePaymentVnpayUrl) {
    return this.paymentService.post<ICreatePaymentVnpayUrl, IResAPI<ICreatePaymentVnpayUrlRes>>({
      url: GATEWAY.payment.vnpay_create_payment_url,
      data,
    });
  }
}

import { IResAPI } from '@interfaces/base-response.interface';
import { ICustomer } from '@interfaces/customer/customer.interface';
import { BaseService, GATEWAY } from './base';

export class CustomerService {
  private customerService: BaseService;

  constructor() {
    this.customerService = new BaseService();
  }

  info(staffId: string) {
    return this.customerService.get<IResAPI<ICustomer>>({ url: GATEWAY.customer.info.replace(':id', staffId) });
  }
}

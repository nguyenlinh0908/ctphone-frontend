import { IResAPI } from '@interfaces/base-response.interface';
import {
  ICreateDeliveryAddress,
  IDeliveryAddress,
  IDistrict,
  IProvince,
} from '@interfaces/delivery_address/delivery_address.interface';
import { BaseService, GATEWAY } from './base';

export class DeliveryAddressService {
  private deliveryAddressService: BaseService;

  constructor() {
    this.deliveryAddressService = new BaseService();
  }

  myDeliveryAddress() {
    return this.deliveryAddressService.get<IResAPI<IDeliveryAddress[]>>({ url: GATEWAY.delivery_address.profile });
  }

  create(data: ICreateDeliveryAddress) {
    return this.deliveryAddressService.post<ICreateDeliveryAddress, IResAPI<IDeliveryAddress>>({
      url: GATEWAY.delivery_address.create,
      data,
    });
  }

  provinces() {
    return this.deliveryAddressService.get<IResAPI<IProvince[]>>({ url: GATEWAY.delivery_address.provinces });
  }

  districts(provinceId: string) {
    return this.deliveryAddressService.get<IResAPI<IProvince>>({
      url: GATEWAY.delivery_address.districts.replace(':id', provinceId),
    });
  }

  wards(districtId: string) {
    return this.deliveryAddressService.get<IResAPI<IDistrict>>({
      url: GATEWAY.delivery_address.wards.replace(':id', districtId),
    });
  }

  delete(id: string) {
    return this.deliveryAddressService.delete({ url: GATEWAY.delivery_address.delete.replace(':id', id) });
  }

  update(id: string, data: ICreateDeliveryAddress) {
    return this.deliveryAddressService.patch({
      url: GATEWAY.delivery_address.update.replace(':id', id),
      data,
    });
  }

  deliveryAddress(id: string) {
    return this.deliveryAddressService.get<IResAPI<IDeliveryAddress>>({
      url: GATEWAY.delivery_address.find_one.replace(':id', id),
    });
  }

  defaultAddress(){
    return this.deliveryAddressService.get<IResAPI<IDeliveryAddress>>({
      url: GATEWAY.delivery_address.default
    })
  }
}

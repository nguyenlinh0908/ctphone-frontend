import {
  ICreateProductInput,
  IProduct,
  IProductFilter,
  IUpdateProductStatusInput,
} from '@interfaces/product/product.interface';
import { BaseService, GATEWAY } from './base';
import { IPaginateDto, IPaginateResponse } from '@interfaces/paginate.interface';
import { IResAPI } from '@interfaces/base-response.interface';
import { buildQueryString } from '@utils/string';

export class ProductService {
  private productService: BaseService;

  constructor() {
    this.productService = new BaseService();
  }

  all() {
    return this.productService.get<IResAPI<IProduct[]>>({ url: `${GATEWAY.product.all}` });
  }

  findById(id: string) {
    return this.productService.get<IResAPI<IProduct>>({ url: `${GATEWAY.product.find_by_id}/${id}` });
  }

  find(paginate: IPaginateDto, filter: IProductFilter) {
    const queryString = buildQueryString({ ...paginate, ...filter });
    return this.productService.get<IResAPI<IPaginateResponse<IProduct>>>({
      url: `${GATEWAY.product.find}${queryString}`,
    });
  }

  updateStatus(data: IUpdateProductStatusInput) {
    return this.productService.patch<any, IResAPI<IProduct>>({
      url: GATEWAY.product.update_status.replace(':id', data.id),
      data: { status: data.status },
    });
  }

  create(data: ICreateProductInput) {
    return this.productService.post<ICreateProductInput, IResAPI<IProduct>>({ url: GATEWAY.product.create, data });
  }
}

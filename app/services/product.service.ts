import { IProduct, IProductFilter } from '@interfaces/product/product.interface';
import { BaseService, GATEWAY } from './base';
import { IPaginateDto } from '@interfaces/paginate.interface';

export class ProductService {
  private productService: BaseService;

  constructor() {
    this.productService = new BaseService();
  }

  all() {
    return this.productService.get<IProduct[]>({ url: `${GATEWAY.product.all}` });
  }

  findById(id: string) {
    return this.productService.get<IProduct>({ url: `${GATEWAY.product.find_by_id}/${id}` });
  }

  find(paginate: IPaginateDto, filter: IProductFilter) {
    return this.productService.get<IProduct[]>({
      url: `${GATEWAY.product.find}?limit=${paginate.limit}&page=${paginate.page}`,
      data: { ...filter },
    });
  }

  findLine(paginate: IPaginateDto, filter: IProductFilter) {
    return this.productService.get<IProduct[]>({
      url: `${GATEWAY.product.line}?limit=${paginate.limit}&page=${paginate.page}&categoryId=${filter.categoryId}`,
    });
  }
}

import { IProduct } from '@interfaces/auth/product.interface';
import { BaseService, GATEWAY } from './base';

export class ProductService {
  private productService: BaseService;

  constructor() {
    this.productService = new BaseService();
  }

  all() {
    return this.productService.get<IProduct[]>({ url: `${GATEWAY.product.all}` });
  }

  findById(id:string){
    return this.productService.get<IProduct>({ url: `${GATEWAY.product.find_by_id}/${id}` });
  }
}

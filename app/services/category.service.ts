import { ICategory, IFilterCategory } from '@interfaces/category/category.interface';
import { BaseService, GATEWAY } from './base';
import { IResAPI } from '@interfaces/base-response.interface';

export class CategoryService {
  private categoryService: BaseService;

  constructor() {
    this.categoryService = new BaseService();
  }

  navigationCategories(filter: IFilterCategory): Promise<IResAPI<ICategory[]>> {
    return this.categoryService.get({ url: `${GATEWAY.category.find}?dept=${filter.dept}` });
  }
}

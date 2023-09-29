import { ICategory, IFilterCategory } from '@interfaces/auth/category.interface';
import { BaseService, GATEWAY } from './base';

export class CategoryService {
  private categoryService: BaseService;

  constructor() {
    this.categoryService = new BaseService();
  }

  navigationCategories(filter: IFilterCategory): Promise<ICategory[]> {
    return this.categoryService.get({ url: `${GATEWAY.category.find}?dept=${filter.dept}` });
  }
}

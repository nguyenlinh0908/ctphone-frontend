import { ICategory, ICreateCategoryInput, IFilterCategory } from '@interfaces/category/category.interface';
import { BaseService, GATEWAY } from './base';
import { IResAPI } from '@interfaces/base-response.interface';

export class CategoryService {
  private categoryService: BaseService;

  constructor() {
    this.categoryService = new BaseService();
  }

  navigationCategories(filter: IFilterCategory): Promise<IResAPI<ICategory[]>> {
    return this.categoryService.get<IResAPI<ICategory[]>>({ url: `${GATEWAY.category.find}?dept=${filter.dept}` });
  }

  allCategories() {
    return this.categoryService.get<IResAPI<ICategory[]>>({ url: GATEWAY.category.all });
  }

  create(data: ICreateCategoryInput) {
    return this.categoryService.post<ICreateCategoryInput, IResAPI<ICategory>>({ url: GATEWAY.category.create, data });
  }
}

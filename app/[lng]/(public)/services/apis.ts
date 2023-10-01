import { IFilterCategory } from '@interfaces/category/category.interface';
import { IPaginateDto } from '@interfaces/paginate.interface';
import { IProductFilter } from '@interfaces/product/product.interface';
import { CategoryService } from '@services/category.service';
import { ProductService } from '@services/product.service';
import { useQuery } from 'react-query';

const productService = new ProductService();
const categoryService = new CategoryService();

export const useNavigationCategories = (filter: IFilterCategory) => {
  return useQuery('navigation', () => categoryService.navigationCategories(filter));
};

export const useProducts = (paginate: IPaginateDto, filter: IProductFilter) => {
  return useQuery([`products`, filter], () => productService.find(paginate, filter));
};

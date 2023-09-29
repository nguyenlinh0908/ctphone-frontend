import { IFilterCategory } from '@interfaces/auth/category.interface';
import { CategoryService } from '@services/category.service';
import { ProductService } from '@services/product.service';
import { useQuery } from 'react-query';

const productService = new ProductService();
const categoryService = new CategoryService();

export const useNavigationCategories = (filter: IFilterCategory) => {
  return useQuery('navigation', () => categoryService.navigationCategories(filter));
};

export const useAllProducts = () => {
  return useQuery('allProducts', () => productService.all());
};

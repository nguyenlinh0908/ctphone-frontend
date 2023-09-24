import { ProductService } from '@services/product.service';
import { useQuery } from 'react-query';

const productService = new ProductService();

export const categories = () => {
  return useQuery({});
};

export const useAllProducts = () => {
  return useQuery('allProducts', () => productService.all());
};
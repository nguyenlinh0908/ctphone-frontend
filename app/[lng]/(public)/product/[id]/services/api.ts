import { ProductService } from '@services/product.service';
import { useQuery } from 'react-query';

const productDetailService = new ProductService();

export const useProductDetail = (id: string) => {
  return useQuery('productDetail', () => productDetailService.findById(id));
};

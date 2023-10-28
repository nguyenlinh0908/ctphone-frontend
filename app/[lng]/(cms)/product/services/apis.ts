import { ICreateProductInput, IUpdateProductStatusInput } from '@interfaces/product/product.interface';
import { ProductService } from '@services/product.service';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const productService = new ProductService();

export const useAllProducts = () => {
  return useQuery('allProducts', () => productService.all());
};

export const useUpdateProductStatus = () => {
  const queryClient = useQueryClient();

  return useMutation('updateProductStatus', (data: IUpdateProductStatusInput) => productService.updateStatus(data), {
    onSuccess: () => queryClient.invalidateQueries('allProducts'),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation('createProduct', (data: ICreateProductInput) => productService.create(data), {
    onSuccess: () => queryClient.invalidateQueries('allProducts'),
  });
};

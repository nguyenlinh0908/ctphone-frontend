import { IUpdateCart } from '@interfaces/order/create-cart.interface';
import { OrderService } from '@services/cart.service';
import { ProductService } from '@services/product.service';
import { useMutation, useQuery } from 'react-query';

const productDetailService = new ProductService();
const orderService = new OrderService();

export const useProductDetail = (id: string) => {
  return useQuery('productDetail', () => productDetailService.findById(id));
};

export const useUpdateCart = () => {
  return useMutation('updateCart', (data: IUpdateCart) => orderService.updateCart(data));
};

export const useMyCart = () => {
  return useQuery('myCart', () => orderService.getMyCart());
};

export const useCartDetail = (cartId: string) => {
  return useQuery('cartDetail', () => orderService.getCartDetail(cartId));
};

import { IResAPI } from '@interfaces/base-response.interface';
import { IUpdateCart } from '@interfaces/order/create-cart.interface';
import { IOrder } from '@interfaces/order/order.interface';
import { OrderService } from '@services/order.service';
import { ProductService } from '@services/product.service';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const productDetailService = new ProductService();
const orderService = new OrderService();

export const useProductDetail = (id: string) => {
  return useQuery('productDetail', () => productDetailService.findById(id));
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  return useMutation('updateCart', (data: IUpdateCart) => orderService.updateCart(data), {
    onSuccess: (data: IResAPI<IOrder>) => {
      queryClient.invalidateQueries(`cartDetail${data.data._id}`);
      queryClient.invalidateQueries('myCart');
    },
  });
};

export const useMyCart = () => {
  return useQuery('myCart', () => orderService.getMyCart(), {
    onSettled(data, error) {
      return [];
    },
  });
};

export const useCartDetail = (cartId: any) => {
  return useQuery(`cartDetail${cartId}`, () => orderService.getCartDetail(cartId), { enabled: !!cartId });
};

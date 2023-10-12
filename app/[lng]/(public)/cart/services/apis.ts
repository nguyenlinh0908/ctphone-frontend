import { IResAPI } from '@interfaces/base-response.interface';
import { IOrderItem } from '@interfaces/order/order-item.interface';
import { OrderService } from '@services/order.service';
import { useMutation, useQueryClient } from 'react-query';

const orderService = new OrderService();

export const useDeleteCartDetail = () => {
  const queryClient = useQueryClient();

  return useMutation(`deleteCartDetail`, (cartDetailId: string) => orderService.deleteCartDetail(cartDetailId), {
    onSuccess: (data: IResAPI<IOrderItem>) => {
      queryClient.invalidateQueries('myCart');
      queryClient.invalidateQueries(`cartDetail${data.data.orderId._id}`);
    },
  });
};

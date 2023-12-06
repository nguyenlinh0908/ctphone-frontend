import { IOrderFilter } from '@interfaces/order/order.interface';
import { OrderService } from '@services/order.service';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const orderService = new OrderService();

export const usePurchaseHistory = (filter: IOrderFilter) => {
  return useQuery(`purchaseHistory${filter.status}`, () => orderService.purchaseHistory(filter));
};

export const useOrderDetail = (orderId: string) => {
  return useQuery(`orderDetail${orderId}`, () => orderService.detail(orderId), { enabled: !!orderId });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation('cancel', (orderId: string) => orderService.cancel(orderId), {
    onSuccess: () => {
      queryClient.invalidateQueries('purchaseHistory');
    },
  });
};

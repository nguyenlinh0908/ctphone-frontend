import { IOrderFilter, OrderStatus } from '@interfaces/order/order.interface';
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

  return useMutation(
    'cancel',
    ({ orderId, note }: { orderId: string; note: string }) => orderService.cancel(orderId, note),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`purchaseHistoryundefined`);
        queryClient.invalidateQueries(`purchaseHistory${OrderStatus.CANCEL}`);
        queryClient.invalidateQueries(`cmsOrders${OrderStatus.SUCCESS}`);
        queryClient.invalidateQueries(`cmsOrders${OrderStatus.CANCEL}`);
      },
    },
  );
};

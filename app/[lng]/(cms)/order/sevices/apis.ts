import { OrderStatus } from '@interfaces/order/order.interface';
import { OrderService } from '@services/order.service';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const orderService = new OrderService();

export const orderStatusSteps = orderService.orderStatusSteps;

export const useOrderCms = () => {
  return useQuery('cmsOrders', () => orderService.getOrdersInCms());
};

export const useConfirmOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    'confirmOrder',
    ({ orderId, status }: { orderId: string; status: OrderStatus }) => orderService.changeOrderStatus(orderId, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cmsOrders');
      },
    },
  );
};

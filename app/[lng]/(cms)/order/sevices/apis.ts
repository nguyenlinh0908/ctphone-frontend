import { IOrderFilter, OrderStatus } from '@interfaces/order/order.interface';
import { CustomerService } from '@services/customer.service';
import { OrderService } from '@services/order.service';
import { StaffService } from '@services/staff.service';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const orderService = new OrderService();
const customerService = new CustomerService();
const staffService = new StaffService();

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
        queryClient.invalidateQueries(`cmsOrders${'all'}`);
        queryClient.invalidateQueries(`cmsOrders${OrderStatus.SUCCESS}`);
        queryClient.invalidateQueries(`cmsOrders${OrderStatus.CANCEL}`);
        queryClient.invalidateQueries(`cmsOrders${OrderStatus.IN_TRANSPORT}`);
        queryClient.invalidateQueries(`cmsOrders${OrderStatus.PENDING}`);
        queryClient.invalidateQueries(`cmsOrders${OrderStatus.PREPARES_PACKAGE}`);
      },
    },
  );
};

export const useCustomerInfo = (customerId: string) => {
  return useQuery(`customerInfo${customerId}`, () => customerService.info(customerId), { enabled: !!customerId });
};

export const useStaffInfo = (staffId: string) => {
  return useQuery(`staffInfo${staffId}`, () => staffService.info(staffId), { enabled: !!staffId });
};

export const useOrderInfo = (orderId: string) => {
  return useQuery(`orderInfo${orderId}`, () => orderService.info(orderId), { enabled: !!orderId });
};

export const useOrders = (filter: IOrderFilter) => {
  return useQuery(`cmsOrders${filter?.code && filter.code}${filter?.status ? filter.status : 'all'}`, () => orderService.getOrders(filter));
};
import { CustomerService } from '@services/customer.service';
import { OrderService } from '@services/order.service';
import { useQuery } from 'react-query';

const customerService = new CustomerService();
const orderService = new OrderService();

export const useCustomerTotal = () => {
  return useQuery('totalCustomer', () => customerService.quantity());
};

export const useOrderTotal = () => {
  return useQuery('totalOrder', () => orderService.quantity());
};

export const useOrderRevenue = () => {
  return useQuery('revenue', () => orderService.revenue());
};

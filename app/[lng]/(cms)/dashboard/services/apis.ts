import { CustomerService } from '@services/customer.service';
import { OrderService } from '@services/order.service';
import { WarehouseReceiptService } from '@services/warehouse-receipt.service';
import { useQuery } from 'react-query';

const customerService = new CustomerService();
const orderService = new OrderService();
const warehouseReceiptService = new WarehouseReceiptService();

export const useCustomerTotal = () => {
  return useQuery('totalCustomer', () => customerService.quantity());
};

export const useOrderTotal = () => {
  return useQuery('totalOrder', () => orderService.quantity());
};

export const useOrderRevenue = () => {
  return useQuery('revenue', () => orderService.revenue());
};

export const useWarehouseReceiptCost = () => {
  return useQuery('cost', () => warehouseReceiptService.totalCost());
};

export const useRevenueByMonths = () => {
  return useQuery('revenueByMonths', () => orderService.revenueByMonths());
};

export const useCostByMonths = () => {
  return useQuery('costByMonths', () => warehouseReceiptService.costByMonths());
};

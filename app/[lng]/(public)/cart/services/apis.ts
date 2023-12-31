import { IResAPI } from '@interfaces/base-response.interface';
import { IOrderItem } from '@interfaces/order/order-item.interface';
import { ICreatePaymentVnpayUrl } from '@interfaces/payment/payment.interface';
import { DeliveryAddressService } from '@services/delivery-address.service';
import { OrderService } from '@services/order.service';
import { PaymentService } from '@services/payment.service';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const orderService = new OrderService();
const paymentService = new PaymentService();
const deliveryAddressService = new DeliveryAddressService();

export const useDeleteCartDetail = () => {
  const queryClient = useQueryClient();

  return useMutation(`deleteCartDetail`, (cartDetailId: string) => orderService.deleteCartDetail(cartDetailId), {
    onSuccess: (data: IResAPI<IOrderItem>) => {
      queryClient.invalidateQueries('myCart');
      queryClient.invalidateQueries(`cartDetail${data.data.orderId._id}`);
    },
  });
};

export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation(`checkout`, (orderId: string) => orderService.checkout(orderId), {
    onSuccess: () => {
      queryClient.invalidateQueries('myCart');
    },
  });
};

export const useCreatePaymentVnpayUrl = () => {
  return useMutation('createPaymentVnpayUrl', (data: ICreatePaymentVnpayUrl) => paymentService.createPaymentUrl(data));
};

export const useDefaultDeliveryAddress = () => {
  return useQuery('defaultAddress', () => deliveryAddressService.defaultAddress());
};

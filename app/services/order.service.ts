import { IResAPI } from '@interfaces/base-response.interface';
import { IUpdateCart } from '@interfaces/order/create-cart.interface';
import { IOrderItem } from '@interfaces/order/order-item.interface';
import { IOrder, OrderStatus } from '@interfaces/order/order.interface';
import { BaseService, GATEWAY } from './base';

export class OrderService {
  private orderService: BaseService;
  public readonly orderStatusSteps: OrderStatus[] = [
    OrderStatus.CART,
    OrderStatus.PENDING,
    OrderStatus.PREPARES_PACKAGE,
    OrderStatus.IN_TRANSPORT,
    OrderStatus.SUCCESS,
  ];

  constructor() {
    this.orderService = new BaseService();
  }

  updateCart(data: IUpdateCart) {
    return this.orderService.patch<IUpdateCart, IResAPI<IOrder>>({ url: GATEWAY.order.cart.update, data });
  }

  getMyCart() {
    return this.orderService.get<IResAPI<IOrder>>({ url: GATEWAY.order.cart.my_cart });
  }

  getCartDetail(cartId: string) {
    return this.orderService.get<IResAPI<IOrderItem[]>>({ url: `${GATEWAY.order.cart.my_cart_detail}/${cartId}` });
  }

  deleteCartDetail(cartDetailId: string) {
    return this.orderService.delete<IResAPI<IOrderItem>>({
      url: `${GATEWAY.order.cart.delete_cart_detail}/${cartDetailId}`,
    });
  }

  getOrdersInCms() {
    return this.orderService.get<IResAPI<IOrder[]>>({ url: GATEWAY.order.cms.list });
  }

  checkout(orderId: string) {
    return this.orderService.patch<{ orderId: string }, IResAPI<IOrder>>({
      url: `${GATEWAY.order.checkout.replace(':id', orderId)}`,
    });
  }

  changeOrderStatus(orderId: string, status: OrderStatus) {
    return this.orderService.patch<any, IResAPI<IOrder>>({
      url: `${GATEWAY.order.confirm.replace(':id', orderId)}`,
      data: { status },
    });
  }
}

import { IQuantity, IResAPI, IRevenue } from '@interfaces/base-response.interface';
import { IUpdateCart } from '@interfaces/order/create-cart.interface';
import { IOrderItem } from '@interfaces/order/order-item.interface';
import { IOrder, IOrderFilter, IOrderInfo, OrderStatus } from '@interfaces/order/order.interface';
import { BaseService, GATEWAY } from './base';
import { buildQueryString } from '@utils/string';

export class OrderService {
  private orderService: BaseService;
  public readonly orderStatusSteps: OrderStatus[] = [
    OrderStatus.CART,
    OrderStatus.PENDING,
    OrderStatus.PREPARES_PACKAGE,
    OrderStatus.IN_TRANSPORT,
    OrderStatus.SUCCESS,
    OrderStatus.CANCEL,
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
    return this.orderService.get<IResAPI<IOrderItem[]>>({
      url: `${GATEWAY.order.cart.my_cart_detail.replace(':id', cartId)}`,
    });
  }

  deleteCartDetail(cartDetailId: string) {
    return this.orderService.delete<IResAPI<IOrderItem>>({
      url: `${GATEWAY.order.cart.delete_cart_detail.replace(':id', cartDetailId)}`,
    });
  }

  getOrdersInCms() {
    return this.orderService.get<IResAPI<IOrder[]>>({ url: GATEWAY.order.cms.list });
  }

  getOrders(filter: IOrderFilter) {
    return this.orderService.get<IResAPI<IOrder[]>>({ url: `${GATEWAY.order.find}${buildQueryString(filter)}` });
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

  purchaseHistory(filter: IOrderFilter) {
    return this.orderService.get<IResAPI<IOrder[]>>({ url: `${GATEWAY.order.purchase_history}${buildQueryString(filter)}` });
  }

  detail(orderId: string) {
    return this.orderService.get<IResAPI<IOrderItem[]>>({ url: `${GATEWAY.order.detail.replace(':id', orderId)}` });
  }

  cancel(orderId: string) {
    return this.orderService.patch<any, IResAPI<IOrder>>({ url: `${GATEWAY.order.cancel.replace(':id', orderId)}` });
  }

  info(orderId: string) {
    return this.orderService.get<IResAPI<IOrderInfo>>({ url: GATEWAY.order.info.replace(':id', orderId) });
  }

  quantity() {
    return this.orderService.get<IResAPI<IQuantity>>({ url: GATEWAY.order.quantity });
  }

  revenue() {
    return this.orderService.get<IResAPI<IRevenue>>({ url: GATEWAY.order.revenue });
  }

  revenueByMonths() {
    return this.orderService.get<IResAPI<IRevenue[]>>({ url: GATEWAY.order.revenue_by_months });
  }
}

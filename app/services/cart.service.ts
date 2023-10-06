import { IGenAccessTokenInput, ILoginInput, ILoginResponse } from '@interfaces/auth/auth.interface';
import { BaseService, GATEWAY } from './base';
import { IResAPI } from '@interfaces/base-response.interface';
import { IUpdateCart } from '@interfaces/order/create-cart.interface';

export class OrderService {
  private orderService: BaseService;

  constructor() {
    this.orderService = new BaseService();
  }

  updateCart(data: IUpdateCart) {
    return this.orderService.patch({ url: GATEWAY.order.cart.update, data });
  }

  getMyCart() {
    return this.orderService.get({ url: GATEWAY.order.cart.my_cart });
  }

  getCartDetail(cartId: string) {
    return this.orderService.get({ url: `${GATEWAY.order.cart.my_cart_detail}/${cartId}` });
  }
}

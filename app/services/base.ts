import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { AuthService } from './auth.service';
import { IResAPI } from '@interfaces/base-response.interface';
import { ILoginResponse } from '@interfaces/auth/auth.interface';
export const GATEWAY = {
  root: process.env.API_ENDPOINT || 'http:127.0.0.1/api/v1',
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    gen_access_token: '/auth/gen-access',
    profile: '/auth/profile',
    register_customer_account: '/auth/customer/account/register',
    register_staff_account: '/auth/staff/account/register',
  },
  staff: {
    staffs: '/staff',
    info: '/staff/:id',
  },
  customer: {
    info: '/customer/:id',
  },
  product: {
    all: '/product/all',
    find_by_id: '/product',
    find: '/product',
    line: '/product/category/line',
  },
  category: {
    find: '/category',
  },
  order: {
    cart: {
      update: '/order/cart',
      my_cart: '/order/cart',
      my_cart_detail: '/order/cart/:id/detail',
      delete_cart_detail: '/order/cart/detail/:id',
    },
    cms: {
      list: '/order/all',
    },
    purchase_history: '/order/purchase_history',
    checkout: '/order/:id/checkout',
    confirm: '/order/:id/confirm',
    detail: '/order/:id/detail',
    cancel: '/order/:id/cancel',
    info: '/order/:id',
  },
  payment: {
    vnpay_create_payment_url: '/payment/vnp/create_payment',
  },
};

let requestCheckCounter = 0;

export class BaseService {
  axiosInstance: AxiosInstance;
  language = 'vi';

  constructor(baseURL = GATEWAY.root) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept-Language': this.language,
      },
      timeout: 60000,
      // withCredentials: true,
    });

    this.initInterceptor();
  }

  private initInterceptor() {
    this.axiosInstance.interceptors.request.use((request) => {
      if (typeof window !== 'undefined') {
        request.headers['Accept-Language'] = window.location.pathname.slice(1, 3);
      }
      const refreshToken = getCookie('refreshToken');
      let accessToken = getCookie('accessToken');
      const accessTokenExpiresAt = getCookie('accessTokenExpiresAt') || 0;
      const refreshTokenExpiresAt = getCookie('refreshTokenExpiresAt') || 0;

      const currentTime = new Date().getTime();
      if (refreshToken && +refreshTokenExpiresAt > currentTime) {
        request.headers.Authorization = `Bearer ${accessToken}`;
        if (+accessTokenExpiresAt < currentTime) {
          requestCheckCounter++;
          if (requestCheckCounter === 1) {
            const authService = new AuthService();
            authService
              .genAccessToken({
                refreshToken,
              })
              .then((res: IResAPI<ILoginResponse>) => {
                requestCheckCounter = 0;
                if (res.data.accessToken) {
                  setCookie('accessToken', res.data.accessToken, { expires: new Date(res.data.accessTokenExpiresAt) });
                  setCookie('refreshToken', res.data.refreshToken, {
                    expires: new Date(res.data.refreshTokenExpiresAt),
                  });
                  setCookie('accessTokenExpiresAt', res.data.accessTokenExpiresAt, {
                    expires: new Date(res.data.accessTokenExpiresAt),
                  });
                  setCookie('refreshTokenExpiresAt', res.data.refreshTokenExpiresAt, {
                    expires: new Date(res.data.refreshTokenExpiresAt),
                  });
                  setCookie('me', res.data.me, { expires: new Date(res.data.refreshTokenExpiresAt) });
                }
              })
              .catch(() => {
                requestCheckCounter = 0;
                deleteCookie('accessToken');
                deleteCookie('refreshToken');
                deleteCookie('accessTokenExpiresAt');
                deleteCookie('refreshTokenExpiresAt');

                window.location.replace(`/${this.language}/login`);
              });
          }
        }
      }

      return request;
    });

    this.axiosInstance.interceptors.response.use((response) => response);
  }

  public request<IRestAPI>(config: AxiosRequestConfig): Promise<IRestAPI> {
    return this.axiosInstance(config).then(({ data }) => data);
  }

  public get<IRestAPI>(config: Omit<AxiosRequestConfig, 'method'>): Promise<IRestAPI> {
    return this.request({ ...config, method: 'GET' });
  }

  public post<R, IResAPI>(config: Omit<AxiosRequestConfig<R>, 'method'>): Promise<IResAPI> {
    return this.request({ ...config, method: 'POST' });
  }

  public patch<R, IResAPI>(config: Omit<AxiosRequestConfig<R>, 'method'>): Promise<IResAPI> {
    return this.request({ ...config, method: 'PATCH' });
  }

  public delete<IResAPI>(config: Omit<AxiosRequestConfig, 'method'>): Promise<IResAPI> {
    return this.request({ ...config, method: 'DELETE' });
  }
}

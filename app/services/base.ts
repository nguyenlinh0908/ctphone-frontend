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
  },
  staff: {
    staffs: '/staff',
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
      my_cart_detail: '/order/cart/detail',
      delete_cart_detail:"/order/cart/detail"
    },
    cms:{
      list: "/order/cms"
    }
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
                  setCookie('accessToken', res.data.accessToken);
                  setCookie('refreshToken', res.data.refreshToken);
                  setCookie('accessTokenExpiresAt', res.data.accessTokenExpiresAt);
                  setCookie('refreshTokenExpiresAt', res.data.refreshTokenExpiresAt);
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

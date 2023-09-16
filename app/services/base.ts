import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getAuthLocal } from '@utils/token';
import { AccountService } from './account';

export const baseUrl = {
  gateway: process.env.NEXT_PUBLIC_API_GATEWAY,
  auth: process.env.NEXT_PUBLIC_API_AUTH,
  partnership: process.env.NEXT_PUBLIC_API_PARTNERSHIP,
  sale: process.env.NEXT_PUBLIC_API_SALE,
  shipping: process.env.NEXT_PUBLIC_API_SHIPPING,
  warehouse: process.env.NEXT_PUBLIC_API_WAREHOUSE,
  notification: process.env.NEXT_PUBLIC_API_NOTIFICATION,
  payment: process.env.NEXT_PUBLIC_API_PAYMENT,
  cart: process.env.NEXT_PUBLIC_API_CART,
  review: process.env.NEXT_PUBLIC_API_REVIEW,
  wallet: process.env.NEXT_PUBLIC_API_WALLET,
  account: process.env.NEXT_PUBLIC_API_ACCOUNT,
};

let requestCheckCounter = 0;

export class BaseService {
  axiosInstance: AxiosInstance;
  language = 'lo';

  constructor(baseURL = baseUrl.gateway) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept-Language': this.language,
      },
      timeout: 60000,
      withCredentials: true,
    });

    this.initInterceptor();
  }

  private initInterceptor() {
    this.axiosInstance.interceptors.request.use((request) => {
      if (typeof window !== 'undefined') {
        request.headers['Accept-Language'] = window.location.pathname.slice(1, 3);
      }
      const auth = getAuthLocal();
      if (auth) {
        request.headers.Authorization = `Bearer ${auth.access_token}`;
        if (auth.expires_at - Date.now() < 180000) {
          requestCheckCounter++;
          if (requestCheckCounter === 1) {
            const accountService = new AccountService();
            accountService
              .refreshToken({
                grant_type: 'refresh_token',
                client_id: 'Mobile_Customer',
                refresh_token: auth.refresh_token,
              })
              .then((res) => {
                requestCheckCounter = 0;
                if (res.access_token) {
                  res.expires_at = Date.now() + res.expires_in * 1000;
                  localStorage.setItem('auth', JSON.stringify(res));
                }
              })
              .catch(() => {
                requestCheckCounter = 0;
                localStorage.removeItem('auth');
                window.location.replace(`/${this.language}/crash`);
              });
          }
        }
      }

      return request;
    });

    this.axiosInstance.interceptors.response.use((response) => response);
  }

  public request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance(config).then(({ data }) => data);
  }

  public get<T>(config: Omit<AxiosRequestConfig, 'method'>): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }

  public post<R, T>(config: Omit<AxiosRequestConfig<R>, 'method'>): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }

  public put<R, T>(config: Omit<AxiosRequestConfig<R>, 'method'>): Promise<T> {
    return this.request({ ...config, method: 'PUT' });
  }

  public delete<T>(config: Omit<AxiosRequestConfig, 'method'>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }
}

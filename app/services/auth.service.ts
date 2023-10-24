import {
  IAccount,
  IGenAccessTokenInput,
  ILoginInput,
  ILoginResponse,
  IProfile,
  IRegisterCustomerAccountInput
} from '@interfaces/auth/auth.interface';
import { IResAPI } from '@interfaces/base-response.interface';
import { BaseService, GATEWAY } from './base';

export class AuthService {
  private accountService: BaseService;

  constructor() {
    this.accountService = new BaseService();
  }

  login(body: ILoginInput): Promise<IResAPI<ILoginResponse>> {
    return this.accountService.post({ url: GATEWAY.auth.login, data: body });
  }

  genAccessToken(genAccessTokenInput: IGenAccessTokenInput) {
    return this.accountService.post<IGenAccessTokenInput, IResAPI<ILoginResponse>>({
      url: GATEWAY.auth.gen_access_token,
      data: genAccessTokenInput,
    });
  }

  profile() {
    return this.accountService.get<IResAPI<IProfile>>({ url: GATEWAY.auth.profile });
  }

  logout(data: { accessToken: string; refreshToken: string }) {
    return this.accountService.post<{ accessToken: string; refreshToken: string }, IResAPI<boolean>>({
      url: GATEWAY.auth.logout,
      data,
    });
  }

  registerCustomerAccount(registerCustomerAccountInput: IRegisterCustomerAccountInput) {
    return this.accountService.post<IRegisterCustomerAccountInput, IResAPI<IAccount>>({
      url: GATEWAY.auth.register_customer_account, data: registerCustomerAccountInput
    });
  }
}

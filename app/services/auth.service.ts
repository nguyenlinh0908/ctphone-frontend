import { IGenAccessTokenInput, ILoginInput, ILoginResponse, IProfile } from '@interfaces/auth/auth.interface';
import { BaseService, GATEWAY } from './base';
import { IResAPI } from '@interfaces/base-response.interface';

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
}

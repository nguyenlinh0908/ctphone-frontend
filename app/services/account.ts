import { LoginInput, Auth, RefreshTokenInput, IProfile, PasswordForApp } from '@models/account';
import { BaseService, baseUrl } from './base';

export class AccountService {
  private accountService: BaseService;
  constructor() {
    this.accountService = new BaseService(baseUrl.account);
  }

  login(data: LoginInput) {
    return this.accountService.post<LoginInput, Auth>({
      url: '/connect/token',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data,
    });
  }

  refreshToken(data: RefreshTokenInput) {
    return this.accountService.post<RefreshTokenInput, Auth>({
      url: '/connect/token',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data,
    });
  }

  profile() {
    return this.accountService.get<IProfile>({
      url: '/api/account/my-profile',
    });
  }

  setPassword(data: PasswordForApp) {
    return this.accountService.post<PasswordForApp, Auth>({
      url: '/api/app/account/set-password',
      data,
    });
  }
}

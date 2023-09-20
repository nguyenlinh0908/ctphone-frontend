import { ILoginInput, ILoginResponse } from '@interfaces/auth/auth.interface';
import { BaseService, GATEWAY } from './base';

export class AuthService {
  private accountService: BaseService;

  constructor() {
    this.accountService = new BaseService();
  }

  login(body: ILoginInput): Promise<ILoginResponse> {
    return this.accountService.post({ url: GATEWAY.auth.login, data: body });
  }
}

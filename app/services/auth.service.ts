import { ILoginInput } from '@models/auth/auth.model';
import { BaseService, GATEWAY } from './base';

export class AuthService {
  private accountService: BaseService;
  
  constructor() {
    this.accountService = new BaseService();
  }
  
  
  login(body: ILoginInput){
    console.log('GATE :>> ', GATEWAY.auth.login);
    return this.accountService.post({ url:"http://127.0.0.1:32000/api/v1/auth/login", data: body });
  }
}

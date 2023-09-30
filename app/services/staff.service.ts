import { IPaginateResponse } from '@interfaces/paginate.interface';
import { BaseService, GATEWAY } from './base';
import { IStaff } from '@interfaces/staff/staff.interface';

export class StaffService {
  private staffService: BaseService;

  constructor() {
    this.staffService = new BaseService();
  }

  staffs(): Promise<IPaginateResponse<IStaff>> {
    return this.staffService.get<IPaginateResponse<IStaff>>({ url: `${GATEWAY.staff.staffs}?page=1&limit=30` });
  }
}

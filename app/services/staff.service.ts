import { IPaginateResponse } from '@interfaces/paginate.interface';
import { BaseService, GATEWAY } from './base';
import { IStaff } from '@interfaces/staff/staff.interface';
import { IResAPI } from '@interfaces/base-response.interface';

export class StaffService {
  private staffService: BaseService;

  constructor() {
    this.staffService = new BaseService();
  }

  staffs(): Promise<IResAPI<IPaginateResponse<IStaff>>> {
    return this.staffService.get<IResAPI<IPaginateResponse<IStaff>>>({
      url: `${GATEWAY.staff.staffs}?page=1&limit=30`,
    });
  }

  info(staffId: string) {
    return this.staffService.get<IResAPI<IStaff>>({ url: GATEWAY.staff.info.replace(':id', staffId) });
  }
}

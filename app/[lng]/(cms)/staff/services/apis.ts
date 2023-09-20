import { useQuery } from "react-query";
import { StaffService } from '@services/staff.service';

const staffService = new StaffService()

export const useGetStaffs = () => {
    return useQuery('staffs', () => staffService.staffs());
};

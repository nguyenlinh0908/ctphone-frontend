export interface IPaginateResponse<T> {
  data: T[];
  limit: number;
  page: number;
  totalPages: number;
  totalRecords: number;
}

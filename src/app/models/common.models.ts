export interface PagedResult<T> {
  data: T[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

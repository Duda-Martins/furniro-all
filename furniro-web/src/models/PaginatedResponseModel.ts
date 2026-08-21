export interface PaginatedResponseModel<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}

/// <reference path="pagination.ts" />

class PagedArray<T> {
    public items: T[];
    public pagination: Pagination;
}
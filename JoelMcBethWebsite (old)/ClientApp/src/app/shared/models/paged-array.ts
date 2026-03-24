import { Pagination } from "./pagination";

export class PagedArray<T> {
    public items: T[];
    public pagination: Pagination;
}

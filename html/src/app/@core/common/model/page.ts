import { PageOrder } from './pageOrder';

export class Page<T> {
    currentPage: number;
    size: number;
    totalPages: number;
    totalRecords: number;
    pageOrder: PageOrder[] = [];
    records: T[];
    filters: T;
}

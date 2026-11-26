import { FIRST_PAGE } from '../constants/pagination.constants';

export function getPageOffset(
    page: number,
    pageSize: number
): number {
    return (page - FIRST_PAGE) * pageSize;
}
import { FIRST_PAGE } from '../constants/pagination.constants';

export function createPagination(
    page: number,
    onChange: (page: number) => void,
    totalItems: number,
    pageSize: number
) {
    function getTotalPages(): number {
        if (
            !Number.isSafeInteger(totalItems) ||
            !Number.isSafeInteger(pageSize) ||
            totalItems < 0 ||
            pageSize <= 0
        ) {
            return FIRST_PAGE;
        }

        return Math.max(
            FIRST_PAGE,
            Math.ceil(totalItems / pageSize)
        );
    }

    const totalPages = getTotalPages();

    function changePage(nextPage: number) {
        if (
            !Number.isSafeInteger(nextPage) ||
            nextPage < FIRST_PAGE
        ) {
            return;
        }

        const target = Math.min(nextPage, totalPages);

        if (target === page) {
            return;
        }

        onChange(target);
    }

    return {
        hasPreviousPage: page > FIRST_PAGE,
        hasNextPage: page < totalPages,
        changePage,
    };
}
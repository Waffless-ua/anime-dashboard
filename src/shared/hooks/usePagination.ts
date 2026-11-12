import { useCallback, useState } from 'react';

const FIRST_PAGE = 1;

export function usePagination() {
    const [page, setPage] = useState(FIRST_PAGE);

    const changePage = useCallback((nextPage: number) => {
        if (!Number.isInteger(nextPage) || nextPage < FIRST_PAGE) {
            return;
        }

        setPage(nextPage);
    }, []);

    const resetPage = useCallback(() => {
        setPage(FIRST_PAGE);
    }, []);

    return {
        page,
        pageIndex: page - FIRST_PAGE,
        changePage,
        resetPage,
    };
}
export function usePagination(
    page: number,
    onChange: (page: number) => void,
    totalItems: number,
    pageSize: number,
) {
    function changePage(nextPage: number) {
        if (!Number.isInteger(nextPage) || nextPage < 1) return;

        onChange(nextPage);
    }

    function resetPage() {
        onChange(1);
    }

    return {
        page,
        pageIndex: page - 1,
        hasNextPage: page * pageSize < totalItems,
        changePage,
        resetPage,
    };
}
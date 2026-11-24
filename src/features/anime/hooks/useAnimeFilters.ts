import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useDebounce } from '../../../shared/hooks/useDebounce';

import {
    changePage as changePageAction,
    resetFilters as resetFiltersAction,
    selectAnimeFilters,
    selectAnimePage,
} from '../store/animeQuerySlice';

export function useAnimeFilters() {
    const dispatch = useAppDispatch();

    const filters = useAppSelector(selectAnimeFilters);
    const page = useAppSelector(selectAnimePage);

    const debouncedQuery = useDebounce(filters, 400);

    function changePage(page: number) {
        dispatch(changePageAction(page));
    }

    function resetFilters() {
        dispatch(resetFiltersAction());
    }

    return {
        debouncedQuery,
        page,
        changePage,
        resetFilters,
    };
}
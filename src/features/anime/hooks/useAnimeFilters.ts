import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useDebounce } from '../../../shared/hooks/useDebounce';

import {
    changePage as changePageAction,
    selectAnimeFilters,
    selectAnimePage,
} from '../store/animeQuerySlice';

export function useAnimeFilters() {
    const dispatch = useAppDispatch();

    const filters = useAppSelector(selectAnimeFilters);
    const page = useAppSelector(selectAnimePage);

    const debouncedQuery = useDebounce(filters);

    const isPending = filters !== debouncedQuery;

    function changePage(page: number) {
        if (isPending) {
            return;
        }

        dispatch(changePageAction(page));
    }

    return {
        debouncedQuery,
        page,
        isPending,
        changePage,
    };
}
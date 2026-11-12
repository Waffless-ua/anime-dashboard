import { useEffect, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { AnimeFiltersContext } from './AnimeFiltersContext';
import { DEFAULT_ANIME_FILTERS } from '../constants/anime.constants';
import type { AnimeFilters } from '../types/animeFilters.types';

import { useDebounce } from '../../../shared/hooks/useDebounce';
import { usePagination } from '../../../shared/hooks/usePagination';

interface AnimeFiltersProviderProps {
    children: ReactNode;
}

const FILTER_DEBOUNCE_MS = 400;

export default function AnimeFiltersProvider({
    children,
}: AnimeFiltersProviderProps) {
    const { control, watch, reset, subscribe } = useForm<AnimeFilters>({
        defaultValues: DEFAULT_ANIME_FILTERS,
    });

    const queryKey = JSON.stringify(watch());

    const debouncedQueryKey = useDebounce(
        queryKey,
        FILTER_DEBOUNCE_MS
    );

    const debouncedQuery = useMemo<AnimeFilters>(
        () => JSON.parse(debouncedQueryKey),
        [debouncedQueryKey]
    );

    const {
        page,
        pageIndex,
        changePage,
        resetPage,
    } = usePagination();

    const previousFiltersKey = useRef(queryKey);

    useEffect(() => {
        return subscribe({
            formState: { values: true },
            callback: ({ values }) => {
                const nextKey = JSON.stringify(values);

                if (previousFiltersKey.current !== nextKey) {
                    previousFiltersKey.current = nextKey;
                    resetPage();
                }
            },
        });
    }, [subscribe, resetPage]);

    function resetFilters() {
        reset();
        resetPage();
    }

    return (
        <AnimeFiltersContext.Provider
            value={{
                control,
                debouncedQuery,
                resetFilters,
                page,
                pageIndex,
                changePage,
            }}
        >
            {children}
        </AnimeFiltersContext.Provider>
    );
}
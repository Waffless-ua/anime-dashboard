import { useMemo } from 'react';
import type { SetURLSearchParams } from 'react-router';

import { useDebounce } from '../../../shared/hooks/useDebounce';
import { parseAnimeFilters } from '../utils/parseAnimeFilters';
import type { AnimeFilters } from '../types/animeFilters.types';

type FilterName = keyof AnimeFilters['filter'] | 'sort' | 'direction' | 'limit';

export function useAnimeFilters(
    searchParams: URLSearchParams,
    setSearchParams: SetURLSearchParams,
) {
    const filters = parseAnimeFilters(searchParams);

    const debouncedKey = useDebounce(JSON.stringify(filters), 400);
    const debouncedQuery = useMemo<AnimeFilters>(
        () => JSON.parse(debouncedKey),
        [debouncedKey]
    );

    const rawPage = Number(searchParams.get('page') ?? 1);
    const page = Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1;

    function changeFilter(name: FilterName, value: string | number) {
        setSearchParams(previous => {
            const next = new URLSearchParams(previous);

            if (value === '') next.delete(name);
            else next.set(name, String(value));

            next.delete('page');
            return next;
        });
    }

    function changePage(nextPage: number) {
        setSearchParams(previous => {
            const next = new URLSearchParams(previous);
            next.set('page', String(nextPage));
            return next;
        });
    }

    function resetFilters() {
        setSearchParams({});
    }

    return {
        filters,
        debouncedQuery,
        page,
        changeFilter,
        changePage,
        resetFilters,
    };
}
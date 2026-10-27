import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { fetchAnime } from '../api/animeApi';

import { useAsyncResource } from '../../../shared/hooks/useAsyncResource';
import { useDebounce } from '../../../shared/hooks/useDebounce';

import {
    ANIME_PAGE_SIZE,
    DEFAULT_ANIME_SORT,
    DEFAULT_SORT_DIRECTION,
} from '../constants/anime.constants';

import type { AnimeFilters } from '../types/animeFilters.types';
import type { AnimeQuery } from '../types/animeApi.types';

const DEFAULT_FILTERS: AnimeFilters = {
    search: '',
    status: '',
    sort: DEFAULT_ANIME_SORT,
    direction: DEFAULT_SORT_DIRECTION,
    limit: ANIME_PAGE_SIZE,
};

export function useAnime() {
    const { control, watch, reset } = useForm<AnimeFilters>({
        defaultValues: DEFAULT_FILTERS,
    });

    const {
        search,
        status,
        sort,
        direction,
        limit,
    } = watch();

    const query = useMemo<AnimeQuery>(() => ({
        filter: {
            text: search.trim() || undefined,
            status: status || undefined,
        },
        sort,
        direction,
        limit,
    }), [search, status, sort, direction, limit]);

    const debouncedQuery = useDebounce(query, 400);

    const loadAnime = useCallback(
        (signal: AbortSignal) =>
            fetchAnime(debouncedQuery, signal),
        [debouncedQuery]
    );

    const { data, ...request } = useAsyncResource(loadAnime);

    function resetFilters() {
        reset();
    }

    return {
        request,
        anime: data?.anime ?? [],
        control,
        resetFilters,
        debouncedQuery,
    };
}
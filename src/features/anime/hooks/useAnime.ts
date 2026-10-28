import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { fetchAnime } from '../api/animeApi';

import { useAsyncResource } from '../../../shared/hooks/useAsyncResource';
import { useDebounce } from '../../../shared/hooks/useDebounce';

import { DEFAULT_ANIME_FILTERS } from '../constants/anime.constants';

import type { AnimeFilters } from '../types/animeFilters.types';

export function useAnime() {
    const { control, watch, reset } = useForm<AnimeFilters>({
        defaultValues: DEFAULT_ANIME_FILTERS,
    });

    const queryKey = JSON.stringify(watch());
    const debouncedQueryKey = useDebounce(queryKey, 400);

    const debouncedQuery = useMemo<AnimeFilters>(
        () => JSON.parse(debouncedQueryKey),
        [debouncedQueryKey]
    );

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
import { useCallback } from 'react';

import { fetchAnime } from '../api/animeApi';
import { useAsyncResource } from '../../../shared/hooks/useAsyncResource';

import type { AnimeFilters } from '../types/animeFilters.types';
import type { RequestState } from '../../../shared/types/async.types';

export function useAnime(filters: AnimeFilters, page: number) {
    const queryKey = JSON.stringify({ filters, page });

    const loadAnime = useCallback(
        async (signal: AbortSignal) => {
            const { filters, page }: {
                filters: AnimeFilters;
                page: number;
            } = JSON.parse(queryKey);

            const result = await fetchAnime(
                {
                    ...filters,
                    offset: (page - 1) * filters.limit,
                },
                signal
            );

            return { ...result, queryKey };
        },
        [queryKey]
    );

    const { data, ...resource } = useAsyncResource(loadAnime);

    if (data && data.queryKey === queryKey) {
        if (resource.status === 'success') {
            return {
                request: resource,
                anime: data.anime,
                totalAnime: data.totalAnime,
            };
        }

        return {
            request: resource,
            anime: data.anime,
            totalAnime: 0,
        };
    }

    if (resource.status === 'success') {
        const request: RequestState = {
            ...resource,
            status: 'loading',
            loading: true,
            error: null,
        };

        return {
            request,
            anime: [],
            totalAnime: 0,
        };
    }

    return {
        request: resource,
        anime: [],
        totalAnime: 0,
    };
}
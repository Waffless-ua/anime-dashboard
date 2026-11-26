import { useCallback } from 'react';

import { useAsyncResource } from '../../../shared/hooks/useAsyncResource';

import {
    fetchAnimeTotal,
    fetchTopRatedAnime,
    fetchMostPopularAnime,
} from '../api/animeKpiApi';

import type { AnimeFilterValues } from '../types/animeFilters.types';
import type { AnimeStatsResult } from '../types/animeKpi.types';

import { useAnimeKpiComparison } from './useAnimeKpiComparison';

export function useAnimeStats(
    filter: AnimeFilterValues,
    isPending: boolean
) {
    const loadStats = useCallback(
        async (signal: AbortSignal): Promise<AnimeStatsResult> => {
            const [total, topRated, mostPopular] = await Promise.all([
                fetchAnimeTotal(filter, signal),
                fetchTopRatedAnime(filter, signal),
                fetchMostPopularAnime(filter, signal),
            ]);

            return {
                total,
                topRated,
                mostPopular,
            };
        },
        [filter]
    );

    const request = useAsyncResource(
        isPending ? null : loadStats
    );

    const changes = useAnimeKpiComparison(request.data);

    return {
        status: request.status,
        total: request.data?.total ?? null,
        topRated: request.data?.topRated ?? null,
        mostPopular: request.data?.mostPopular ?? null,
        changes,
        retry: request.reload,
    };
}
import { useCallback } from 'react';

import { useAsyncResource } from '../../../shared/hooks/useAsyncResource';

import { fetchAnimeStatusDistribution } from '../api/animeChartApi';
import type { AnimeFilterValues } from '../types/animeFilters.types';

export function useAnimeChart(
    filter: AnimeFilterValues,
    isPending: boolean
) {
    const loadChart = useCallback(
        (signal: AbortSignal) =>
            fetchAnimeStatusDistribution(filter, signal),
        [filter]
    );

    const { data, ...request } = useAsyncResource(
        isPending ? null : loadChart
    );

    return {
        points: data ?? [],
        request,
    };
}
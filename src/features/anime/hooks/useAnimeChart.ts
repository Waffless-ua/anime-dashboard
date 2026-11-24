import { useCallback } from 'react';

import { useAppSelector } from '../../../app/hooks';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { useAsyncResource } from '../../../shared/hooks/useAsyncResource';

import type { RequestState } from '../../../shared/types/async.types';

import { selectAnimeFilters } from '../store/animeQuerySlice';
import { fetchAnimeStatusDistribution } from '../api/animeChartApi';

export function useAnimeChart() {
    const filter = useAppSelector(
        state => selectAnimeFilters(state).filter
    );

    const debouncedFilter = useDebounce(filter);

    const loadChart = useCallback(
        async (signal: AbortSignal) => ({
            filter: debouncedFilter,
            points: await fetchAnimeStatusDistribution(
                debouncedFilter,
                signal
            ),
        }),
        [debouncedFilter]
    );

    const { data, ...resource } = useAsyncResource(loadChart);

    const isCurrent = data?.filter === debouncedFilter;

    const isPending =
        filter !== debouncedFilter ||
        (resource.status === 'success' && !isCurrent);

    const request: RequestState = isPending
        ? {
            ...resource,
            status: 'loading',
            loading: true,
            error: null,
        }
        : resource;

    return {
        points: data && isCurrent && !isPending
            ? data.points
            : [],
        request,
    };
}
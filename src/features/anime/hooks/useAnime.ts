import { useMemo } from 'react';

import { fetchAnime } from '../api/animeApi';

import { useAsyncResource } from '../../../shared/hooks/useAsyncResource';
import { getPageOffset } from '../../../shared/utils/getPageOffset';

import type { AnimeFilters } from '../types/animeFilters.types';

export function useAnime(
    filters: AnimeFilters,
    page: number,
    isPending = false
) {
    const loadAnime = useMemo(() => {
        if (isPending) {
            return null;
        }

        return (signal: AbortSignal) =>
            fetchAnime(
                {
                    ...filters,
                    offset: getPageOffset(page, filters.limit),
                },
                signal
            );
    }, [filters, page, isPending]);

    const { data, ...request } = useAsyncResource(loadAnime);

    return {
        request,
        anime: data?.anime ?? [],
        totalAnime: data?.totalAnime ?? 0,
    };
}
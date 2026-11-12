import { useCallback } from 'react';

import { fetchAnime } from '../api/animeApi';
import { useAnimeFilters } from './useAnimeFilters';

import { useAsyncResource } from '../../../shared/hooks/useAsyncResource';
import type { RequestState } from '../../../shared/types/async.types';

export function useAnime() {
    const {
        debouncedQuery,
        page,
        pageIndex,
    } = useAnimeFilters();

    const queryKey = JSON.stringify(debouncedQuery);

    const loadAnime = useCallback(
        async (signal: AbortSignal) => {
            const result = await fetchAnime(
                {
                    ...debouncedQuery,
                    offset: pageIndex * debouncedQuery.limit,
                },
                signal
            );

            return {
                ...result,
                queryKey,
                page,
            };
        },
        [debouncedQuery, queryKey, page, pageIndex]
    );

    const { data, ...resource } = useAsyncResource(loadAnime);

    const currentData =
        data?.queryKey === queryKey && data?.page === page
            ? data
            : null;

    const request: RequestState =
        resource.status === 'success' && currentData === null
            ? {
                ...resource,
                status: 'loading',
                loading: true,
                error: null,
            }
            : resource;

    const anime = currentData?.anime ?? [];
    const totalAnime = currentData?.totalAnime ?? 0;

    const hasNextPage =
        request.status === 'success' &&
        page * debouncedQuery.limit < totalAnime;

    return {
        request,
        anime,
        hasNextPage,
    };
}
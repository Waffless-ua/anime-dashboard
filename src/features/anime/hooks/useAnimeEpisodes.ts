import { useCallback } from 'react';

import { fetchAnimeEpisodes } from '../api/animeEpisodesApi';
import { useAsyncResource } from '../../../shared/hooks/useAsyncResource';

export function useAnimeEpisodes(animeId: string, page: number) {
    const loadEpisodes = useCallback(
        (signal: AbortSignal) =>
            fetchAnimeEpisodes(animeId, page, signal),
        [animeId, page]
    );

    const { data, ...request } = useAsyncResource(loadEpisodes);

    return {
        episodes: data?.episodes ?? [],
        hasNextPage: data?.hasNextPage ?? false,
        request,
    };
}
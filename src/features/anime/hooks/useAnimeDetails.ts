import { useCallback } from 'react';

import { fetchAnimeById } from '../api/animeApi';
import { useAsyncResource } from '../../../shared/hooks/useAsyncResource';

export function useAnimeDetails(id: string | undefined) {
    const loadAnime = useCallback(
        (signal: AbortSignal) => {
            if (!id) {
                return Promise.reject(
                    new Error('Не вказано ID аніме.')
                );
            }

            return fetchAnimeById(id, signal);
        },
        [id]
    );

    const { data, ...request } = useAsyncResource(loadAnime);

    return {
        anime: data,
        request,
    };
}
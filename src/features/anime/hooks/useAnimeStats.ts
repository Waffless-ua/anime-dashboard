import { useEffect, useRef, useState } from 'react';
import { useAsyncResource } from '../../../shared/hooks/useAsyncResource';
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage';
import { fetchAnimeTotal, fetchTopRatedAnime, fetchMostPopularAnime } from '../api/animeKpiApi';
import { ANIME_KPI_STORAGE_KEY, EMPTY_KPI_CHANGES } from '../constants/anime.constants';
import type { AnimeKpiSnapshot, AnimeKpiChanges } from '../types/animeKpi.types';
import { createAnimeKpiSnapshot } from '../services/createAnimeKpiSnapshot';
import { calculateAnimeKpiChanges } from '../services/calculateAnimeKpiChanges';

export function useAnimeStats() {
    const total = useAsyncResource(fetchAnimeTotal);
    const topRated = useAsyncResource(fetchTopRatedAnime);
    const mostPopular = useAsyncResource(fetchMostPopularAnime);

    const [savedSnapshot, setSavedSnapshot] =
        useLocalStorage<AnimeKpiSnapshot | null>(
            ANIME_KPI_STORAGE_KEY,
            null
        );

    const [changes, setChanges] = useState<AnimeKpiChanges>(EMPTY_KPI_CHANGES);

    const lastProcessed = useRef<
        | {
        total: typeof total.data;
        topRated: typeof topRated.data;
        mostPopular: typeof mostPopular.data;
    } | undefined>(undefined);

    useEffect(() => {
        if ( total.status !== 'success' || topRated.status !== 'success' || mostPopular.status !== 'success') {
            return;
        }

        const previousProcessing = lastProcessed.current;

        if (
            previousProcessing?.total === total.data &&
            previousProcessing?.topRated === topRated.data &&
            previousProcessing?.mostPopular === mostPopular.data
        ) {
            return;
        }

        lastProcessed.current = {
            total: total.data,
            topRated: topRated.data,
            mostPopular: mostPopular.data,
        };

        const current = createAnimeKpiSnapshot(
            total.data,
            mostPopular.data,
            topRated.data
        );

        setChanges(
            calculateAnimeKpiChanges(current, savedSnapshot)
        );

        setSavedSnapshot(current);
    }, [
            total.status,
            total.data,
            topRated.status,
            topRated.data,
            mostPopular.status,
            mostPopular.data,
            savedSnapshot,
            setSavedSnapshot,
        ]);

    const retry = () => {
        total.reload();
        topRated.reload();
        mostPopular.reload();
    };

    return { total, topRated, mostPopular, changes, retry,
        lastUpdated: savedSnapshot?.savedAt ?? null };
}

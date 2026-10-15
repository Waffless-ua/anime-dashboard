import { useEffect, useRef, useState } from 'react';

import {
    fetchAnime,
    fetchTopRatedAnime,
    fetchMostPopularAnime,
} from '../api/animeApi';

import { useAsyncResource } from '../../../shared/hooks/useAsyncResource';
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage';

import type {
    AnimeKpiSnapshot,
    AnimeKpiChanges,
} from '../types/animeKpi.types';

import { createAnimeKpiSnapshot } from '../utils/createAnimeKpiSnapshot';
import { calculateAnimeKpiChanges } from '../utils/calculateAnimeKpiChanges';

const STORAGE_KEY = 'anime-kpi-snapshot';

export function useAnime() {
    const list = useAsyncResource(fetchAnime, {
        keepPreviousData: true,
    });

    const topRated = useAsyncResource(fetchTopRatedAnime);
    const mostPopular = useAsyncResource(fetchMostPopularAnime);

    const anime = list.data?.anime ?? [];

    const [savedSnapshot, setSavedSnapshot] =
        useLocalStorage<AnimeKpiSnapshot | null>(
            STORAGE_KEY,
            null
        );

    const [changes, setChanges] = useState<AnimeKpiChanges>({
        totalAnime: null,
        mostPopular: null,
        topRated: null,
    });

    const lastProcessed = useRef<
        | {
        list: typeof list.data;
        topRated: typeof topRated.data;
        mostPopular: typeof mostPopular.data;
    } | undefined>(undefined);

    useEffect(() => {
        if ( list.status !== 'success' || topRated.status !== 'success' || mostPopular.status !== 'success') {
            return;
        }

        const previousProcessing = lastProcessed.current;

        if (
            previousProcessing?.list === list.data &&
            previousProcessing?.topRated === topRated.data &&
            previousProcessing?.mostPopular === mostPopular.data
        ) {
            return;
        }

        lastProcessed.current = {
            list: list.data,
            topRated: topRated.data,
            mostPopular: mostPopular.data,
        };

        const current = createAnimeKpiSnapshot(
            list.data.totalAnime,
            mostPopular.data,
            topRated.data
        );

        setChanges(
            calculateAnimeKpiChanges(current, savedSnapshot)
        );

        setSavedSnapshot(current);
    }, [
            list.status,
            list.data,
            topRated.status,
            topRated.data,
            mostPopular.status,
            mostPopular.data,
            savedSnapshot,
            setSavedSnapshot,
        ]);

    const retry = () => {
        list.reload();
        topRated.reload();
        mostPopular.reload();
    };

    return {
        list,
        topRated,
        mostPopular,
        anime,
        retry,
        changes,
        lastUpdated: savedSnapshot?.savedAt ?? null,
    };
}
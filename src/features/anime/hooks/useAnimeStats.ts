import { useCallback, useEffect, useRef, useState } from 'react';

import { useAsyncResource } from '../../../shared/hooks/useAsyncResource';
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage';

import {
    fetchAnimeTotal,
    fetchTopRatedAnime,
    fetchMostPopularAnime,
} from '../api/animeKpiApi';

import {
    ANIME_KPI_STORAGE_KEY,
    EMPTY_KPI_CHANGES,
} from '../constants/anime.constants';

import type { Anime } from '../types/anime.types';
import type { AnimeQuery } from '../types/animeApi.types';
import type {
    AnimeKpiSnapshot,
    AnimeKpiChanges,
} from '../types/animeKpi.types';

import { createAnimeKpiSnapshot } from '../services/createAnimeKpiSnapshot';
import { calculateAnimeKpiChanges } from '../services/calculateAnimeKpiChanges';

interface AnimeStatsResult {
    filterKey: string;
    total: number;
    topRated: Anime | null;
    mostPopular: Anime | null;
}

interface StatsComparison {
    result: AnimeStatsResult | null;
    changes: AnimeKpiChanges;
}

export function useAnimeStats(filter: AnimeQuery['filter']) {
    const text = filter?.text ?? '';
    const status = filter?.status ?? '';

    const filterKey = JSON.stringify([text, status]);

    const loadStats = useCallback(
        async (signal: AbortSignal): Promise<AnimeStatsResult> => {
            const currentFilter = { text, status };

            const [total, topRated, mostPopular] = await Promise.all([
                fetchAnimeTotal(currentFilter, signal),
                fetchTopRatedAnime(currentFilter, signal),
                fetchMostPopularAnime(currentFilter, signal),
            ]);

            return {
                filterKey,
                total,
                topRated,
                mostPopular,
            };
        },
        [text, status, filterKey]
    );

    const request = useAsyncResource(loadStats);

    const [savedSnapshot, setSavedSnapshot] =
        useLocalStorage<AnimeKpiSnapshot | null>(
            ANIME_KPI_STORAGE_KEY,
            null
        );

    const [comparison, setComparison] = useState<StatsComparison>({
        result: null,
        changes: EMPTY_KPI_CHANGES,
    });

    const processedResult = useRef<AnimeStatsResult | null>(null);

    useEffect(() => {
        if (request.status !== 'success') {
            return;
        }

        const result = request.data;

        if (
            result.filterKey !== filterKey ||
            processedResult.current === result
        ) {
            return;
        }

        processedResult.current = result;

        const currentSnapshot = createAnimeKpiSnapshot(
            result.total,
            result.mostPopular,
            result.topRated
        );

        setComparison({
            result,
            changes: calculateAnimeKpiChanges(
                currentSnapshot,
                savedSnapshot
            ),
        });

        setSavedSnapshot(currentSnapshot);
    }, [
        request.status,
        request.data,
        filterKey,
        savedSnapshot,
        setSavedSnapshot,
    ]);

    const currentData =
        request.data?.filterKey === filterKey
            ? request.data
            : null;

    const currentStatus =
        request.status === 'success' && currentData === null
            ? 'loading'
            : request.status;

    const changes =
        currentStatus === 'success' &&
        comparison.result === currentData
            ? comparison.changes
            : EMPTY_KPI_CHANGES;

    return {
        total: {
            status: currentStatus,
            data: currentData?.total ?? null,
        },
        topRated: {
            status: currentStatus,
            data: currentData?.topRated ?? null,
        },
        mostPopular: {
            status: currentStatus,
            data: currentData?.mostPopular ?? null,
        },
        changes,
        retry: request.reload,
        lastUpdated: savedSnapshot?.savedAt ?? null,
    };
}
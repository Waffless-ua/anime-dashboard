import { useEffect, useRef, useState } from 'react';

import { useLocalStorage } from '../../../shared/hooks/useLocalStorage';

import {
    ANIME_KPI_STORAGE_KEY,
    EMPTY_KPI_CHANGES,
} from '../constants/anime.constants';

import type {
    AnimeStatsResult,
    AnimeKpiSnapshot,
    AnimeKpiChanges,
} from '../types/animeKpi.types';

import { createAnimeKpiSnapshot } from '../services/createAnimeKpiSnapshot';
import { calculateAnimeKpiChanges } from '../services/calculateAnimeKpiChanges';

interface StatsComparison {
    result: AnimeStatsResult | null;
    changes: AnimeKpiChanges;
}

export function useAnimeKpiComparison(
    result: AnimeStatsResult | null
): AnimeKpiChanges {
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
        if (result === null) {
            return;
        }

        if (processedResult.current === result) {
            return;
        }

        processedResult.current = result;

        const currentSnapshot = createAnimeKpiSnapshot(
            result.total,
            result.mostPopular,
            result.topRated
        );

        const changes = calculateAnimeKpiChanges(
            currentSnapshot,
            savedSnapshot
        );

        setComparison({
            result,
            changes,
        });

        setSavedSnapshot(currentSnapshot);
    }, [result, savedSnapshot, setSavedSnapshot]);

    if (comparison.result !== result) {
        return EMPTY_KPI_CHANGES;
    }

    return comparison.changes;
}
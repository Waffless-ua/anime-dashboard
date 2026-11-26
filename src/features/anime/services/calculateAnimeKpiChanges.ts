import type {
    AnimeKpiSnapshot,
    AnimeKpiChanges,
} from '../types/animeKpi.types';

import {
    EMPTY_KPI_CHANGES,
    KPI_RATING_PRECISION,
} from '../constants/anime.constants';

function getMostPopularChange(
    current: AnimeKpiSnapshot,
    previous: AnimeKpiSnapshot
): string {
    if (current.mostPopularId !== previous.mostPopularId) {
        return 'Новий лідер';
    }

    return 'Без змін';
}

function getTopRatedChange(
    current: AnimeKpiSnapshot,
    previous: AnimeKpiSnapshot
): number | string | null {
    if (current.topRatedId !== previous.topRatedId) {
        return 'Новий лідер';
    }

    if (
        current.topRatedRating === null ||
        previous.topRatedRating === null
    ) {
        return null;
    }

    const difference =
        current.topRatedRating - previous.topRatedRating;

    return Number(
        difference.toFixed(KPI_RATING_PRECISION)
    );
}

export function calculateAnimeKpiChanges(
    current: AnimeKpiSnapshot,
    previous: AnimeKpiSnapshot | null
): AnimeKpiChanges {
    if (previous === null) {
        return { ...EMPTY_KPI_CHANGES };
    }

    const totalAnime =
        current.totalAnime - previous.totalAnime;

    if (
        current.totalAnime === 0 ||
        previous.totalAnime === 0
    ) {
        return {
            totalAnime,
            mostPopular: null,
            topRated: null,
        };
    }

    return {
        totalAnime,
        mostPopular: getMostPopularChange(current, previous),
        topRated: getTopRatedChange(current, previous),
    };
}
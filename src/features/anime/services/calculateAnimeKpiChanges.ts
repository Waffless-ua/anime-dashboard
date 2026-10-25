import type {
    AnimeKpiSnapshot,
    AnimeKpiChanges,
} from '../types/animeKpi.types.ts';

export function calculateAnimeKpiChanges(
    current: AnimeKpiSnapshot,
    previous: AnimeKpiSnapshot | null
): AnimeKpiChanges {
    if (previous === null) {
        return {
            totalAnime: null,
            mostPopular: null,
            topRated: null,
        };
    }

    let topRatedChange: number | string | null = null;

    if (current.topRatedId !== previous.topRatedId) {
        topRatedChange = 'Новий лідер';
    } else if (
        current.topRatedRating !== null &&
        previous.topRatedRating !== null
    ) {
        topRatedChange = Number((
            current.topRatedRating - previous.topRatedRating
        ).toFixed(2));
    }

    if (current.totalAnime === 0 || previous.totalAnime === 0) {
        return {
            totalAnime: current.totalAnime - previous.totalAnime,
            mostPopular: null,
            topRated: null,
        };
    }

    return {
        totalAnime: current.totalAnime - previous.totalAnime,
        mostPopular:
            current.mostPopularId !== previous.mostPopularId
                ? 'Новий лідер'
                : 'Без змін',
        topRated: topRatedChange,
    };
}
import type { Anime } from '../types/anime.types';
import type { AnimeKpiSnapshot } from '../types/animeKpi.types';
import getRatingAnime from './getRatingAnime';

export function createAnimeKpiSnapshot(
    totalAnime: number,
    mostPopular: Anime | null,
    topRated: Anime | null
): AnimeKpiSnapshot {
    return {
        totalAnime,
        mostPopularId: mostPopular?.id ?? null,
        topRatedId: topRated?.id ?? null,
        topRatedRating: topRated
            ? getRatingAnime(topRated)
            : null,
        savedAt: new Date().toISOString(),
    };
}
import type { Anime } from '../types/anime.types.ts';
import type { AnimeKpiSnapshot } from '../types/animeKpi.types.ts';
import getRatingAnime from '../utils/getRatingAnime.ts';

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
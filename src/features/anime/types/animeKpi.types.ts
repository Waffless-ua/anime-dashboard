import type { Anime } from './anime.types';

export interface AnimeStatsResult {
    total: number;
    topRated: Anime | null;
    mostPopular: Anime | null;
}

export interface AnimeKpiSnapshot {
    totalAnime: number;
    mostPopularId: string | null;
    topRatedId: string | null;
    topRatedRating: number | null;
}

export interface AnimeKpiChanges {
    totalAnime: number | null;
    mostPopular: string | null;
    topRated: number | string | null;
}
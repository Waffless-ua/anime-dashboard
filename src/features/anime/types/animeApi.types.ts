import type { Anime } from './anime.types';

export type AnimeSortField =
    | 'popularityRank'
    | 'ratingRank'
    | 'startDate'
    | 'createdAt';

export type SortDirection = 'asc' | 'desc';

export interface AnimeQuery {
    sort?: AnimeSortField;
    direction?: SortDirection;

    filter?: {
        status?: string;
        season?: string;
        seasonYear?: string;
        text?: string;
    };

    limit?: number;
}

export interface AnimeApiResult {
    anime: Anime[];
    totalAnime: number;
}
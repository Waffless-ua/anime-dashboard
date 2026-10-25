import type { Anime } from './anime.types';

export type AnimeSortField =
    | 'popularityRank'
    | 'ratingRank'
    | 'averageRating'
    | 'startDate'
    | 'createdAt';

export type SortDirection = 'asc' | 'desc';

export interface AnimeQuery {
    sort?: AnimeSortField;
    direction?: SortDirection;

    filter?: {
        status?: string;
        text?: string;
    };

    limit?: number;
}

export interface AnimeApiResult {
    anime: Anime[];
    totalAnime: number;
}
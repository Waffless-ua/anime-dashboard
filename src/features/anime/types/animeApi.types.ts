import type { Anime } from './anime.types';
import type { AnimeFilterValues } from './animeFilters.types';

export type AnimeSortField =
    | 'popularityRank'
    | 'ratingRank'
    | 'startDate'
    | 'createdAt';

export type SortDirection = 'asc' | 'desc';

export interface AnimeQuery {
    filter?: Partial<AnimeFilterValues>;
    sort?: AnimeSortField;
    direction?: SortDirection;
    limit?: number;
}

export interface AnimeApiResult {
    anime: Anime[];
    totalAnime: number;
}
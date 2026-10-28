import type { Anime } from './anime.types';
import type {
    AnimeFilterValues,
    AnimeSortField,
    SortDirection,
} from './animeFilters.types';

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
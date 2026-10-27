import type {
    AnimeSortField,
    SortDirection,
} from './animeApi.types';

export interface AnimeFilterValues {
    text: string;
    status: string;
    season: string;
    seasonYear: string;
    subtype: string;
}

export interface AnimeFilters {
    filter: AnimeFilterValues;
    sort: AnimeSortField;
    direction: SortDirection;
    limit: number;
}
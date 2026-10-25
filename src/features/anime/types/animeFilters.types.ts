import type {
    AnimeSortField,
    SortDirection,
} from './animeApi.types';

export interface AnimeFilters {
    search: string;
    status: string;
    sort: AnimeSortField;
    direction: SortDirection;
    limit: number;
}
export type AnimeSortField =
    | 'popularityRank'
    | 'ratingRank'
    | 'startDate'
    | 'createdAt';

export type SortDirection = 'asc' | 'desc';

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
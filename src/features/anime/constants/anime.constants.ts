import type { AnimeKpiChanges } from '../types/animeKpi.types';
import type {
    AnimeSortField,
    SortDirection,
} from '../types/animeApi.types';

export const ANIME_PAGE_SIZE = 20;
export const ANIME_KPI_STORAGE_KEY = 'anime-kpi-snapshot';

export const DEFAULT_ANIME_SORT: AnimeSortField = 'popularityRank';
export const DEFAULT_SORT_DIRECTION: SortDirection = 'asc';

export const ANIME_STATUS_LABELS: Readonly<Record<string, string>> = {
    current: 'Виходить',
    finished: 'Завершено',
    upcoming: 'Очікується',
    tba: 'Дата не оголошена',
    unreleased: 'Не випущено',
};

export const ANIME_STATUS_OPTIONS = Object.entries(
    ANIME_STATUS_LABELS
).map(([value, label]) => ({
    value,
    label,
}));

export const ANIME_SORTING_OPTIONS: ReadonlyArray<{
    value: AnimeSortField;
    label: string;
}> = [
    { value: 'popularityRank', label: 'Популярністю' },
    { value: 'averageRating', label: 'Середнім рейтингом' },
    { value: 'startDate', label: 'Датою виходу' },
    { value: 'createdAt', label: 'Датою додавання' },
];

export const EMPTY_KPI_CHANGES: AnimeKpiChanges = {
    totalAnime: null,
    mostPopular: null,
    topRated: null,
};
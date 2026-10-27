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
    { value: 'ratingRank', label: 'Рейтингом'},
    { value: 'startDate', label: 'Датою виходу' },
    { value: 'createdAt', label: 'Датою додавання' },
];

export const ANIME_SEASON_OPTIONS = [
    { value: '', label: 'Всі' },
    { value: 'winter', label: 'Зима' },
    { value: 'spring', label: 'Весна' },
    { value: 'summer', label: 'Літо' },
    { value: 'fall', label: 'Осінь' },
];

const FIRST_ANIME_YEAR = 1900;
const LAST_ANIME_YEAR = new Date().getFullYear() + 1;

export const ANIME_YEAR_OPTIONS = [
    { value: '', label: 'Всі' },
    ...Array.from(
        { length: LAST_ANIME_YEAR - FIRST_ANIME_YEAR + 1 },
        (_, index) => {
            const year = LAST_ANIME_YEAR - index;

            return {
                value: String(year),
                label: String(year),
            };
        }
    ),
];


export const EMPTY_KPI_CHANGES: AnimeKpiChanges = {
    totalAnime: null,
    mostPopular: null,
    topRated: null,
};
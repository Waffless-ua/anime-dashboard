import type { AnimeKpiChanges } from '../types/animeKpi.types';
import type { AnimeFilters, AnimeSortField, SortDirection } from "../types/animeFilters.types.ts";
import type { SelectOption } from "../../../shared/types/select.types.ts";

export const ANIME_PAGE_SIZE_MIN = 1;
export const ANIME_PAGE_SIZE_MAX = 20;
export const ANIME_KPI_STORAGE_KEY = 'anime-kpi-snapshot';

export const DEFAULT_ANIME_SORT: AnimeSortField = 'popularityRank';
export const DEFAULT_SORT_DIRECTION: SortDirection = 'asc';

export const DIRECTION_OPTIONS: readonly SelectOption<SortDirection>[] = [
    { value: 'asc', label: 'За зростанням' },
    { value: 'desc', label: 'За спаданням' },
];

export const ANIME_STATUS_OPTIONS: readonly SelectOption[] = [
    { value: '', label: 'Всі' },
    { value: 'current', label: 'Виходить' },
    { value: 'finished', label: 'Завершено' },
    { value: 'upcoming', label: 'Очікується' },
    { value: 'tba', label: 'Дата не оголошена' },
    { value: 'unreleased', label: 'Не випущено' },
];


export const ANIME_SORTING_OPTIONS: readonly SelectOption<AnimeSortField>[] = [
    { value: 'popularityRank', label: 'Популярністю' },
    { value: 'ratingRank', label: 'Рейтингом'},
    { value: 'startDate', label: 'Датою виходу' },
    { value: 'createdAt', label: 'Датою додавання' },
];

export const ANIME_SEASON_OPTIONS: readonly SelectOption[] = [
    { value: '', label: 'Всі' },
    { value: 'winter', label: 'Зима' },
    { value: 'spring', label: 'Весна' },
    { value: 'summer', label: 'Літо' },
    { value: 'fall', label: 'Осінь' },
];

export const ANIME_SUBTYPE_OPTIONS: readonly SelectOption[] = [
    { value: '', label: 'Всі' },
    { value: 'ONA', label: 'ONA' },
    { value: 'OVA', label: 'OVA' },
    { value: 'TV', label: 'Телесеріал' },
    { value: 'movie', label: 'Фільм' },
    { value: 'music', label: 'Музичне відео' },
    { value: 'special', label: 'Спецвипуск' },
];


export const FIRST_ANIME_YEAR = 1900;
export const LAST_ANIME_YEAR = new Date().getFullYear() + 1;

export const DEFAULT_ANIME_FILTERS: AnimeFilters = {
    filter: {
        text: '',
        status: '',
        season: '',
        seasonYear: '',
        subtype: '',
    },
    sort: DEFAULT_ANIME_SORT,
    direction: DEFAULT_SORT_DIRECTION,
    limit: ANIME_PAGE_SIZE_MAX,
};

export const EMPTY_KPI_CHANGES: AnimeKpiChanges = {
    totalAnime: null,
    mostPopular: null,
    topRated: null,
};
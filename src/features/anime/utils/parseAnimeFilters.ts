import {
    DEFAULT_ANIME_FILTERS,
    ANIME_PAGE_SIZE_MIN,
    ANIME_PAGE_SIZE_MAX,
    ANIME_STATUS_OPTIONS,
    ANIME_SEASON_OPTIONS,
    ANIME_SUBTYPE_OPTIONS,
    ANIME_SORTING_OPTIONS,
    DIRECTION_OPTIONS,
} from '../constants/anime.constants';

import type { AnimeFilters } from '../types/animeFilters.types';

export function parseAnimeFilters(params: URLSearchParams): AnimeFilters {
    const defaults = DEFAULT_ANIME_FILTERS;
    const limit = Number(params.get('limit') ?? defaults.limit);

    return {
        filter: {
            text: params.get('text') ?? defaults.filter.text,
            status: ANIME_STATUS_OPTIONS.find(
                option => option.value === params.get('status')
            )?.value ?? defaults.filter.status,
            season: ANIME_SEASON_OPTIONS.find(
                option => option.value === params.get('season')
            )?.value ?? defaults.filter.season,
            seasonYear: params.get('seasonYear') ?? defaults.filter.seasonYear,
            subtype: ANIME_SUBTYPE_OPTIONS.find(
                option => option.value === params.get('subtype')
            )?.value ?? defaults.filter.subtype,
        },
        sort: ANIME_SORTING_OPTIONS.find(
            option => option.value === params.get('sort')
        )?.value ?? defaults.sort,
        direction: DIRECTION_OPTIONS.find(
            option => option.value === params.get('direction')
        )?.value ?? defaults.direction,
        limit: Number.isInteger(limit) &&
        limit >= ANIME_PAGE_SIZE_MIN &&
        limit <= ANIME_PAGE_SIZE_MAX
            ? limit
            : defaults.limit,
    };
}
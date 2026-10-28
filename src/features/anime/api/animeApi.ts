import { ANIME_PAGE_SIZE_MAX, ANIME_PAGE_SIZE_MIN, DEFAULT_SORT_DIRECTION } from '../constants/anime.constants';

import type {
    AnimeQuery,
    AnimeApiResult,
} from '../types/animeApi.types';

import isAnime from '../utils/isAnime';

const API_BASE_URL = import.meta.env.VITE_KITSU_API_URL;

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

export async function fetchAnime(
    query: AnimeQuery = {},
    signal?: AbortSignal
): Promise<AnimeApiResult> {
    if (!API_BASE_URL) {
        throw new Error('Kitsu API URL is not configured');
    }

    const {
        sort,
        direction = DEFAULT_SORT_DIRECTION,
        filter,
        limit = ANIME_PAGE_SIZE_MAX,
    } = query;

    const hasValidLimit =
        Number.isInteger(limit) &&
        limit >= ANIME_PAGE_SIZE_MIN &&
        limit <= ANIME_PAGE_SIZE_MAX;

    if (!hasValidLimit) {
        throw new Error(
            `Anime limit must be between ${ANIME_PAGE_SIZE_MIN} and ${ANIME_PAGE_SIZE_MAX}`
        );
    }

    const baseUrl = API_BASE_URL.replace(/\/$/, '');
    const url = new URL(`${baseUrl}/anime`);

    url.searchParams.set('page[limit]', String(limit));

    if (sort) {
        const sortValue = direction === 'desc' ? `-${sort}` : sort;

        url.searchParams.set('sort', sortValue);
    }

    for (const [name, value] of Object.entries(filter ?? {})) {
        const normalizedValue = value?.trim();

        if (normalizedValue) {
            url.searchParams.set(`filter[${name}]`, normalizedValue);
        }
    }

    const response = await fetch(url.toString(), {
        headers: {
            Accept: 'application/vnd.api+json',
        },
        signal,
    });

    if (!response.ok) {
        throw new Error(
            `Failed to fetch anime: HTTP ${response.status}`
        );
    }

    const payload: unknown = await response.json();

    if (!isRecord(payload)) {
        throw new Error('Invalid API response');
    }

    const { data, meta } = payload;

    if (!Array.isArray(data)) {
        throw new Error('API response data must be an array');
    }

    if (!data.every(isAnime)) {
        const invalidRecords = data.filter(item => !isAnime(item));

        console.error(
            'Anime records that failed validation:',
            invalidRecords
        );

        throw new Error('Invalid anime data structure');
    }

    if (!isRecord(meta)) {
        throw new Error('Invalid API metadata');
    }

    const totalAnime = meta.count;

    if (
        typeof totalAnime !== 'number' ||
        !Number.isFinite(totalAnime)
    ) {
        throw new Error('Invalid anime total count');
    }

    return {
        anime: data,
        totalAnime,
    };
}
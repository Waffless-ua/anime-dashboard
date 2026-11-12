import { ANIME_PAGE_SIZE_MAX, ANIME_PAGE_SIZE_MIN, DEFAULT_SORT_DIRECTION } from '../constants/anime.constants';

import type {
    AnimeQuery,
    AnimeApiResult,
} from '../types/animeApi.types';

import isAnime from '../utils/isAnime';
import type { AnimeDetailsData } from '../types/animeDetails.types';

import {
    getNullableText,
    getPositiveNumber, isRecord,
} from '../utils/apiValues';

const API_BASE_URL = import.meta.env.VITE_KITSU_API_URL;

const DEFAULT_OFFSET = 0;

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
        offset = DEFAULT_OFFSET,
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

    if (!Number.isInteger(offset) || offset < DEFAULT_OFFSET) {
        throw new Error('Anime offset must be a non-negative integer');
    }

    const baseUrl = API_BASE_URL.replace(/\/$/, '');
    const url = new URL(`${baseUrl}/anime`);

    if (sort) {
        const sortValue = direction === 'desc' ? `-${sort}` : sort;

        url.searchParams.set('sort', sortValue);
    }

    let hasActiveFilter = false;

    for (const [name, value] of Object.entries(filter ?? {})) {
        const normalizedValue = value?.trim();

        if (normalizedValue) {
            url.searchParams.set(`filter[${name}]`, normalizedValue);
            hasActiveFilter = true;
        }
    }

    // Kitsu can and will return the same results for the first two pages of a filtered query.
    // TODO: Remove this offset adjustment once Kitsu returns distinct pages.
    const apiOffset = hasActiveFilter && offset > 0
        ? offset + limit
        : offset;


    url.searchParams.set('page[limit]', String(limit));
    url.searchParams.set('page[offset]', String(apiOffset));

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


export async function fetchAnimeById(
    id: string,
    signal?: AbortSignal
): Promise<AnimeDetailsData> {
    if (!API_BASE_URL) {
        throw new Error('API URL is not configured');
    }

    const baseUrl = API_BASE_URL.replace(/\/$/, '');
    const url = `${baseUrl}/anime/${encodeURIComponent(id)}`;

    const response = await fetch(url, {
        headers: {
            Accept: 'application/vnd.api+json',
        },
        signal,
    });

    if (response.status === 404) {
        throw new Error('Аніме не знайдено.');
    }

    if (!response.ok) {
        throw new Error(
            `Не вдалося завантажити аніме: HTTP ${response.status}`
        );
    }

    const payload: unknown = await response.json();

    if (!isRecord(payload) || !isAnime(payload.data)) {
        throw new Error('Некоректна структура даних аніме.');
    }

    const attributes: Record<string, unknown> =
        payload.data.attributes;

    return {
        ...payload.data,
        details: {
            synopsis: getNullableText(attributes.synopsis),
            endDate: getNullableText(attributes.endDate),
            episodeLength: getPositiveNumber(attributes.episodeLength),
            ageRating: getNullableText(attributes.ageRating),
            ageRatingGuide: getNullableText(attributes.ageRatingGuide),
        },
    };
}
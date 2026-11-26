import {
    ANIME_PAGE_SIZE_MAX,
    ANIME_PAGE_SIZE_MIN,
    DEFAULT_SORT_DIRECTION,
} from '../constants/anime.constants';

import type {
    AnimeQuery,
    AnimeApiResult,
} from '../types/animeApi.types';

import type { AnimeDetailsData } from '../types/animeDetails.types';

import isAnime from '../utils/isAnime';

import {
    getNullableText,
    getPositiveNumber,
    isRecord,
} from '../utils/apiValues';

import {
    getAnimeYearError,
    isValidAnimePageSize,
} from '../utils/animeValidation';

const API_BASE_URL = import.meta.env.VITE_KITSU_API_URL;

const DEFAULT_OFFSET = 0;
const HTTP_STATUS_NOT_FOUND = 404;

function createKitsuUrl(path: string): URL {
    if (!API_BASE_URL) {
        throw new Error('Kitsu API URL is not configured');
    }

    const baseUrl = API_BASE_URL.replace(/\/+$/, '');

    return new URL(`${baseUrl}${path}`);
}

function fetchKitsu(
    url: URL,
    signal?: AbortSignal
): Promise<Response> {
    return fetch(url.toString(), {
        headers: {
            Accept: 'application/vnd.api+json',
        },
        signal,
    });
}

function createAnimeListUrl(query: AnimeQuery): URL {
    const {
        sort,
        direction = DEFAULT_SORT_DIRECTION,
        filter,
        limit = ANIME_PAGE_SIZE_MAX,
        offset = DEFAULT_OFFSET,
    } = query;

    if (!isValidAnimePageSize(limit)) {
        throw new Error(
            `Anime limit must be between ${ANIME_PAGE_SIZE_MIN} and ${ANIME_PAGE_SIZE_MAX}`
        );
    }

    const yearError = getAnimeYearError(filter?.seasonYear);

    if (yearError) {
        throw new Error(yearError);
    }

    if (!Number.isSafeInteger(offset) || offset < DEFAULT_OFFSET) {
        throw new Error('Anime offset must be a non-negative integer');
    }

    const url = createKitsuUrl('/anime');

    if (sort) {
        const sortValue = direction === 'desc'
            ? `-${sort}`
            : sort;

        url.searchParams.set('sort', sortValue);
    }

    let hasActiveFilter = false;

    for (const [name, value] of Object.entries(filter ?? {})) {
        const normalizedValue = value?.trim();

        if (!normalizedValue) {
            continue;
        }

        url.searchParams.set(`filter[${name}]`, normalizedValue);
        hasActiveFilter = true;
    }

    // Kitsu can and will return the same results for the first two pages of a filtered query.
    // TODO: Remove this offset adjustment once Kitsu returns distinct pages.
    const apiOffset = hasActiveFilter && offset > 0
        ? offset + limit
        : offset;

    if (!Number.isSafeInteger(apiOffset)) {
        throw new Error('Invalid API offset');
    }

    url.searchParams.set('page[limit]', String(limit));
    url.searchParams.set('page[offset]', String(apiOffset));

    return url;
}

function parseAnimeList(payload: unknown): AnimeApiResult {
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
        !Number.isSafeInteger(totalAnime) ||
        totalAnime < 0
    ) {
        throw new Error('Invalid anime total count');
    }

    return {
        anime: data,
        totalAnime,
    };
}

function parseAnimeDetails(payload: unknown): AnimeDetailsData {
    if (!isRecord(payload) || !isAnime(payload.data)) {
        throw new Error('Некоректна структура даних аніме.');
    }

    const anime = payload.data;

    const attributes: Record<string, unknown> = anime.attributes;

    return {
        ...anime,
        details: {
            synopsis: getNullableText(attributes.synopsis),
            endDate: getNullableText(attributes.endDate),
            episodeLength: getPositiveNumber(attributes.episodeLength),
            ageRating: getNullableText(attributes.ageRating),
            ageRatingGuide: getNullableText(attributes.ageRatingGuide),
        },
    };
}

export async function fetchAnime(
    query: AnimeQuery = {},
    signal?: AbortSignal
): Promise<AnimeApiResult> {
    const url = createAnimeListUrl(query);
    const response = await fetchKitsu(url, signal);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch anime: HTTP ${response.status}`
        );
    }

    const payload: unknown = await response.json();

    return parseAnimeList(payload);
}

export async function fetchAnimeById(
    id: string,
    signal?: AbortSignal
): Promise<AnimeDetailsData> {
    if (!id.trim()) {
        throw new Error('Не вказано ID аніме.');
    }

    const url = createKitsuUrl(
        `/anime/${encodeURIComponent(id)}`
    );

    const response = await fetchKitsu(url, signal);

    if (response.status === HTTP_STATUS_NOT_FOUND) {
        throw new Error('Аніме не знайдено.');
    }

    if (!response.ok) {
        throw new Error(
            `Не вдалося завантажити аніме: HTTP ${response.status}`
        );
    }

    const payload: unknown = await response.json();

    return parseAnimeDetails(payload);
}
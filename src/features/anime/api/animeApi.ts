import type { Anime } from '../types/anime.types';
import isAnime from '../utils/isAnime';

interface AnimeApiResult {
    anime: Anime[];
    totalAnime: number;
}

const API_BASE_URL = import.meta.env.VITE_KITSU_API_URL;

const ANIME_PAGE_LIMIT = 20;

function isRecord(
    value: unknown
): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

async function requestAnime(
    params: URLSearchParams,
    signal?: AbortSignal
): Promise<AnimeApiResult> {
    if (!API_BASE_URL) {
        throw new Error('Kitsu API URL is not configured');
    }

    const url = new URL(
        `${API_BASE_URL.replace(/\/$/, '')}/anime`
    );

    url.search = params.toString();

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

    if (
        !Array.isArray(payload.data) ||
        !payload.data.every(isAnime)
    ) {
        throw new Error('Invalid anime data structure');
    }

    if (
        !isRecord(payload.meta) ||
        typeof payload.meta.count !== 'number' ||
        !Number.isFinite(payload.meta.count)
    ) {
        throw new Error('Invalid API metadata');
    }

    return {
        anime: payload.data,
        totalAnime: payload.meta.count,
    };
}

export function fetchAnime(
    signal?: AbortSignal
): Promise<AnimeApiResult> {
    const params = new URLSearchParams();

    params.set('page[limit]', String(ANIME_PAGE_LIMIT));

    return requestAnime(params, signal);
}

async function fetchRankedAnime(
    sortField: string,
    signal?: AbortSignal
): Promise<Anime | null> {
    const params = new URLSearchParams();

    params.set('sort', sortField);
    params.set('page[limit]', '1');

    const result = await requestAnime(params, signal);

    return result.anime[0] ?? null;
}

export function fetchMostPopularAnime(
    signal?: AbortSignal
): Promise<Anime | null> {
    return fetchRankedAnime('popularityRank', signal);
}

export function fetchTopRatedAnime(
    signal?: AbortSignal
): Promise<Anime | null> {
    return fetchRankedAnime('ratingRank', signal);
}

import type {
    AnimeEpisode,
    AnimeEpisodesPage,
} from '../types/animeDetails.types';

import {
    isRecord,
    getNullableText,
    getPositiveNumber,
} from '../utils/apiValues';

export const EPISODES_PAGE_SIZE = 20;

const API_BASE_URL = import.meta.env.VITE_KITSU_API_URL;

function parseEpisode(value: unknown): AnimeEpisode {
    if (
        !isRecord(value) ||
        typeof value.id !== 'string' ||
        !isRecord(value.attributes)
    ) {
        throw new Error('Некоректна структура даних серії.');
    }

    const attributes = value.attributes;

    return {
        id: value.id,
        number: getPositiveNumber(attributes.number),
        title: getNullableText(attributes.canonicalTitle),
        length: getPositiveNumber(attributes.length),
        airdate: getNullableText(attributes.airdate),
    };
}

export async function fetchAnimeEpisodes(
    animeId: string,
    page: number,
    signal?: AbortSignal
): Promise<AnimeEpisodesPage> {
    if (!API_BASE_URL) {
        throw new Error('API URL is not configured');
    }

    const baseUrl = API_BASE_URL.replace(/\/$/, '');
    const url = new URL(
        `${baseUrl}/anime/${encodeURIComponent(animeId)}/episodes`
    );

    url.searchParams.set('sort', 'number');
    url.searchParams.set('page[limit]', String(EPISODES_PAGE_SIZE));
    url.searchParams.set(
        'page[offset]',
        String((page - 1) * EPISODES_PAGE_SIZE)
    );

    const response = await fetch(url, {
        headers: {
            Accept: 'application/vnd.api+json',
        },
        signal,
    });

    if (!response.ok) {
        const errorBody = await response.text();

        console.error('Помилка завантаження серій:', {
            url: url.toString(),
            status: response.status,
            body: errorBody,
        });

        throw new Error(
            `Не вдалося завантажити серії: HTTP ${response.status}`
        );
    }

    const payload: unknown = await response.json();

    if (!isRecord(payload) || !Array.isArray(payload.data)) {
        throw new Error('Некоректна відповідь API зі списком серій.');
    }

    return {
        episodes: payload.data.map(parseEpisode),
        hasNextPage:
            isRecord(payload.links) &&
            typeof payload.links.next === 'string' &&
            payload.links.next.length > 0,
    };
}
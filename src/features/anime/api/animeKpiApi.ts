import { fetchAnime } from './animeApi';

import { KPI_QUERY_LIMIT } from '../constants/anime.constants';

import type { Anime } from '../types/anime.types';
import type { AnimeQuery } from '../types/animeApi.types';
import type { AnimeSortField } from '../types/animeFilters.types';

type AnimeFilter = AnimeQuery['filter'];

async function fetchLeadingAnime(
    filter: AnimeFilter,
    sort: AnimeSortField,
    signal: AbortSignal
): Promise<Anime | null> {
    const result = await fetchAnime(
        {
            filter,
            sort,
            direction: 'asc',
            limit: KPI_QUERY_LIMIT,
        },
        signal
    );

    return result.anime[0] ?? null;
}

export async function fetchAnimeTotal(
    filter: AnimeFilter,
    signal: AbortSignal
): Promise<number> {
    const result = await fetchAnime(
        {
            filter,
            limit: KPI_QUERY_LIMIT,
        },
        signal
    );

    return result.totalAnime;
}

export function fetchTopRatedAnime(
    filter: AnimeFilter,
    signal: AbortSignal
): Promise<Anime | null> {
    return fetchLeadingAnime(
        filter,
        'ratingRank',
        signal
    );
}

export function fetchMostPopularAnime(
    filter: AnimeFilter,
    signal: AbortSignal
): Promise<Anime | null> {
    return fetchLeadingAnime(
        filter,
        'popularityRank',
        signal
    );
}
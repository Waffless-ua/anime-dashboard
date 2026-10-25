import { fetchAnime } from './animeApi';
import type { AnimeQuery } from '../types/animeApi.types';

type AnimeFilter = AnimeQuery['filter'];

export async function fetchAnimeTotal(filter: AnimeFilter, signal: AbortSignal) {
    const result = await fetchAnime(
        {filter, limit: 1,},
        signal
    );
    return result.totalAnime;
}

export async function fetchTopRatedAnime(filter: AnimeFilter, signal: AbortSignal) {
    const result = await fetchAnime(
        {filter, sort: 'ratingRank', direction: 'asc', limit: 1,},
        signal
    );
    return result.anime[0] ?? null;
}

export async function fetchMostPopularAnime(filter: AnimeFilter, signal: AbortSignal) {
    const result = await fetchAnime(
        {filter, sort: 'popularityRank', direction: 'asc', limit: 1,},
        signal
    );
    return result.anime[0] ?? null;
}
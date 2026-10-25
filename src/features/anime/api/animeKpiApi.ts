import { fetchAnime } from './animeApi';

export async function fetchAnimeTotal(signal: AbortSignal) {
    const result = await fetchAnime({ limit: 1 }, signal);
    return result.totalAnime;
}

export async function fetchTopRatedAnime(signal: AbortSignal) {
    const result = await fetchAnime({ sort: 'ratingRank', limit: 1 }, signal);
    return result.anime[0] ?? null;
}

export async function fetchMostPopularAnime(signal: AbortSignal) {
    const result = await fetchAnime({ sort: 'popularityRank', limit: 1 }, signal);
    return result.anime[0] ?? null;
}

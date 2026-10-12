import type { Anime } from '../types/anime.types';
import getRatingAnime from './getRatingAnime';

export type SortDirection = 'asc' | 'desc';

export function sortAnimeByRating(
    items: Anime[],
    direction: SortDirection
): Anime[] {
    const multiplier = direction === 'asc' ? 1 : -1;

    return [...items].sort((a, b) => {
        const aRating = getRatingAnime(a);
        const bRating = getRatingAnime(b);

        if (aRating === null && bRating === null) return 0;
        if (aRating === null) return 1;
        if (bRating === null) return -1;

        return (aRating - bRating) * multiplier;
    });
}

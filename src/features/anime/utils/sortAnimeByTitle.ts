import type { Anime } from "../types/anime.types.ts";

export type SortDirection = 'asc' | 'desc';

export function sortAnimeByTitle(
    items: Anime[],
    direction: SortDirection
): Anime[] {
    const multiplier = direction === 'asc' ? 1 : -1;

    return [...items].sort((a, b) =>
        a.attributes.canonicalTitle.localeCompare(
            b.attributes.canonicalTitle
        ) * multiplier
    );
}

import type { Anime } from "../types/anime.types.ts";

export default function getRatingAnime(anime: Anime): number | null {
    const rating = anime.attributes.averageRating;

    if (rating == null || rating.trim() === '') {
        return null;
    }

    const value = Number(rating);

    return Number.isFinite(value) ? value : null;
}
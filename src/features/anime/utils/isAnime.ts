
import type { Anime } from '../types/anime.types';

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

function isNullableString(value: unknown): value is string | null {
    return value === null || typeof value === 'string';
}

function isNullableNumber(value: unknown): value is number | null {
    return (
        value === null ||
        (typeof value === 'number' && Number.isFinite(value))
    );
}

export default function isAnime(value: unknown): value is Anime {
    if (!isRecord(value) || value.type !== 'anime') {
        return false;
    }

    if (typeof value.id !== 'string') {
        return false;
    }

    if (!isRecord(value.attributes)) {
        return false;
    }

    const attributes = value.attributes;

    if (
        typeof attributes.canonicalTitle !== 'string' ||
        typeof attributes.status !== 'string' ||
        typeof attributes.showType !== 'string'
    ) {
        return false;
    }

    if (
        !isNullableString(attributes.averageRating) ||
        !isNullableNumber(attributes.episodeCount) ||
        !isNullableNumber(attributes.popularityRank) ||
        !isNullableNumber(attributes.ratingRank)
    ) {
        return false;
    }

    const posterImage = attributes.posterImage;

    return (
        posterImage === null ||
        (
            isRecord(posterImage) &&
            typeof posterImage.small === 'string'
        )
    );
}

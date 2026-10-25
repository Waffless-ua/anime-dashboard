import type { Anime } from '../types/anime.types';

function isRecord(value: unknown): value is Record<string, unknown> {
    return (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
    );
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

function isPosterImage(
    value: unknown
): value is Anime['attributes']['posterImage'] {
    if (value === null) {
        return true;
    }

    if (!isRecord(value)) {
        return false;
    }

    return value.small === undefined || typeof value.small === 'string';
}

export default function isAnime(value: unknown): value is Anime {
    if (!isRecord(value)) {
        return false;
    }

    if (value.type !== 'anime' || typeof value.id !== 'string') {
        return false;
    }

    const attributes = value.attributes;

    if (!isRecord(attributes)) {
        return false;
    }

    const hasValidStatus =
        attributes.status === null ||
        (
            typeof attributes.status === 'string' &&
            attributes.status.trim() !== ''
        );

    return (
        typeof attributes.canonicalTitle === 'string' &&
        hasValidStatus &&
        isNullableString(attributes.averageRating) &&
        isNullableNumber(attributes.episodeCount) &&
        isNullableString(attributes.showType) &&
        isNullableNumber(attributes.popularityRank) &&
        isNullableNumber(attributes.ratingRank) &&
        isNullableString(attributes.startDate) &&
        typeof attributes.createdAt === 'string' &&
        isPosterImage(attributes.posterImage)
    );
}
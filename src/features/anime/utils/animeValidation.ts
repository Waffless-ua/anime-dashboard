import {
    ANIME_PAGE_SIZE_MIN,
    ANIME_PAGE_SIZE_MAX,
    FIRST_ANIME_YEAR,
    LAST_ANIME_YEAR,
} from '../constants/anime.constants';

export function isValidAnimePageSize(value: number): boolean {
    return (
        Number.isInteger(value) &&
        value >= ANIME_PAGE_SIZE_MIN &&
        value <= ANIME_PAGE_SIZE_MAX
    );
}

export function getAnimeYearError(value = ''): string | undefined {
    const normalizedValue = value.trim();

    if (!normalizedValue) {
        return undefined;
    }

    if (!/^\d{4}$/.test(normalizedValue)) {
        return 'Введіть рік у форматі РРРР';
    }

    const year = Number(normalizedValue);

    if (year < FIRST_ANIME_YEAR || year > LAST_ANIME_YEAR) {
        return `Введіть рік від ${FIRST_ANIME_YEAR} до ${LAST_ANIME_YEAR}`;
    }

    return undefined;
}
import type { AnimeDetailsData } from '../types/animeDetails.types';
import { getAnimeStatusLabel } from '../utils/getAnimeStatusLabel';

interface AnimeDetailFact {
    label: string;
    getValue: (anime: AnimeDetailsData) => string | number;
}

export const ANIME_DETAIL_FACTS: readonly AnimeDetailFact[] = [
    {
        label: 'Рейтинг',
        getValue: ({ attributes }) =>
            attributes.averageRating != null
                ? `${attributes.averageRating}%`
                : 'Немає даних',
    },
    {
        label: 'Статус',
        getValue: ({ attributes }) => getAnimeStatusLabel(attributes.status),
    },
    {
        label: 'Тип',
        getValue: ({ attributes }) => attributes.subtype || 'Невідомо',
    },
    {
        label: 'Кількість серій',
        getValue: ({ attributes }) => attributes.episodeCount ?? 'Невідомо',
    },
    {
        label: 'Типова тривалість серії',
        getValue: ({ details }) =>
            details.episodeLength != null
                ? `${details.episodeLength} хв`
                : 'Немає даних',
    },
    {
        label: 'Дата початку',
        getValue: ({ attributes }) => attributes.startDate || 'Невідомо',
    },
    {
        label: 'Дата завершення',
        getValue: ({ details }) => details.endDate ?? 'Не вказано',
    },
    {
        label: 'Віковий рейтинг',
        getValue: ({ details }) => details.ageRating ?? 'Не вказано',
    },
    {
        label: 'Вікові обмеження',
        getValue: ({ details }) => details.ageRatingGuide ?? 'Не вказано',
    },
    {
        label: 'Місце за популярністю',
        getValue: ({ attributes }) => attributes.popularityRank ?? 'Немає даних',
    },
    {
        label: 'Місце за рейтингом',
        getValue: ({ attributes }) => attributes.ratingRank ?? 'Немає даних',
    },
];
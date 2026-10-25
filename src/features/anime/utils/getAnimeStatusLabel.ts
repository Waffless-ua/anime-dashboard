import { ANIME_STATUS_LABELS } from '../constants/anime.constants';

export function getAnimeStatusLabel(status: string | null): string {
    if (!status) {
        return 'Невідомо';
    }

    if (Object.hasOwn(ANIME_STATUS_LABELS, status)) {
        return ANIME_STATUS_LABELS[status];
    }

    return status;
}
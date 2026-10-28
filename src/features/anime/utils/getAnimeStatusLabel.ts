import { ANIME_STATUS_OPTIONS } from '../constants/anime.constants';

export function getAnimeStatusLabel(status: string | null): string {
    if (!status) {
        return 'Невідомо';
    }

    return ANIME_STATUS_OPTIONS.find(option => option.value === status)?.label
        ?? status;
}
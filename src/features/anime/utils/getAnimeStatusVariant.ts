import type { BadgeVariant } from '../../../shared/components/atoms/Badge/Badge';

export function getAnimeStatusVariant(
    status: string | null
): BadgeVariant {
    if (status === 'finished') {
        return 'success';
    }

    if (status === 'current') {
        return 'info';
    }

    return 'neutral';
}
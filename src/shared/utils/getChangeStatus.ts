import type { ChangeStatus } from '../types/kpi.types';

export default function getChangeStatus(
    change: string | number | null
): ChangeStatus {
    if (
        typeof change !== 'number' ||
        !Number.isFinite(change) ||
        change === 0
    ) {
        return 'neutral';
    }

    if (change > 0) {
        return 'positive';
    }

    return 'negative';
}
import { fetchAnimeTotal } from './animeKpiApi';
import { ANIME_STATUS_OPTIONS } from '../constants/anime.constants';

import type { AnimeFilterValues } from '../types/animeFilters.types';
import type { ChartPoint } from '../../../shared/types/chart.types';

export async function fetchAnimeStatusDistribution(
    filter: AnimeFilterValues,
    signal: AbortSignal
): Promise<ChartPoint[]> {
    const statuses = ANIME_STATUS_OPTIONS.filter(
        option => option.value !== ''
    );

    return Promise.all(
        statuses.map(async ({ value, label }) => ({
            name: label,
            value: filter.status && filter.status !== value
                ? 0
                : await fetchAnimeTotal(
                    { ...filter, status: value },
                    signal
                ),
        }))
    );
}
import { useCallback, useState } from 'react';

import { fetchAnime } from '../api/animeApi';
import { useAsyncResource } from '../../../shared/hooks/useAsyncResource';

import {
    ANIME_PAGE_SIZE,
    DEFAULT_ANIME_SORT,
    DEFAULT_SORT_DIRECTION,
} from '../constants/anime.constants';

import type {
    AnimeSortField,
    SortDirection,
} from '../types/animeApi.types';

export function useAnime() {
    const [statusFilter, setStatusFilter] =
        useState<string>('');

    const [sortField, setSortField] =
        useState<AnimeSortField>(DEFAULT_ANIME_SORT);

    const [direction, setDirection] =
        useState<SortDirection>(DEFAULT_SORT_DIRECTION);

    const loadAnime = useCallback(
        (signal: AbortSignal) =>
            fetchAnime(
                {
                    filter: {
                        status: statusFilter || undefined,
                    },
                    sort: sortField,
                    direction,
                    limit: ANIME_PAGE_SIZE,
                },
                signal
            ),
        [statusFilter, sortField, direction]
    );

    const list = useAsyncResource(loadAnime);

    function toggleDirection() {
        setDirection(previous =>
            previous === 'asc' ? 'desc' : 'asc'
        );
    }

    return {
        list,
        anime: list.data?.anime ?? [],
        statusFilter,
        setStatusFilter,
        sortField,
        setSortField,
        direction,
        toggleDirection,
    };
}
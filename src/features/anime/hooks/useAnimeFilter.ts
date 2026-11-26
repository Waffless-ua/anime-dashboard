import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import {
    changeFilter,
    selectAnimeFilters,
} from '../store/animeQuerySlice';

import type { AnimeFilterValues } from '../types/animeFilters.types';

export function useAnimeFilter(name: keyof AnimeFilterValues) {
    const dispatch = useAppDispatch();

    const value = useAppSelector(
        state => selectAnimeFilters(state).filter[name]
    );

    function onChange(value: string) {
        dispatch(changeFilter({ name, value }));
    }

    return {
        value,
        onChange,
    };
}
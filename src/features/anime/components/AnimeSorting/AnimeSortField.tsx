import { useAppDispatch, useAppSelector } from '../../../../app/hooks';

import {
    changeSort,
    selectAnimeFilters,
} from '../../store/animeQuerySlice';

import { ANIME_SORTING_OPTIONS } from '../../constants/anime.constants';
import type { AnimeSortField as SortField } from '../../types/animeFilters.types';

import Select from '../../../../shared/components/molecules/Select/Select';

export default function AnimeSortField() {
    const dispatch = useAppDispatch();

    const sort = useAppSelector(
        state => selectAnimeFilters(state).sort
    );

    function handleChange(value: SortField) {
        dispatch(changeSort(value));
    }

    return (
        <Select<SortField>
            value={sort}
            onChange={handleChange}
            label="Сортувати за"
            options={ANIME_SORTING_OPTIONS}
        />
    );
}
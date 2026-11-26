import { useAppDispatch, useAppSelector } from '../../../../app/hooks';

import {
    changeDirection,
    selectAnimeFilters,
} from '../../store/animeQuerySlice';

import { DIRECTION_OPTIONS } from '../../constants/anime.constants';
import type { SortDirection } from '../../types/animeFilters.types';

import Select from '../../../../shared/components/molecules/Select/Select';

export default function AnimeSortDirection() {
    const dispatch = useAppDispatch();

    const direction = useAppSelector(
        state => selectAnimeFilters(state).direction
    );

    function handleChange(value: SortDirection) {
        dispatch(changeDirection(value));
    }

    return (
        <Select<SortDirection>
            value={direction}
            onChange={handleChange}
            label="Напрямок"
            options={DIRECTION_OPTIONS}
        />
    );
}
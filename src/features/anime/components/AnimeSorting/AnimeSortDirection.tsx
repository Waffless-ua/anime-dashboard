import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
    changeDirection,
    selectAnimeFilters,
} from '../../store/animeQuerySlice';
import { DIRECTION_OPTIONS } from '../../constants/anime.constants';

import Select from '../../../../shared/components/ui/Select/Select';

export default function AnimeSortDirection() {
    const dispatch = useAppDispatch();
    const direction = useAppSelector(
        state => selectAnimeFilters(state).direction
    );

    function changeSortDirection(value: string) {
        const option = DIRECTION_OPTIONS.find(option => option.value === value);

        if (option) {
            dispatch(changeDirection(option.value));
        }
    }

    return (
        <Select
            value={direction}
            onChange={changeSortDirection}
            label="Напрямок"
            options={DIRECTION_OPTIONS}
        />
    );
}
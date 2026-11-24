import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
    changeSort,
    selectAnimeFilters,
} from '../../store/animeQuerySlice';
import { ANIME_SORTING_OPTIONS } from '../../constants/anime.constants';

import Select from '../../../../shared/components/ui/Select/Select';

export default function AnimeSortField() {
    const dispatch = useAppDispatch();
    const sort = useAppSelector(
        state => selectAnimeFilters(state).sort
    );

    function changeSortField(value: string) {
        const option = ANIME_SORTING_OPTIONS.find(option => option.value === value);

        if (option) {
            dispatch(changeSort(option.value));
        }
    }

    return (
        <Select
            value={sort}
            onChange={changeSortField}
            label="Сортувати за"
            options={ANIME_SORTING_OPTIONS}
        />
    );
}
import { ANIME_STATUS_OPTIONS } from '../../constants/anime.constants';

import Select from '../../../../shared/components/ui/Select/Select';

import './AnimeFilters.css';
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { changeFilter, selectAnimeFilters } from "../../store/animeQuerySlice.ts";

export default function AnimeStatusFilter() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(
        state => selectAnimeFilters(state).filter.status
    );

    function changeStatus(value: string) {
        dispatch(changeFilter({ name: 'status', value }));
    }

    return (
        <Select
            value={status}
            onChange={changeStatus}
            label="Статус"
            options={ANIME_STATUS_OPTIONS}
        />
    );
}

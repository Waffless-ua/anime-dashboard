import { ANIME_SUBTYPE_OPTIONS } from '../../constants/anime.constants';

import Select from '../../../../shared/components/ui/Select/Select';

import './AnimeFilters.css';
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { changeFilter, selectAnimeFilters } from "../../store/animeQuerySlice.ts";


export default function AnimeSubtypeFilter() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(
        state => selectAnimeFilters(state).filter.subtype
    );

    function changeStatus(value: string) {
        dispatch(changeFilter({ name: 'subtype', value }));
    }

    return (
        <Select
            value={status}
            onChange={changeStatus}
            label="Тип"
            options={ANIME_SUBTYPE_OPTIONS}
        />
    );
}

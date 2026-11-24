import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
    changeFilter,
    selectAnimeFilters,
} from '../../store/animeQuerySlice';
import { ANIME_SEASON_OPTIONS } from '../../constants/anime.constants';

import Select from '../../../../shared/components/ui/Select/Select';

import './AnimeFilters.css';

export default function AnimeSeasonFilter() {
    const dispatch = useAppDispatch();
    const season = useAppSelector(
        state => selectAnimeFilters(state).filter.season
    );

    function changeSeason(value: string) {
        dispatch(changeFilter({ name: 'season', value }));
    }

    return (
        <Select
            value={season}
            onChange={changeSeason}
            label="Сезон"
            options={ANIME_SEASON_OPTIONS}
        />
    );
}
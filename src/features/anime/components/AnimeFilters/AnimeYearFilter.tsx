import { useId } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { changeFilter, selectAnimeFilters, } from '../../store/animeQuerySlice';
import { FIRST_ANIME_YEAR, LAST_ANIME_YEAR, } from '../../constants/anime.constants';

import './AnimeFilters.css';

export default function AnimeYearFilter() {
    const yearId = useId();
    const dispatch = useAppDispatch();
    const year = useAppSelector(
        state => selectAnimeFilters(state).filter.seasonYear
    );

    function changeYear(value: string) {
        dispatch(changeFilter({ name: 'seasonYear', value }));
    }

    return (
        <div className="anime-filter-field anime-year-field">
            <label htmlFor={yearId}>Рік</label>

            <input
                value={year}
                onChange={event => changeYear(event.currentTarget.value)}
                id={yearId}
                type="number"
                min={FIRST_ANIME_YEAR}
                max={LAST_ANIME_YEAR}
                placeholder="Всі роки"
            />
        </div>
    );
}
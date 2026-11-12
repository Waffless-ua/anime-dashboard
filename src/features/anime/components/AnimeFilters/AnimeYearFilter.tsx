import { useId } from 'react';
import { useController } from 'react-hook-form';

import { useAnimeFilters } from '../../hooks/useAnimeFilters';
import {
    FIRST_ANIME_YEAR,
    LAST_ANIME_YEAR,
} from '../../constants/anime.constants';

import './AnimeFilters.css';

export default function AnimeYearFilter() {
    const yearId = useId();
    const { control } = useAnimeFilters();

    const { field } = useController({
        name: 'filter.seasonYear',
        control,
    });

    return (
        <div className="anime-filter-field anime-year-field">
            <label htmlFor={yearId}>Рік</label>

            <input
                {...field}
                id={yearId}
                type="number"
                min={FIRST_ANIME_YEAR}
                max={LAST_ANIME_YEAR}
                placeholder="Всі роки"
            />
        </div>
    );
}
import { useId } from 'react';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import type { AnimeFilters } from '../../types/animeFilters.types';
import {
    FIRST_ANIME_YEAR,
    LAST_ANIME_YEAR,
} from '../../constants/anime.constants';
import './AnimeFilters.css';

interface AnimeYearFilterProps {
    control: Control<AnimeFilters>;
}

export default function AnimeYearFilter({
    control,
}: AnimeYearFilterProps) {
    const yearId = useId();

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
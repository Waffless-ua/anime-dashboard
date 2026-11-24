import { useId } from 'react';

import {
    FIRST_ANIME_YEAR,
    LAST_ANIME_YEAR,
} from '../../constants/anime.constants';

import './AnimeFilters.css';

interface AnimeYearFilterProps {
    value: string;
    onChange: (value: string) => void;
}

export default function AnimeYearFilter({ value, onChange }: AnimeYearFilterProps) {
    const yearId = useId();

    return (
        <div className="anime-filter-field anime-year-field">
            <label htmlFor={yearId}>Рік</label>

            <input
                value={value}
                onChange={event => onChange(event.currentTarget.value)}
                id={yearId}
                type="number"
                min={FIRST_ANIME_YEAR}
                max={LAST_ANIME_YEAR}
                placeholder="Всі роки"
            />
        </div>
    );
}

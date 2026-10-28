import { useId } from 'react';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import type { AnimeFilters } from '../../types/animeFilters.types';
import './AnimeFilters.css';

interface AnimeSearchFilterProps {
    control: Control<AnimeFilters>;
}

export default function AnimeSearchFilter({
    control,
}: AnimeSearchFilterProps) {
    const searchId = useId();

    const { field } = useController({
        name: 'filter.text',
        control,
    });

    return (
        <div className="anime-filter-field">
            <input
                {...field}
                id={searchId}
                type="search"
                placeholder="Введіть назву аніме"
            />
        </div>
    );
}
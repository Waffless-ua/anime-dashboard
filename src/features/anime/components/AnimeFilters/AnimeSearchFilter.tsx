import { useController } from 'react-hook-form';

import { useAnimeFilters } from '../../hooks/useAnimeFilters';

import './AnimeFilters.css';

export default function AnimeSearchFilter() {
    const { control } = useAnimeFilters();

    const { field } = useController({
        name: 'filter.text',
        control,
    });

    return (
        <div className="anime-filter-field">
            <input
                {...field}
                type="search"
                aria-label="Пошук аніме за назвою"
                placeholder="Введіть назву аніме"
            />
        </div>
    );
}
import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import type { Anime } from '../../types/anime.types';

import './FilteredAnimeList.css';

type FilterValue = string | number | boolean | null | undefined;

interface FilteredAnimeListProps {
    items: Anime[];
    getFilterValue: (anime: Anime) => FilterValue;
    label?: string;
    getOptionLabel?: (value: string) => string;
    children: (filteredAnime: Anime[]) => ReactNode;
}

export default function FilteredAnimeList({
          items,
          getFilterValue,
          label = 'Фільтр аніме:',
          getOptionLabel = (value) => value,
          children,
}: FilteredAnimeListProps)  {
    const [selectedFilter, setSelectedFilter] = useState('');
    const selectId : string = useId();

    const filterValues : string[] = items
        .map(getFilterValue)
        .filter((value : FilterValue) => value != null)
        .map(String)
        .filter(Boolean);

    const options : string[] = [...new Set(filterValues)].sort(
        (a, b) => a.localeCompare(b, 'uk', { numeric: true })
    );

    const activeFilter = options.includes(selectedFilter) ? selectedFilter : '';

    const filteredAnime : Anime[] = items.filter((anime : Anime) => {
        if (activeFilter === '') return true;

        return String(getFilterValue(anime)) === activeFilter;
    });

    return (
        <div className="anime-list-container">
            <div className="filter-wrapper">
                <label htmlFor={selectId} className="status-filter-title">
                    {label}
                </label>

                <select
                    id={selectId}
                    value={activeFilter}
                    onChange={(event) =>
                        setSelectedFilter(event.target.value)
                    }
                    className="status-dropdown"
                >
                    <option value="">Всі</option>

                    {options.map((option) => (
                        <option key={option} value={option}>
                            {getOptionLabel(option)}
                        </option>
                    ))}
                </select>
            </div>

            {children(filteredAnime)}
        </div>
    );
}
import { useId } from 'react';
import type { ReactNode } from 'react';

import { ANIME_STATUS_OPTIONS } from '../../constants/anime.constants';

import './FilteredAnimeList.css';

interface FilteredAnimeListProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    children: ReactNode;
}

export default function FilteredAnimeList({
    value,
    onChange,
    label = 'Статус аніме:',
    children,
}: FilteredAnimeListProps) {
    const selectId = useId();

    return (
        <div className="anime-list-container">
            <div className="filter-wrapper">
                <label
                    htmlFor={selectId}
                    className="status-filter-title"
                >
                    {label}
                </label>

                <select
                    id={selectId}
                    value={value}
                    onChange={event => onChange(event.currentTarget.value)}
                    className="status-dropdown"
                >
                    <option value="">Всі</option>

                    {ANIME_STATUS_OPTIONS.map(option => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {children}
        </div>
    );
}
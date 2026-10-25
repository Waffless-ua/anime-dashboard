import { useId } from 'react';
import type { ReactNode } from 'react';
import type { AnimeSortField, SortDirection } from '../../types/animeApi.types';
import './SortedAnimeList.css';
import { ANIME_SORTING_OPTIONS } from "../../constants/anime.constants.ts";

interface SortedAnimeListProps {
    sortField: AnimeSortField;
    direction: SortDirection;
    onSortChange: (field: AnimeSortField) => void;
    onToggleDirection: () => void;
    children: ReactNode;
}

export default function SortedAnimeList({
    sortField, direction, onSortChange, onToggleDirection, children,
}: SortedAnimeListProps) {
    const selectId = useId();

    return (
        <>
            <div className="sort-controls">
                <label htmlFor={selectId}>
                    Сортувати за:
                </label>

                <select
                    id={selectId}
                    value={sortField}
                    onChange={(event) =>
                        onSortChange(event.target.value as AnimeSortField)
                    }
                >
                    {ANIME_SORTING_OPTIONS.map(option => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    onClick={onToggleDirection}
                >
                    {direction === 'asc'
                        ? '↑ За зростанням'
                        : '↓ За спаданням'}
                </button>
            </div>

            {children}
        </>
    );
}

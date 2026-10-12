import { useId, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Anime } from '../../types/anime.types';
import './SortedAnimeList.css';
import { sortAnimeByRating } from "../../utils/sortAnimeByRating.ts";
import { sortAnimeByTitle } from "../../utils/sortAnimeByTitle.ts";

type SortField = 'title' | 'rating';
type SortDirection = 'asc' | 'desc';

interface SortedAnimeListProps {
    items: Anime[];
    children: (sortedAnime: Anime[]) => ReactNode;
}

export default function SortedAnimeList({
    items,
    children,
}: SortedAnimeListProps) {
    const [sortField, setSortField] = useState<SortField>('title');
    const [direction, setDirection] = useState<SortDirection>('asc');
    const selectId = useId();


    const sortedAnime = useMemo(() => {
        if (sortField === 'title') {
            return sortAnimeByTitle(items, direction);
        }

        if (sortField === 'rating') {
            return sortAnimeByRating(items, direction);
        }

        return items;
    }, [items, sortField, direction]);


    const toggleDirection = () => {
        setDirection(prev =>
            prev === 'asc' ? 'desc' : 'asc'
        );
    };

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
                        setSortField(event.target.value as SortField)
                    }
                >
                    <option value="title">Назвою</option>
                    <option value="rating">Рейтингом</option>
                </select>

                <button
                    type="button"
                    onClick={toggleDirection}
                >
                    {direction === 'asc'
                        ? '↑ За зростанням'
                        : '↓ За спаданням'}
                </button>
            </div>

            {children(sortedAnime)}
        </>
    );
}

import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import type { AnimeFilters } from '../../types/animeFilters.types';

import { ANIME_SORTING_OPTIONS } from '../../constants/anime.constants';

import Select from '../../../../shared/components/ui/Select/Select';

import './AnimeSorting.css';

interface AnimeSortingProps {
    control: Control<AnimeFilters>;
}

const DIRECTION_OPTIONS = [
    { value: 'asc', label: 'За зростанням' },
    { value: 'desc', label: 'За спаданням' },
];

export default function AnimeSorting({ control }: AnimeSortingProps) {
    return (
        <div
            className="anime-sorting"
            role="group"
            aria-label="Сортування аніме"
        >
            <Controller
                name="sort"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        label="Сортувати за"
                        options={ANIME_SORTING_OPTIONS}
                    />
                )}
            />

            <Controller
                name="direction"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        label="Напрямок"
                        options={DIRECTION_OPTIONS}
                    />
                )}
            />
        </div>
    );
}
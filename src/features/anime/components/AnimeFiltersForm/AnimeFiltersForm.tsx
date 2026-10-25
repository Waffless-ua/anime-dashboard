import { useId } from 'react';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import type { AnimeFilters } from '../../types/animeFilters.types';

import {
    ANIME_PAGE_SIZE,
    ANIME_STATUS_OPTIONS,
    ANIME_SORTING_OPTIONS,
} from '../../constants/anime.constants';

import Counter from '../../../../shared/components/ui/Counter/Counter';
import Button from '../../../../shared/components/ui/Button/Button';
import Select from '../../../../shared/components/ui/Select/Select';

import './AnimeFiltersForm.css';

interface AnimeFiltersFormProps {
    control: Control<AnimeFilters>;
    onReset: () => void;
}

const STATUS_OPTIONS = [
    { value: '', label: 'Всі' },
    ...ANIME_STATUS_OPTIONS,
];

const DIRECTION_OPTIONS = [
    { value: 'asc', label: 'За зростанням' },
    { value: 'desc', label: 'За спаданням' },
];

export default function AnimeFiltersForm({
    control,
    onReset,
}: AnimeFiltersFormProps) {
    const searchId = useId();

    return (
        <form
            className="anime-filters-form"
            onSubmit={event => event.preventDefault()}
            aria-label="Пошук і фільтри аніме"
        >
            <div className="anime-filter-field">
                <label htmlFor={searchId}>
                    Пошук за назвою
                </label>

                <Controller
                    name="search"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            id={searchId}
                            type="search"
                            placeholder="Введіть назву аніме"
                        />
                    )}
                />
            </div>

            <Controller
                name="status"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        label="Статус"
                        options={STATUS_OPTIONS}
                    />
                )}
            />

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

            <Controller
                name="limit"
                control={control}
                render={({ field }) => (
                    <Counter
                        label="Аніме на сторінці:"
                        value={field.value}
                        onChange={field.onChange}
                        min={1}
                        max={ANIME_PAGE_SIZE}
                    />
                )}
            />

            <Button variant="outline" onClick={onReset}>
                Скинути фільтри
            </Button>
        </form>
    );
}
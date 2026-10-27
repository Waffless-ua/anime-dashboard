import { useId } from 'react';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import type { AnimeFilters } from '../../types/animeFilters.types';

import {
    ANIME_STATUS_OPTIONS,
    ANIME_SEASON_OPTIONS,
    FIRST_ANIME_YEAR, LAST_ANIME_YEAR,
    ANIME_PAGE_SIZE_MIN, ANIME_PAGE_SIZE_MAX, ANIME_SUBTYPE_OPTIONS
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

export default function AnimeFiltersForm({
    control,
    onReset,
}: AnimeFiltersFormProps) {
    const searchId = useId();
    const yearId = useId();

    return (
        <form
            className="anime-filters-form"
            onSubmit={event => event.preventDefault()}
            aria-label="Пошук і фільтри аніме"
        >
            <div className="anime-filters-top">
                <div className="anime-filter-field">
                    <label htmlFor={searchId}>
                        Пошук за назвою
                    </label>

                    <Controller
                        name="filter.text"
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

                <Button variant="outline" onClick={onReset}>
                    Скинути фільтри
                </Button>
            </div>

            <div className="anime-filters-bottom">
                <Controller
                    name="filter.status"
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
                    name="filter.season"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label="Сезон"
                            options={ANIME_SEASON_OPTIONS}
                        />
                    )}
                />

                <Controller
                    name="filter.subtype"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label="Тип"
                            options={ANIME_SUBTYPE_OPTIONS}
                        />
                    )}
                />

                <div className="anime-filter-field anime-year-field">
                    <label htmlFor={yearId}>Рік</label>

                    <Controller
                        name="filter.seasonYear"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                id={yearId}
                                type="number"
                                min={FIRST_ANIME_YEAR}
                                max={LAST_ANIME_YEAR}
                                placeholder="Всі роки"
                            />
                        )}
                    />
                </div>

                <Controller
                    name="limit"
                    control={control}
                    render={({ field }) => (
                        <Counter
                            label="Аніме на сторінці:"
                            value={field.value}
                            onChange={field.onChange}
                            min={ANIME_PAGE_SIZE_MIN}
                            max={ANIME_PAGE_SIZE_MAX}
                        />
                    )}
                />
            </div>
        </form>
    );
}
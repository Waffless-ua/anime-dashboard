import Input from '../../../../shared/components/atoms/Input/Input';
import FormField from '../../../../shared/components/molecules/FormField/FormField';

import {
    FIRST_ANIME_YEAR,
    LAST_ANIME_YEAR,
} from '../../constants/anime.constants';

import { useAnimeFilter } from '../../hooks/useAnimeFilter';
import { getAnimeYearError } from '../../utils/animeValidation';

import './AnimeFilters.css';

export default function AnimeYearFilter() {
    const { value, onChange } = useAnimeFilter('seasonYear');

    const error = getAnimeYearError(value);

    return (
        <FormField
            label="Рік"
            className="anime-filter-field anime-year-field"
            error={error}
        >
            {controlProps => (
                <Input
                    {...controlProps}
                    value={value}
                    onChange={event => onChange(event.currentTarget.value)}
                    type="number"
                    min={FIRST_ANIME_YEAR}
                    max={LAST_ANIME_YEAR}
                    placeholder="Всі роки"
                />
            )}
        </FormField>
    );
}
import Input from '../../../../shared/components/atoms/Input/Input';
import FormField from '../../../../shared/components/molecules/FormField/FormField';

import './AnimeFilters.css';
import { useAnimeFilter } from "../../hooks/useAnimeFilter.ts";

export default function AnimeSearchFilter() {
    const { value, onChange } = useAnimeFilter('text');

    return (
        <FormField label="Пошук аніме за назвою" hideLabel className="anime-filter-field">
            {controlProps => (
            <Input
                {...controlProps}
                value={value}
                onChange={event => onChange(event.currentTarget.value)}
                type="search"
                placeholder="Введіть назву аніме"
            />
            )}
        </FormField>
    );
}

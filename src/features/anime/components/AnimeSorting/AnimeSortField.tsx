import { useController } from 'react-hook-form';

import { useAnimeFilters } from '../../hooks/useAnimeFilters';
import { ANIME_SORTING_OPTIONS } from '../../constants/anime.constants';

import Select from '../../../../shared/components/ui/Select/Select';

export default function AnimeSortField() {
    const { control } = useAnimeFilters();

    const { field } = useController({
        name: 'sort',
        control,
    });

    return (
        <Select
            {...field}
            label="Сортувати за"
            options={ANIME_SORTING_OPTIONS}
        />
    );
}
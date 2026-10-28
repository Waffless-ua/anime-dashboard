import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import type { AnimeFilters } from '../../types/animeFilters.types';
import { ANIME_SORTING_OPTIONS } from '../../constants/anime.constants';

import Select from '../../../../shared/components/ui/Select/Select';

interface AnimeSortFieldProps {
    control: Control<AnimeFilters>;
}

export default function AnimeSortField({ control }: AnimeSortFieldProps) {
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
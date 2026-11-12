import { useController } from 'react-hook-form';

import { useAnimeFilters } from '../../hooks/useAnimeFilters';
import { DIRECTION_OPTIONS } from '../../constants/anime.constants';

import Select from '../../../../shared/components/ui/Select/Select';

export default function AnimeSortDirection() {
    const { control } = useAnimeFilters();

    const { field } = useController({
        name: 'direction',
        control,
    });

    return (
        <Select
            {...field}
            label="Напрямок"
            options={DIRECTION_OPTIONS}
        />
    );
}
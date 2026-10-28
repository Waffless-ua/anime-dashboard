import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import type { AnimeFilters } from '../../types/animeFilters.types';
import { ANIME_STATUS_OPTIONS } from '../../constants/anime.constants';

import Select from '../../../../shared/components/ui/Select/Select';
import './AnimeFilters.css';

interface AnimeStatusFilterProps {
    control: Control<AnimeFilters>;
}

export default function AnimeStatusFilter({
    control,
}: AnimeStatusFilterProps) {
    const { field } = useController({
        name: 'filter.status',
        control,
    });

    return (
        <Select
            {...field}
            label="Статус"
            options={ANIME_STATUS_OPTIONS}
        />
    );
}
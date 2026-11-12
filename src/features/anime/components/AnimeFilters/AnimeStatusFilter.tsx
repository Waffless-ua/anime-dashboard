import { useController } from 'react-hook-form';

import { useAnimeFilters } from '../../hooks/useAnimeFilters';
import { ANIME_STATUS_OPTIONS } from '../../constants/anime.constants';

import Select from '../../../../shared/components/ui/Select/Select';

import './AnimeFilters.css';

export default function AnimeStatusFilter() {
    const { control } = useAnimeFilters();

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
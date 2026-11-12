import { useController } from 'react-hook-form';

import { useAnimeFilters } from '../../hooks/useAnimeFilters';
import { ANIME_SUBTYPE_OPTIONS } from '../../constants/anime.constants';

import Select from '../../../../shared/components/ui/Select/Select';

import './AnimeFilters.css';

export default function AnimeSubtypeFilter() {
    const { control } = useAnimeFilters();

    const { field } = useController({
        name: 'filter.subtype',
        control,
    });

    return (
        <Select
            {...field}
            label="Тип"
            options={ANIME_SUBTYPE_OPTIONS}
        />
    );
}
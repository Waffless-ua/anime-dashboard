import { useController } from 'react-hook-form';

import { useAnimeFilters } from '../../hooks/useAnimeFilters';
import { ANIME_SEASON_OPTIONS } from '../../constants/anime.constants';

import Select from '../../../../shared/components/ui/Select/Select';

import './AnimeFilters.css';

export default function AnimeSeasonFilter() {
    const { control } = useAnimeFilters();

    const { field } = useController({
        name: 'filter.season',
        control,
    });

    return (
        <Select
            {...field}
            label="Сезон"
            options={ANIME_SEASON_OPTIONS}
        />
    );
}
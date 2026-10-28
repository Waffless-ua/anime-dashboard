import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import type { AnimeFilters } from '../../types/animeFilters.types';

import Select from '../../../../shared/components/ui/Select/Select';
import { ANIME_SEASON_OPTIONS } from "../../constants/anime.constants.ts";
import './AnimeFilters.css';

interface AnimeSeasonFilterProps {
    control: Control<AnimeFilters>;
}

export default function AnimeSeasonFilter({
    control,
}: AnimeSeasonFilterProps) {
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
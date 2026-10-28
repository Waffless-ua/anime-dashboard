import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import type { AnimeFilters } from '../../types/animeFilters.types';

import Select from '../../../../shared/components/ui/Select/Select';
import { ANIME_SUBTYPE_OPTIONS } from "../../constants/anime.constants.ts";
import './AnimeFilters.css';

interface AnimeSubtypeFilterProps {
    control: Control<AnimeFilters>;
}

export default function AnimeSubtypeFilter({
    control,
}: AnimeSubtypeFilterProps) {
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
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import type { AnimeFilters } from '../../types/animeFilters.types';

import Select from '../../../../shared/components/ui/Select/Select';
import { DIRECTION_OPTIONS } from "../../constants/anime.constants.ts";

interface AnimeSortDirectionProps {
    control: Control<AnimeFilters>;
}

export default function AnimeSortDirection({
    control,
}: AnimeSortDirectionProps) {
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
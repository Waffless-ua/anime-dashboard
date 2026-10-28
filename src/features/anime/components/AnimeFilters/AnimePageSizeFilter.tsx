import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import type { AnimeFilters } from '../../types/animeFilters.types';
import {
    ANIME_PAGE_SIZE_MIN,
    ANIME_PAGE_SIZE_MAX,
} from '../../constants/anime.constants';

import Counter from '../../../../shared/components/ui/Counter/Counter';
import './AnimeFilters.css';

interface AnimePageSizeFilterProps {
    control: Control<AnimeFilters>;
}

export default function AnimePageSizeFilter({
    control,
}: AnimePageSizeFilterProps) {
    const { field } = useController({
        name: 'limit',
        control,
    });

    return (
        <Counter
            label="Аніме на сторінці:"
            value={field.value}
            onChange={field.onChange}
            min={ANIME_PAGE_SIZE_MIN}
            max={ANIME_PAGE_SIZE_MAX}
        />
    );
}
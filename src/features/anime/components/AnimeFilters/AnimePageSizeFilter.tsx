import { useController } from 'react-hook-form';

import { useAnimeFilters } from '../../hooks/useAnimeFilters';
import {
    ANIME_PAGE_SIZE_MIN,
    ANIME_PAGE_SIZE_MAX,
} from '../../constants/anime.constants';

import Counter from '../../../../shared/components/ui/Counter/Counter';

import './AnimeFilters.css';

export default function AnimePageSizeFilter() {
    const { control } = useAnimeFilters();

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
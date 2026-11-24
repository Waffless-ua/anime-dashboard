import {
    ANIME_PAGE_SIZE_MIN,
    ANIME_PAGE_SIZE_MAX,
} from '../../constants/anime.constants';

import Counter from '../../../../shared/components/ui/Counter/Counter';

import './AnimeFilters.css';

interface AnimePageSizeFilterProps {
    value: number;
    onChange: (value: number) => void;
}

export default function AnimePageSizeFilter({ value, onChange }: AnimePageSizeFilterProps) {
    return (
        <Counter
            label="Аніме на сторінці:"
            value={value}
            onChange={onChange}
            min={ANIME_PAGE_SIZE_MIN}
            max={ANIME_PAGE_SIZE_MAX}
        />
    );
}

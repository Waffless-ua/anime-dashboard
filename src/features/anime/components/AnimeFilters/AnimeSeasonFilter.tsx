import { ANIME_SEASON_OPTIONS } from '../../constants/anime.constants';

import Select from '../../../../shared/components/ui/Select/Select';

import './AnimeFilters.css';

interface AnimeSeasonFilterProps {
    value: string;
    onChange: (value: string) => void;
}

export default function AnimeSeasonFilter({ value, onChange }: AnimeSeasonFilterProps) {
    return (
        <Select
            value={value}
            onChange={onChange}
            label="Сезон"
            options={ANIME_SEASON_OPTIONS}
        />
    );
}

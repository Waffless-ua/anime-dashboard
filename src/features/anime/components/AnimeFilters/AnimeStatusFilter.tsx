import { ANIME_STATUS_OPTIONS } from '../../constants/anime.constants';

import Select from '../../../../shared/components/ui/Select/Select';

import './AnimeFilters.css';

interface AnimeStatusFilterProps {
    value: string;
    onChange: (value: string) => void;
}

export default function AnimeStatusFilter({ value, onChange }: AnimeStatusFilterProps) {
    return (
        <Select
            value={value}
            onChange={onChange}
            label="Статус"
            options={ANIME_STATUS_OPTIONS}
        />
    );
}

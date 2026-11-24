import { ANIME_SUBTYPE_OPTIONS } from '../../constants/anime.constants';

import Select from '../../../../shared/components/ui/Select/Select';

import './AnimeFilters.css';

interface AnimeSubtypeFilterProps {
    value: string;
    onChange: (value: string) => void;
}

export default function AnimeSubtypeFilter({ value, onChange }: AnimeSubtypeFilterProps) {
    return (
        <Select
            value={value}
            onChange={onChange}
            label="Тип"
            options={ANIME_SUBTYPE_OPTIONS}
        />
    );
}

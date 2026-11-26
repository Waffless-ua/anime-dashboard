import { ANIME_STATUS_OPTIONS } from '../../constants/anime.constants';

import Select from '../../../../shared/components/molecules/Select/Select';

import './AnimeFilters.css';
import { useAnimeFilter } from "../../hooks/useAnimeFilter.ts";

export default function AnimeStatusFilter() {
    const { value, onChange } = useAnimeFilter('status');

    return (
        <Select
            value={value}
            onChange={onChange}
            label="Статус"
            options={ANIME_STATUS_OPTIONS}
        />
    );
}

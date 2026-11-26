import { ANIME_SUBTYPE_OPTIONS } from '../../constants/anime.constants';

import Select from '../../../../shared/components/molecules/Select/Select';

import './AnimeFilters.css';
import { useAnimeFilter } from "../../hooks/useAnimeFilter.ts";


export default function AnimeSubtypeFilter() {
    const { value, onChange } = useAnimeFilter('subtype');


    return (
        <Select
            value={value}
            onChange={onChange}
            label="Тип"
            options={ANIME_SUBTYPE_OPTIONS}
        />
    );
}

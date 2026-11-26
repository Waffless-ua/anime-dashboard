import { ANIME_SEASON_OPTIONS } from '../../constants/anime.constants';
import { useAnimeFilter } from '../../hooks/useAnimeFilter';

import Select from '../../../../shared/components/molecules/Select/Select';

export default function AnimeSeasonFilter() {
    const { value, onChange } = useAnimeFilter('season');

    return (
        <Select
            value={value}
            onChange={onChange}
            label="Сезон"
            options={ANIME_SEASON_OPTIONS}
        />
    );
}
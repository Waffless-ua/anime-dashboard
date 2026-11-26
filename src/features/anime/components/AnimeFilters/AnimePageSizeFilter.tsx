import { useAppDispatch, useAppSelector } from '../../../../app/hooks';

import {
    changeLimit,
    selectAnimeFilters,
} from '../../store/animeQuerySlice';

import {
    ANIME_PAGE_SIZE_MIN,
    ANIME_PAGE_SIZE_MAX,
} from '../../constants/anime.constants';

import Counter from '../../../../shared/components/molecules/Counter/Counter';

import './AnimeFilters.css';

export default function AnimePageSizeFilter() {
    const dispatch = useAppDispatch();

    const limit = useAppSelector(
        state => selectAnimeFilters(state).limit
    );

    function changePageSize(value: number) {
        dispatch(changeLimit(value));
    }

    return (
        <Counter
            label="Аніме на сторінці:"
            value={limit}
            onChange={changePageSize}
            min={ANIME_PAGE_SIZE_MIN}
            max={ANIME_PAGE_SIZE_MAX}
        />
    );
}
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
    changeFilter,
    selectAnimeFilters,
} from '../../store/animeQuerySlice';

import './AnimeFilters.css';

export default function AnimeSearchFilter() {
    const dispatch = useAppDispatch();
    const text = useAppSelector(
        state => selectAnimeFilters(state).filter.text
    );

    function changeText(value: string) {
        dispatch(changeFilter({ name: 'text', value }));
    }

    return (
        <div className="anime-filter-field">
            <input
                value={text}
                onChange={event => changeText(event.currentTarget.value)}
                type="search"
                aria-label="Пошук аніме за назвою"
                placeholder="Введіть назву аніме"
            />
        </div>
    );
}
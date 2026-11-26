import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
    selectIsFavorite,
    toggleFavorite,
} from '../../store/favoritesSlice';

import Button from '../../../../shared/components/atoms/Button/Button';

import './FavoriteButton.css';

interface FavoriteButtonProps {
    animeId: string;
}

export default function FavoriteButton({ animeId }: FavoriteButtonProps) {
    const dispatch = useAppDispatch();
    const isFavorite = useAppSelector(
        state => selectIsFavorite(state, animeId)
    );

    function handleToggle() {
        dispatch(toggleFavorite(animeId));
    }

    return (
        <Button
            variant={isFavorite ? 'primary' : 'outline'}
            className="favorite-button"
            onClick={handleToggle}
            fullWidth={true}
        >
            {isFavorite ? '♥ Прибрати з обраного' : '♡ Додати в обране'}
        </Button>
    );
}
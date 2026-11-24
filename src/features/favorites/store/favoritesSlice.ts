import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../../app/store';

interface FavoritesState {
    ids: string[];
}

const initialState: FavoritesState = {
    ids: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite(state, action: PayloadAction<string>) {
            const id = action.payload;

            if (state.ids.includes(id)) {
                state.ids = state.ids.filter(favoriteId => favoriteId !== id);
                return;
            }

            state.ids.push(id);
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;

export const selectIsFavorite = (state: RootState, animeId: string) =>
    state.favorites.ids.includes(animeId);

export default favoritesSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_ANIME_FILTERS } from '../constants/anime.constants';
import type {
    AnimeFilters,
    AnimeFilterValues,
    AnimeSortField,
    SortDirection,
} from '../types/animeFilters.types';
import type { RootState } from '../../../app/store';

interface AnimeQueryState {
    filters: AnimeFilters;
    page: number;
}

interface FilterChange {
    name: keyof AnimeFilterValues;
    value: string;
}

const initialState: AnimeQueryState = {
    filters: DEFAULT_ANIME_FILTERS,
    page: 1,
};

const animeQuerySlice = createSlice({
    name: 'animeQuery',
    initialState,
    reducers: {
        changeFilter(state, action: PayloadAction<FilterChange>) {
            const { name, value } = action.payload;

            state.filters.filter[name] = value;
            state.page = 1;
        },

        changeSort(state, action: PayloadAction<AnimeSortField>) {
            state.filters.sort = action.payload;
            state.page = 1;
        },

        changeDirection(state, action: PayloadAction<SortDirection>) {
            state.filters.direction = action.payload;
            state.page = 1;
        },

        changeLimit(state, action: PayloadAction<number>) {
            state.filters.limit = action.payload;
            state.page = 1;
        },

        changePage(state, action: PayloadAction<number>) {
            const page = action.payload;

            if (!Number.isSafeInteger(page) || page < 1) return;

            state.page = page;
        },

        resetFilters() {
            return initialState;
        },
    },
});

export const {
    changeFilter,
    changeSort,
    changeDirection,
    changeLimit,
    changePage,
    resetFilters,
} = animeQuerySlice.actions;

export const selectAnimeFilters = (state: RootState) =>
    state.animeQuery.filters;

export const selectAnimePage = (state: RootState) =>
    state.animeQuery.page;

export default animeQuerySlice.reducer;
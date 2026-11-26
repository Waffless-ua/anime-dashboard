import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_ANIME_FILTERS } from '../constants/anime.constants';

import { FIRST_PAGE } from '../../../shared/constants/pagination.constants';

import type {
    AnimeFilters,
    AnimeFilterValues,
    AnimeSortField,
    SortDirection,
} from '../types/animeFilters.types';

import type { RootState } from '../../../app/store';

import { isValidAnimePageSize } from '../utils/animeValidation';

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
    page: FIRST_PAGE,
};

const animeQuerySlice = createSlice({
    name: 'animeQuery',
    initialState,

    reducers: {
        changeFilter(state, action: PayloadAction<FilterChange>) {
            const { name, value } = action.payload;

            if (state.filters.filter[name] === value) {
                return;
            }

            state.filters.filter[name] = value;
            state.page = FIRST_PAGE;
        },

        changeSort(state, action: PayloadAction<AnimeSortField>) {
            const sort = action.payload;

            if (state.filters.sort === sort) {
                return;
            }

            state.filters.sort = sort;
            state.page = FIRST_PAGE;
        },

        changeDirection(state, action: PayloadAction<SortDirection>) {
            const direction = action.payload;

            if (state.filters.direction === direction) {
                return;
            }

            state.filters.direction = direction;
            state.page = FIRST_PAGE;
        },

        changeLimit(state, action: PayloadAction<number>) {
            const limit = action.payload;

            if (!isValidAnimePageSize(limit)) {
                return;
            }

            if (state.filters.limit === limit) {
                return;
            }

            state.filters.limit = limit;
            state.page = FIRST_PAGE;
        },

        changePage(state, action: PayloadAction<number>) {
            const page = action.payload;

            if (
                !Number.isSafeInteger(page) ||
                page < FIRST_PAGE
            ) {
                return;
            }

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
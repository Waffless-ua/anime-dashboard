import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/store';

interface ThemeState {
    isDark: boolean;
}

const initialState: ThemeState = {
    isDark: false,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme(state) {
            state.isDark = !state.isDark;
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export const selectIsDark = (state: RootState) => state.theme.isDark;

export default themeSlice.reducer;
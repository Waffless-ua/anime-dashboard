import { configureStore } from '@reduxjs/toolkit';

import themeReducer from '../features/theme/store/themeSlice';
import animeQueryReducer from '../features/anime/store/animeQuerySlice';
import favoritesReducer from '../features/favorites/store/favoritesSlice';
import animeChartReducer from '../features/anime/store/animeChartSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        animeQuery: animeQueryReducer,
        favorites: favoritesReducer,
        animeChart: animeChartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { configureStore } from '@reduxjs/toolkit';

import themeReducer from '../features/theme/store/themeSlice';
import animeQueryReducer from '../features/anime/store/animeQuerySlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        animeQuery: animeQueryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
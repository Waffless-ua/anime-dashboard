import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import themeReducer from '../features/theme/store/themeSlice';
import animeQueryReducer from '../features/anime/store/animeQuerySlice';
import favoritesReducer from '../features/favorites/store/favoritesSlice';
import animeChartReducer from '../features/anime/store/animeChartSlice';

import { persistConfig } from './persistConfig';

const rootReducer = combineReducers({
    theme: themeReducer,
    animeQuery: animeQueryReducer,
    favorites: favoritesReducer,
    animeChart: animeChartReducer,
});

const persistedReducer = persistReducer(
    persistConfig,
    rootReducer
);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
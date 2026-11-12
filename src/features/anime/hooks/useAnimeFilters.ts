import { useContext } from 'react';

import { AnimeFiltersContext } from '../context/AnimeFiltersContext';

export function useAnimeFilters() {
    const context = useContext(AnimeFiltersContext);

    if (context === undefined) {
        throw new Error(
            'useAnimeFilters must be used within AnimeFiltersProvider'
        );
    }

    return context;
}
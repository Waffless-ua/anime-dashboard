import { createContext } from 'react';
import type { Control } from 'react-hook-form';

import type { AnimeFilters } from '../types/animeFilters.types';

export interface AnimeFiltersContextValue {
    control: Control<AnimeFilters>;
    debouncedQuery: AnimeFilters;
    resetFilters: () => void;
    page: number;
    pageIndex: number;
    changePage: (page: number) => void;
}

export const AnimeFiltersContext = createContext<
    AnimeFiltersContextValue | undefined
>(undefined);
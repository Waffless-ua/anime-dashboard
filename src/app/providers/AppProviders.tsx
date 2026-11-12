import type { ReactNode } from 'react';

import ThemeProvider from '../../features/theme/context/ThemeProvider';
import AnimeFiltersProvider from '../../features/anime/context/AnimeFiltersProvider';

interface AppProvidersProps {
    children: ReactNode;
}

export default function AppProviders({
    children,
}: AppProvidersProps) {
    return (
        <ThemeProvider>
            <AnimeFiltersProvider>
                {children}
            </AnimeFiltersProvider>
        </ThemeProvider>
    );
}
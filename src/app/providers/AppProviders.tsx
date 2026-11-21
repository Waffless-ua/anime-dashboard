import type { ReactNode } from 'react';

import ThemeProvider from '../../features/theme/context/ThemeProvider';

interface AppProvidersProps {
    children: ReactNode;
}

export default function AppProviders({
    children,
}: AppProvidersProps) {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
}
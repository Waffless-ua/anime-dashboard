import { useState } from 'react';
import type { ReactNode } from 'react';

import { ThemeContext } from './ThemeContext';

interface ThemeProviderProps {
    children: ReactNode;
}

export default function ThemeProvider({
    children,
}: ThemeProviderProps) {
    const [isDark, setIsDark] = useState(false);

    function toggleTheme() {
        setIsDark(previous => !previous);
    }

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
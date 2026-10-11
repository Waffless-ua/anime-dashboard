import { useState } from 'react';

export function useTheme() {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    return { isDark, toggleTheme };
}
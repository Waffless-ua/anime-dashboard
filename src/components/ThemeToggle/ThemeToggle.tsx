import { useState, useEffect } from 'react';
import Button from '../../shared/components/ui/Button/Button.tsx';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(() => {
        return document.documentElement.getAttribute('data-theme') === 'dark';
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }, [isDark]);

    return (
        <Button
            variant="secondary"
            onClick={() => setIsDark(!isDark)}
        >
            {isDark ? '🌙' : '☀️'}
        </Button>
    );
}
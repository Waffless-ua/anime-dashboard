import { useTheme } from '../../hooks/useTheme';

import Button from '../../../../shared/components/ui/Button/Button';

export default function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <Button variant="secondary" onClick={toggleTheme}>
            {isDark ? '☀️ Світла тема' : '🌙 Темна тема'}
        </Button>
    );
}
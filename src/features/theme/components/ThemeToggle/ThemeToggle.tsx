import { useTheme } from '../../hooks/useTheme';

import Button from '../../../../shared/components/ui/Button/Button';

export default function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <Button variant="primary" onClick={toggleTheme}>
            {isDark ? '🌙 Темна тема ' : '☀️ Світла тема'}
        </Button>
    );
}
import Button from '../../../shared/components/ui/Button/Button';

interface ThemeToggleProps {
    isDark: boolean;
    onToggle: () => void;
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
    return (
        <Button
            variant="secondary"
            onClick={onToggle}
        >
            {isDark ? '🌙' : '☀️'}
        </Button>
    );
}
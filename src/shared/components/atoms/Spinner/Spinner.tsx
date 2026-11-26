import './Spinner.css';

export interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    label?: string;
    decorative?: boolean;
    className?: string;
}
export default function Spinner({ size = 'md', label = 'Завантаження', decorative = false, className = '' }: SpinnerProps) {
    return <span className={`shared-spinner shared-spinner--${size} ${className}`}
        role={decorative ? undefined : 'status'} aria-label={decorative ? undefined : label}
        aria-hidden={decorative || undefined} />;
}

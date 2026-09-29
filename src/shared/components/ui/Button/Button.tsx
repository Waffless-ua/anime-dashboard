import './Button.css';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'danger';
    className?: string;
    disabled?: boolean;
}

export default function Button({
   children,
   onClick,
   variant = 'primary',
   className = '',
   disabled = false
}: ButtonProps) {

    return (
        <button
            className={`shared-btn btn-${variant} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
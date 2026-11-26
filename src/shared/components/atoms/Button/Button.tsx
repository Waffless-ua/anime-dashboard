import type { ComponentPropsWithRef } from 'react';

import './Button.css';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    iconOnly?: boolean;
}

export default function Button({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    iconOnly = false,
    className = '',
    type = 'button',
    children,
    ...props
}: ButtonProps) {
    const classes = [
        'shared-btn',
        `btn-${variant}`,
        `shared-btn--${size}`,
    ];

    if (fullWidth) {
        classes.push('shared-btn--full');
    }

    if (iconOnly) {
        classes.push('shared-btn--icon');
    }

    if (className) {
        classes.push(className);
    }

    return (
        <button
            {...props}
            type={type}
            className={classes.join(' ')}
        >
            {children}
        </button>
    );
}
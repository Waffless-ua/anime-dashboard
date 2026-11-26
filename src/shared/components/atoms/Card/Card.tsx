import type { HTMLAttributes } from 'react';

import './Card.css';

export interface CardProps extends HTMLAttributes<HTMLElement> {
    as?: 'div' | 'article' | 'section' | 'li' | 'aside';
    variant?: 'surface' | 'muted';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hoverable?: boolean;
}

export default function Card({
    as: Element = 'div',
    variant = 'surface',
    padding = 'md',
    hoverable = false,
    className = '',
    children,
    ...props
}: CardProps) {
    const classes = [
        'shared-card',
        `shared-card--${variant}`,
        `shared-card--${padding}`,
    ];

    if (hoverable) {
        classes.push('shared-card--hoverable');
    }

    if (className) {
        classes.push(className);
    }

    return (
        <Element
            {...props}
            className={classes.join(' ')}
        >
            {children}
        </Element>
    );
}
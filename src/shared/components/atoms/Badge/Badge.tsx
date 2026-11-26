import type { ComponentPropsWithoutRef } from 'react';
import './Badge.css';

export type BadgeVariant = 'neutral' | 'success' | 'danger' | 'info' | 'warning';

export interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
    variant?: BadgeVariant;
    size?: 'sm' | 'md';
}
export default function Badge({ variant = 'neutral', size = 'sm', className = '', children, ...props }: BadgeProps) {
    return <span {...props} className={`shared-badge shared-badge--${variant} shared-badge--${size} ${className}`}>{children}</span>;
}

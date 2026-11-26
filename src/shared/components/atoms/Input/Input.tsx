import type { ComponentPropsWithRef } from 'react';
import '../../../styles/controls.css';

export type InputProps = ComponentPropsWithRef<'input'>;

export default function Input({ className = '', type = 'text', ...props }: InputProps) {
    return <input {...props} type={type} className={`shared-control ${className}`} />;
}

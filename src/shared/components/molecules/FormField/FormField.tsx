import { useId } from 'react';
import type { ReactNode } from 'react';
import './FormField.css';

export interface FieldControlProps {
    id: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling';
}

export interface FormFieldProps {
    id?: string;
    label: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
    hideLabel?: boolean;
    className?: string;
    describedBy?: string;
    invalid?: FieldControlProps['aria-invalid'];
    children: (props: FieldControlProps) => ReactNode;
}

export default function FormField({
    id, label, hint, error, hideLabel = false, className = '',
    describedBy, invalid, children,
}: FormFieldProps) {
    const generatedId = useId();
    const controlId = id ?? generatedId;
    const hasError = Boolean(error);
    const message = hasError ? error : hint;
    const messageId = `${controlId}-message`;
    const description = [describedBy, message ? messageId : undefined].filter(Boolean).join(' ') || undefined;

    return (
        <div className={`form-field ${className}`}>
            <label htmlFor={controlId} className={hideLabel ? 'form-field__label--hidden' : 'form-field__label'}>
                {label}
            </label>
            {children({ id: controlId, 'aria-describedby': description, 'aria-invalid': hasError || invalid })}
            {message && (
                <span id={messageId} className={`form-field__message${hasError ? ' form-field__message--error' : ''}`}>
                    {message}
                </span>
            )}
        </div>
    );
}

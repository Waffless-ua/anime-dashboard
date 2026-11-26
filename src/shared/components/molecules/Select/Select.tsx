import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { SelectOption } from '../../../types/select.types.ts';
import FormField from '../FormField/FormField.tsx';
import '../../../styles/controls.css';
import './Select.css';

export interface SelectProps<TValue extends string = string>
    extends Omit<ComponentPropsWithRef<'select'>, 'value' | 'defaultValue' | 'onChange' | 'children' | 'multiple'> {
    label: ReactNode;
    options: readonly SelectOption<TValue>[];
    value: TValue;
    onChange: (value: TValue) => void;
    wrapperClassName?: string;
    hint?: ReactNode;
    error?: ReactNode;
}

export default function Select<TValue extends string = string>({
    label, options, value, onChange, id, className = '', wrapperClassName = '',
    hint, error, 'aria-describedby': describedBy, 'aria-invalid': invalid, ...props
}: SelectProps<TValue>) {
    return (
        <FormField className={`select-field ${wrapperClassName}`}
            id={id}
            label={label}
            hint={hint}
            error={error}
            describedBy={describedBy}
            invalid={invalid}>
            {controlProps => (
                <select {...props} {...controlProps} className={`shared-control select-control ${className}`} value={value}
                    onChange={event => {
                        const option = options.find(item => item.value === event.currentTarget.value);
                        if (option) onChange(option.value);
                    }}>
                    {options.map(option => (
                        <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
                    ))}
                </select>
            )}
        </FormField>
    );
}

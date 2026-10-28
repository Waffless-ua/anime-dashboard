import { useId } from 'react';
import type { Ref } from 'react';

import './Select.css';
import type { SelectOption } from "../../../types/select.types.ts";

interface SelectProps {
    label: string;
    options: readonly SelectOption[];
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    name?: string;
    disabled?: boolean;
    ref?: Ref<HTMLSelectElement>;
}

export default function Select({
    label,
    options,
    value,
    onChange,
    onBlur,
    name,
    disabled,
    ref,
}: SelectProps) {
    const selectId = useId();

    return (
        <div className="select-field">
            <label htmlFor={selectId}>
                {label}
            </label>

            <select
                id={selectId}
                ref={ref}
                name={name}
                value={value}
                onChange={event => onChange(event.currentTarget.value)}
                onBlur={onBlur}
                disabled={disabled}
            >
                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
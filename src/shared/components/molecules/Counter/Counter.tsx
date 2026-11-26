import { useId } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import Button from '../../atoms/Button/Button.tsx';

import './Counter.css';

export interface CounterProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange' | 'children'> {
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
    step?: number;
    disabled?: boolean;
}

export default function Counter({
    label,
    value,
    min,
    max,
    onChange,
    step = 1,
    disabled = false,
    className = '',
    ...props
}: CounterProps) {
    const labelId = useId();
    const validRange = Number.isFinite(value) && Number.isFinite(min) && Number.isFinite(max) && min <= max;
    const validStep = Number.isFinite(step) && step > 0;
    const inactive = disabled || !validRange || !validStep;

    function decrease() {
        if (!inactive) onChange(Math.min(max, Math.max(min, value - step)));
    }

    function increase() {
        if (!inactive) onChange(Math.max(min, Math.min(max, value + step)));
    }

    return (
        <div
            {...props}
            className={`counter-widget ${className}`}
            aria-labelledby={labelId}
            role="group"
        >
            <span id={labelId} className="counter-label">
                {label}
            </span>

            <div className="counter-button-list">
                <Button
                    variant="outline"
                    size="sm"
                    iconOnly
                    onClick={decrease}
                    aria-label={`Зменшити: ${label}`}
                    disabled={inactive || value <= min}
                >
                    −
                </Button>

                <output className="counter-value" aria-live="polite">
                    {value}
                </output>

                <Button
                    variant="outline"
                    size="sm"
                    iconOnly
                    onClick={increase}
                    aria-label={`Збільшити: ${label}`}
                    disabled={inactive || value >= max}
                >
                    +
                </Button>
            </div>
        </div>
    );
}
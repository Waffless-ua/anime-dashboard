import Button from '../Button/Button';

import './Counter.css';

interface CounterProps {
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
    step?: number;
}

export default function Counter({
    label,
    value,
    min,
    max,
    onChange,
    step = 1,
}: CounterProps) {
    function decrease() {
        onChange(Math.max(min, value - step));
    }

    function increase() {
        onChange(Math.min(max, value + step));
    }

    return (
        <div
            className="counter-widget"
            role="group"
        >
            <span className="counter-label">
                {label}
            </span>

            <div className="counter-button-list">
                <Button
                    variant="outline"
                    onClick={decrease}
                    disabled={value <= min}
                >
                    −
                </Button>

                <output className="counter-value" aria-live="polite">
                    {value}
                </output>

                <Button
                    variant="outline"
                    onClick={increase}
                    disabled={value >= max}
                >
                    +
                </Button>
            </div>
        </div>
    );
}
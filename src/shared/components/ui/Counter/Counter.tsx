import { useState } from 'react';
import Button from '../Button/Button';

import './Counter.css';

interface CounterProps {
    label: string;
    initial?: number;
    step?: number;
}

export default function Counter({
    label,
    initial = 0,
    step = 1,
}: CounterProps) {
    const [count, setCount] = useState(initial);

    return (
        <div className="counter-widget">
            <h3 className="counter-label">
                {label}
            </h3>

            <div className="counter-value" aria-live="polite">
                {count}
            </div>

            <div className="counter-button-list">
                <Button variant="outline" onClick={() => setCount(prev => prev - step)}>
                    −
                </Button>

                <Button variant="secondary" onClick={() => setCount(initial)}>
                    Скинути
                </Button>

                <Button variant="primary" onClick={() => setCount(prev => prev + step)}>
                    +
                </Button>
            </div>
        </div>
    );
}

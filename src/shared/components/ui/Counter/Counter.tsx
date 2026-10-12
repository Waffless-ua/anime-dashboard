import { useState } from 'react';
import './Counter.css'
import Button from "../Button/Button.tsx";

interface CounterProps {
    label: string;
    initial?: number;
    step?: number;
}

export default function Counter({ label, initial = 0, step = 1 }: CounterProps) {
    const [count, setCount] = useState(initial);

    return (
        <div className="counter-widget">
            <div className="counter-display">{label}: {count}</div>

            <div className="counter-button-list">
                <Button variant="danger" onClick={() => setCount(prev => prev - step)}>
                    −
                </Button>

                <Button variant="outline" onClick={() => setCount(initial)}>
                    Скинути
                </Button>

                <Button variant="primary" onClick={() => setCount(prev => prev + step)}>
                    +
                </Button>
            </div>
        </div>
    );
}
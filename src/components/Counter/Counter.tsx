import { useState } from 'react';
import './Counter.css'
import Button from "../../shared/components/ui/Button/Button.tsx";

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div className="counter-widget">
            <div className="counter-display">Лічильник: {count}</div>

            <div className="counter-button-list">
                <Button variant="danger" onClick={() => setCount(count - 1)}>
                    −
                </Button>

                <Button variant="outline" onClick={() => setCount(0)}>
                    Скинути
                </Button>

                <Button variant="primary" onClick={() => setCount(count + 1)}>
                    +
                </Button>
            </div>
        </div>
    );
}
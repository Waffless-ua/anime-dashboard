import { useState } from 'react';
import './Counter.css'
import Button from "../../shared/components/ui/Button/Button.tsx";
import FlexRow from "../../shared/components/ui/FlexRow/FlexRow.tsx";

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div className="counter-widget">
            <div className="counter-display">Лічильник: {count}</div>

            <FlexRow gap="0.5rem">
                <Button variant="danger" onClick={() => setCount(count - 1)}>
                    −
                </Button>

                <Button variant="outline" onClick={() => setCount(0)}>
                    Скинути
                </Button>

                <Button variant="primary" onClick={() => setCount(count + 1)}>
                    +
                </Button>
            </FlexRow>
        </div>
    );
}
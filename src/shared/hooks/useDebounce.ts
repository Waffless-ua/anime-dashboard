import { useEffect, useState } from 'react';

import { DEFAULT_DEBOUNCE_DELAY_MS } from '../constants/timing.constants';

export function useDebounce<T>(
    value: T,
    delay = DEFAULT_DEBOUNCE_DELAY_MS
): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [value, delay]);

    return debouncedValue;
}
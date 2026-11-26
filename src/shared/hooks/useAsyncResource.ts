import { useCallback, useEffect, useState } from 'react';

import { getErrorMessage } from '../utils/getErrorMessage';

import type {
    AsyncResource,
    AsyncState,
} from '../types/async.types';

type ResourceLoader<T> = (signal: AbortSignal) => Promise<T>;

interface CompletedRequest<T> {
    load: ResourceLoader<T>;
    reloadCount: number;
    state: AsyncState<T>;
}

export function useAsyncResource<T>(
    load: ResourceLoader<T> | null
): AsyncResource<T> {
    const [completed, setCompleted] =
        useState<CompletedRequest<T> | null>(null);

    const [reloadCount, setReloadCount] = useState(0);

    useEffect(() => {
        if (load === null) {
            return;
        }

        const controller = new AbortController();

        const loadResource = async () => {
            try {
                const data = await load(controller.signal);

                if (controller.signal.aborted) {
                    return;
                }

                setCompleted({
                    load,
                    reloadCount,
                    state: {
                        status: 'success',
                        data,
                        error: null,
                    },
                });
            } catch (error) {
                if (controller.signal.aborted) {
                    return;
                }

                setCompleted({
                    load,
                    reloadCount,
                    state: {
                        status: 'error',
                        data: null,
                        error: getErrorMessage(error),
                    },
                });
            }
        };

        void loadResource();

        return () => {
            controller.abort();
        };
    }, [load, reloadCount]);

    const reload = useCallback(() => {
        setReloadCount(previous => previous + 1);
    }, []);

    const isCurrent =
        load !== null &&
        completed !== null &&
        completed.load === load &&
        completed.reloadCount === reloadCount;

    if (isCurrent) {
        return {
            ...completed.state,
            reload,
        };
    }

    return {
        status: 'loading',
        data: null,
        error: null,
        reload,
    };
}
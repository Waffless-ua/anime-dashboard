import { useEffect, useState } from 'react';

import { getErrorMessage } from '../utils/getErrorMessage';
import type { AsyncState } from '../types/async.types';

interface AsyncResourceOptions {
    keepPreviousData?: boolean;
}

export function useAsyncResource<T>(
    load: (signal: AbortSignal) => Promise<T>,
    { keepPreviousData = false }: AsyncResourceOptions = {}
) {
    const [request, setRequest] = useState<AsyncState<T>>({
        status: 'loading',
        data: null,
        error: null,
    });

    const [reloadCount, setReloadCount] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        setRequest(previous => ({
            status: 'loading',
            data: keepPreviousData ? previous.data : null,
            error: null,
        }));

        async function loadResource() {
            try {
                const data = await load(controller.signal);

                if (controller.signal.aborted) {
                    return;
                }

                setRequest({
                    status: 'success',
                    data,
                    error: null,
                });
            } catch (error) {
                if (controller.signal.aborted) {
                    return;
                }

                setRequest(previous => ({
                    status: 'error',
                    data: keepPreviousData ? previous.data : null,
                    error: getErrorMessage(error),
                }));
            }
        }

        void loadResource();

        return () => {
            controller.abort();
        };
    }, [load, reloadCount, keepPreviousData]);

    function reload() {
        setReloadCount(previous => previous + 1);
    }

    return {
        ...request,
        loading: request.status === 'loading',
        reload,
    };
}
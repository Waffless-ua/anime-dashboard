import Spinner from '../../atoms/Spinner/Spinner.tsx';
import type { ReactNode } from 'react';

import type { RequestState } from '../../../types/async.types.ts';
import Button from '../../atoms/Button/Button.tsx';

import './RequestBoundary.css';

export interface RequestBoundaryProps {
    request: RequestState;
    children: ReactNode;
    isEmpty?: boolean;
    loadingMessage?: ReactNode;
    errorTitle?: string;
    emptyMessage?: ReactNode;
    retryLabel?: string;
}

export default function RequestBoundary({
    request,
    children,
    isEmpty = false,
    retryLabel = 'Спробувати ще раз',
    loadingMessage = 'Завантаження...',
    errorTitle = 'Не вдалося завантажити дані',
    emptyMessage = 'Немає даних.',
}: RequestBoundaryProps) {
    if (request.status === 'loading') {
        return (
            <section className="request-state" role="status">
                <div className="request-state__loading">
                    <Spinner size="sm" decorative />
                    <div>{loadingMessage}</div>
                </div>
            </section>
        );
    }

    if (request.status === 'error') {
        return (
            <section className="request-state" role="alert">
                <h2>{errorTitle}</h2>
                <p>{request.error ?? 'Сталася невідома помилка.'}</p>

                <Button variant="outline" onClick={request.reload}>
                    {retryLabel}
                </Button>
            </section>
        );
    }

    if (isEmpty) {
        return (
            <section className="request-state" role="status">
                <div>{emptyMessage}</div>
            </section>
        );
    }

    return <>{children}</>;
}

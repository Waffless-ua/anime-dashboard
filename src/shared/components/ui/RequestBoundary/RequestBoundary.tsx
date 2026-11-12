import type { ReactNode } from 'react';

import type { RequestState } from '../../../types/async.types';
import Button from '../../ui/Button/Button';

import './RequestBoundary.css';

interface RequestBoundaryProps {
    request: RequestState;
    children: ReactNode;
    isEmpty?: boolean;
    loadingMessage?: string;
    errorTitle?: string;
    emptyMessage?: string;
}

export default function RequestBoundary({
    request,
    children,
    isEmpty = false,
    loadingMessage = 'Завантаження...',
    errorTitle = 'Не вдалося завантажити дані',
    emptyMessage = 'Немає даних.',
}: RequestBoundaryProps) {
    if (request.status === 'loading') {
        return (
            <section className="request-state" role="status">
                <p>{loadingMessage}</p>
            </section>
        );
    }

    if (request.status === 'error') {
        return (
            <section className="request-state" role="alert">
                <h2>{errorTitle}</h2>
                <p>{request.error ?? 'Сталася невідома помилка.'}</p>

                <Button variant="outline" onClick={request.reload}>
                    Спробувати ще раз
                </Button>
            </section>
        );
    }

    if (isEmpty) {
        return (
            <section className="request-state" role="status">
                <p>{emptyMessage}</p>
            </section>
        );
    }

    return <>{children}</>;
}
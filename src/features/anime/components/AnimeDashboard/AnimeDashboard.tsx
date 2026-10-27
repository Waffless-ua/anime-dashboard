import type { ReactNode } from 'react';

import type { RequestState } from '../../../../shared/types/async.types';

import './AnimeDashboard.css';

interface AnimeDashboardProps {
    request: RequestState;
    isEmpty: boolean;
    children: ReactNode;
}

export default function AnimeDashboard({
    request,
    isEmpty,
    children,
}: AnimeDashboardProps) {
    if (request.status === 'loading') {
        return (
            <section className="request-state" role="status">
                <p>Завантаження аніме...</p>
            </section>
        );
    }

    if (request.status === 'error') {
        return (
            <section className="request-state" role="alert">
                <h2>Не вдалося завантажити аніме</h2>

                <p>{request.error ?? 'Сталася невідома помилка.'}</p>

                <button type="button" onClick={request.reload}>
                    Спробувати ще раз
                </button>
            </section>
        );
    }

    if (isEmpty) {
        return (
            <section className="request-state" role="status">
                <p>Аніме не знайдено.</p>
            </section>
        );
    }

    return <>{children}</>;
}
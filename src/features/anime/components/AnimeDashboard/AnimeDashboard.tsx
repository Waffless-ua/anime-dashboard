import type { ReactNode } from 'react';
import './AnimeDashboard.css';
import type { AsyncStatus } from "../../../../shared/types/async.types.ts";

interface AnimeDashboardProps {
    status: AsyncStatus;
    error: string | null;
    isEmpty: boolean;
    onRetry: () => void;
    children: ReactNode;
}

export default function AnimeDashboard({
    status,
    error,
    isEmpty,
    onRetry,
    children,
}: AnimeDashboardProps) {
    if (status === 'loading') {
        return (
            <section className="request-state" role="status">
                <p>Завантаження аніме...</p>
            </section>
        );
    }

    if (status === 'error') {
        return (
            <section className="request-state" role="alert">
                <h2>Не вдалося завантажити аніме</h2>

                <p>{error ?? 'Сталася невідома помилка.'}</p>

                <button type="button" onClick={onRetry}>
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

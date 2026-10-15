import './KpiCard.css';
import type { AsyncStatus } from "../../../types/async.types.ts";

interface KpiCardProps {
    title: string;
    value?: string | number | null;
    change?: string | number | null;
    changePrefix?: string;
    changeSuffix?: string;
    changeStatus?: 'positive' | 'negative';
    status?: AsyncStatus;
}

export default function KpiCard({
    title,
    value,
    change,
    changePrefix = '',
    changeSuffix = '',
    status = 'success',
    changeStatus,
}: KpiCardProps) {
    function getDisplayValue(): string {
        if (status === 'loading') {
            return 'Завантаження...';
        }

        if (status === 'error') {
            return 'Недоступно';
        }

        if (value == null) {
            return 'Немає даних';
        }

        return typeof value === 'number'
            ? value.toLocaleString('uk-UA')
            : value;
    }

    const hasChange =
        status === 'success' &&
        (changeStatus === 'positive' || changeStatus === 'negative') &&
        change != null &&
        change !== '' &&
        change !== 0;

    return (
        <div className="kpi-card">
            <h3 className="kpi-title">{title}</h3>

            <div className="kpi-value-container">
                <span className="kpi-value">
                    {getDisplayValue()}
                </span>
            </div>

            {hasChange && (
                <span className={`kpi-change ${changeStatus}`}>
                {changePrefix}{change}{changeSuffix}
            </span>
            )}
        </div>
    );
}

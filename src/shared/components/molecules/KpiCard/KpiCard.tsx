import Card from '../../atoms/Card/Card.tsx';
import type { ComponentPropsWithoutRef } from 'react';
import './KpiCard.css';

import type { AsyncStatus } from '../../../types/async.types.ts';
import type { ChangeStatus } from "../../../types/kpi.types.ts";
import Badge, { type BadgeVariant } from "../../atoms/Badge/Badge.tsx";

export const CHANGE_BADGE_VARIANTS: Record<ChangeStatus, BadgeVariant> = {
    positive: 'success',
    negative: 'danger',
    neutral: 'neutral',
};


export interface KpiCardProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title' | 'children'> {
    title: string;
    value?: string | number | null;
    change?: string | number | null;
    changePrefix?: string;
    changeSuffix?: string;
    changeStatus?: ChangeStatus;
    status?: AsyncStatus;
    locale?: string;
}

export default function KpiCard({
    title,
    value,
    change,
    changePrefix = '',
    changeSuffix = '',
    changeStatus = 'neutral',
    status = 'success',
    locale = 'uk-UA',
    className = '',
    ...props
}: KpiCardProps) {
    function getDisplayValue(): string {
        if (status === 'loading') {
            return 'Завантаження';
        }

        if (status === 'error') {
            return 'Недоступно';
        }

        if (value == null) {
            return 'Немає даних';
        }

        return typeof value === 'number'
            ? value.toLocaleString(locale)
            : value;
    }

    const hasChange =
        status === 'success' &&
        change != null &&
        change !== '' &&
        change !== 0;

    return (
        <Card {...props} className={`kpi-card ${className}`} aria-busy={status === 'loading'}>
            <h3 className="kpi-title">
                {title}
            </h3>

            <div className="kpi-value-container">
                <span className="kpi-value">
                    {getDisplayValue()}
                </span>
            </div>

            {hasChange && (
                <Badge className="kpi-change"
                    variant={CHANGE_BADGE_VARIANTS[changeStatus]}
                >
                    {changePrefix}
                    {change}
                    {changeSuffix}
                </Badge>
            )}
        </Card>
    );
}

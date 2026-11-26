import type { ReactNode } from 'react';
import './ChartTooltip.css';

export interface ChartTooltipProps {
    title: ReactNode;
    valueLabel: string;
    value: ReactNode;
    children?: ReactNode;
}

export default function ChartTooltip({ title, valueLabel, value, children }: ChartTooltipProps) {
    return (
        <div className="chart-tooltip">
            <strong>{title}</strong>
            <span>{valueLabel}: {value}</span>
            {children}
        </div>
    );
}

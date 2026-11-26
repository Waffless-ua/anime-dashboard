export type ChartType = 'bar' | 'pie';

export interface ChartPoint {
    name: string;
    value: number;
}

export interface DataChartProps {
    data: ChartPoint[];
    valueLabel: string;
    height: number;
    locale?: string;
    className?: string;
}
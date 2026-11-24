import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import type { ChartPoint } from '../../../../types/chart.types';

import './DataBarChart.css';

const COLOR_COUNT = 5;

interface DataBarChartProps {
    data: ChartPoint[];
    valueLabel: string;
    height: number;
}

export default function DataBarChart({
    data,
    valueLabel,
    height,
}: DataBarChartProps) {
    return (
        <div className="data-bar-chart">
            <ResponsiveContainer
                width="100%"
                height={height}
                minWidth={0}
            >
                <BarChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 16,
                        bottom: 10,
                        left: 0,
                    }}
                >
                    <CartesianGrid
                        vertical={false}
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        type="category"
                        dataKey="name"
                        interval={0}
                        angle={-35}
                        textAnchor="end"
                        tickMargin={10}
                        tickLine={false}
                        height={85}
                    />

                    <YAxis
                        type="number"
                        allowDecimals={false}
                        tickLine={false}
                        axisLine={false}
                        width={55}
                    />

                    <Tooltip
                        content={({ active, payload, label }) => {
                            if (!active || !payload?.length) {
                                return null;
                            }

                            const value = payload[0].value;

                            return (
                                <div className="data-bar-chart-tooltip">
                                    <strong>{label}</strong>
                                    <span>
                                        {valueLabel}:{' '}
                                        {typeof value === 'number'
                                            ? value.toLocaleString('uk-UA')
                                            : String(value ?? '—')}
                                    </span>
                                </div>
                            );
                        }}
                    />

                    <Bar
                        dataKey="value"
                        name={valueLabel}
                        radius={[4, 4, 0, 0]}
                        maxBarSize={60}
                    >
                        {data.map((point, index) => (
                            <Cell
                                key={point.name}
                                fill={`var(--chart-color-${index % COLOR_COUNT + 1})`}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

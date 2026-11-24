import {
    Cell,
    Label,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';

import type { ChartPoint } from '../../../../types/chart.types';

import './DataPieChart.css';

const COLOR_COUNT = 5;

interface DataPieChartProps {
    data: ChartPoint[];
    valueLabel: string;
    height: number;
}

export default function DataPieChart({
    data,
    valueLabel,
    height,
}: DataPieChartProps) {
    const pieData = data.filter(point => point.value > 0);

    const total = pieData.reduce(
        (sum, point) => sum + point.value,
        0
    );

    return (
        <div className="data-pie-chart">
            <ResponsiveContainer
                width="100%"
                height={height}
                minWidth={0}
            >
                <PieChart>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        innerRadius="45%"
                        outerRadius="75%"
                        paddingAngle={2}
                        stroke="var(--secondary-color)"
                    >
                        {pieData.map(point => {
                            const index = data.findIndex(
                                item => item.name === point.name
                            );

                            return (
                                <Cell
                                    key={point.name}
                                    fill={`var(--chart-color-${index % COLOR_COUNT + 1})`}
                                />
                            );
                        })}

                        <Label
                            value={total.toLocaleString('uk-UA')}
                            position="center"
                            className="data-pie-chart-total"
                        />
                    </Pie>

                    <Tooltip
                        content={({ active, payload }) => {
                            if (!active || !payload?.length) {
                                return null;
                            }

                            const point = payload[0];
                            const value = point.value;

                            return (
                                <div className="data-pie-chart-tooltip">
                                    <strong>{point.name}</strong>
                                    <span>
                                        {valueLabel}:{' '}
                                        {typeof value === 'number'
                                            ? value.toLocaleString('uk-UA')
                                            : String(value ?? '—')}
                                    </span>

                                    {typeof value === 'number' && total > 0 && (
                                        <span>
                                            {(value / total * 100).toFixed(1)}%
                                        </span>
                                    )}
                                </div>
                            );
                        }}
                    />

                    <Legend
                        verticalAlign="bottom"
                        align="center"
                        iconType="circle"
                        iconSize={10}
                        formatter={value => (
                            <span className="data-pie-chart-legend">
                                {value}
                            </span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

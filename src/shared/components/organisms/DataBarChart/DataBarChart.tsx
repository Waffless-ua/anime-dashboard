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

import ChartTooltip from '../../molecules/ChartTooltip/ChartTooltip';

import type { DataChartProps } from '../../../types/chart.types';

import { CHART_TOKENS } from '../../../styles/chart.tokens';
import { formatChartValue } from '../../../utils/formatChartValue';
import { getChartColor } from '../../../utils/getChartColor';

import './DataBarChart.css';

export type DataBarChartProps = DataChartProps;

export default function DataBarChart({
    data,
    valueLabel,
    height,
    locale = 'uk-UA',
    className = '',
}: DataBarChartProps) {
    return (
        <div className={`data-bar-chart ${className}`}>
            <ResponsiveContainer
                width="100%"
                height={height}
                minWidth={0}
            >
                <BarChart
                    data={data}
                    margin={CHART_TOKENS.bar.margin}
                >
                    <CartesianGrid
                        vertical={false}
                        strokeDasharray={CHART_TOKENS.bar.gridDash}
                    />

                    <XAxis
                        type="category"
                        dataKey="name"
                        interval={0}
                        angle={CHART_TOKENS.bar.xAxisAngle}
                        textAnchor="end"
                        tickMargin={CHART_TOKENS.bar.tickMargin}
                        tickLine={false}
                        height={CHART_TOKENS.bar.xAxisHeight}
                    />

                    <YAxis
                        type="number"
                        allowDecimals={false}
                        tickLine={false}
                        axisLine={false}
                        width={CHART_TOKENS.bar.yAxisWidth}
                    />

                    <Tooltip
                        content={({ active, payload, label }) => {
                            if (!active || !payload?.length) {
                                return null;
                            }

                            return (
                                <ChartTooltip
                                    title={label}
                                    valueLabel={valueLabel}
                                    value={formatChartValue(
                                        payload[0].value,
                                        locale
                                    )}
                                />
                            );
                        }}
                    />

                    <Bar
                        dataKey="value"
                        name={valueLabel}
                        radius={CHART_TOKENS.bar.radius}
                        maxBarSize={CHART_TOKENS.bar.maxBarSize}
                    >
                        {data.map((point, index) => (
                            <Cell
                                key={point.name}
                                fill={getChartColor(index)}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
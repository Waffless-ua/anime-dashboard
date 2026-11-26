import {
    Cell,
    Label,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';

import ChartTooltip from '../../molecules/ChartTooltip/ChartTooltip';

import type { DataChartProps } from '../../../types/chart.types';

import { CHART_TOKENS } from '../../../styles/chart.tokens';
import { formatChartValue } from '../../../utils/formatChartValue';
import { getChartColor } from '../../../utils/getChartColor';

import './DataPieChart.css';
import { formatPercentage } from "../../../utils/formatPercentage.ts";

export type DataPieChartProps = DataChartProps;

export default function DataPieChart({
    data,
    valueLabel,
    height,
    locale = 'uk-UA',
    className = '',
}: DataPieChartProps) {
    const pieData = data
    .map((point, index) => ({
        ...point,
        color: getChartColor(index),
    }))
    .filter(point => point.value > 0);

    const total = pieData.reduce(
        (sum, point) => sum + point.value,
        0
    );

    return (
        <div className={`data-pie-chart ${className}`}>
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
                        cx={CHART_TOKENS.pie.cx}
                        cy={CHART_TOKENS.pie.cy}
                        innerRadius={CHART_TOKENS.pie.innerRadius}
                        outerRadius={CHART_TOKENS.pie.outerRadius}
                        paddingAngle={CHART_TOKENS.pie.paddingAngle}
                        stroke="var(--secondary-color)"
                    >
                        {pieData.map(point => (
                            <Cell
                                key={point.name}
                                fill={point.color}
                            />
                        ))}

                        <Label
                            value={formatChartValue(total, locale)}
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
                                <ChartTooltip
                                    title={point.name}
                                    valueLabel={valueLabel}
                                    value={formatChartValue(value, locale)}
                                >
                                    {typeof value === 'number' && total > 0 && (
                                        <span>
                                            {formatPercentage(value, total, locale)}
                                        </span>
                                    )}
                                </ChartTooltip>
                            );
                        }}
                    />

                    <Legend
                        verticalAlign="bottom"
                        align="center"
                        iconType="circle"
                        iconSize={CHART_TOKENS.pie.legendIconSize}
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
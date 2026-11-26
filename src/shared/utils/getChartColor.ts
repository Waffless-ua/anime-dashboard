import { CHART_TOKENS } from '../styles/chart.tokens';

export function getChartColor(index: number): string {
    const { colors } = CHART_TOKENS;

    return colors[index % colors.length];
}
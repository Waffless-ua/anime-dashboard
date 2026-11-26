export const CHART_TOKENS = {
    height: 500,

    colors: [
        'var(--chart-color-1)',
        'var(--chart-color-2)',
        'var(--chart-color-3)',
        'var(--chart-color-4)',
        'var(--chart-color-5)',
    ],

    bar: {
        margin: {
            top: 10,
            right: 16,
            bottom: 10,
            left: 0,
        },

        gridDash: '3 3',
        xAxisAngle: -35,
        tickMargin: 10,
        xAxisHeight: 85,
        yAxisWidth: 55,

        radius: [4, 4, 0, 0] as [number, number, number, number],
        maxBarSize: 60,
    },

    pie: {
        cx: '50%',
        cy: '45%',
        innerRadius: '45%',
        outerRadius: '75%',
        paddingAngle: 2,
        legendIconSize: 10,
    },
} as const;
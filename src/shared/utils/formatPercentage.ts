const DEFAULT_PERCENTAGE_PRECISION = 1;

export function formatPercentage(
    value: number,
    total: number,
    locale = 'uk-UA'
): string {
    if (total <= 0) {
        return '—';
    }

    return new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: DEFAULT_PERCENTAGE_PRECISION,
        maximumFractionDigits: DEFAULT_PERCENTAGE_PRECISION,
    }).format(value / total);
}
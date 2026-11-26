export function formatChartValue(
    value: unknown,
    locale = 'uk-UA'
): string {
    if (typeof value === 'number') {
        return value.toLocaleString(locale);
    }

    return String(value ?? '—');
}
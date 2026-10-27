export default function getChangePrefix(
    change: string | number | null,
    isRank = false
): string {
    if (typeof change !== 'number') return '';

    return (isRank ? change < 0 : change > 0) ? '+' : '';
}
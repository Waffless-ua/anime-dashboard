export default function getChangeStatus(
    change: string | number | null,
    isRank = false
): 'positive' | 'negative' | 'neutral' {
    if (typeof change !== 'number' || change === 0) {
        return 'neutral';
    }

    const isPositive = isRank ? change < 0 : change > 0;

    return isPositive ? 'positive' : 'negative';
}
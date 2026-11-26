export default function getChangePrefix(
    change: string | number | null
): string {
    if (typeof change !== 'number') {
        return '';
    }

    if (change > 0) {
        return '+';
    }

    return '';
}
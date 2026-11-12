export function isRecord(
    value: unknown
): value is Record<string, unknown> {
    return (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
    );
}

export function getNullableText(value: unknown): string | null {
    return typeof value === 'string' && value.trim()
        ? value.trim()
        : null;
}

export function getPositiveNumber(value: unknown): number | null {
    if (typeof value !== 'number' && typeof value !== 'string') {
        return null;
    }

    const number = Number(value);

    return Number.isFinite(number) && number > 0
        ? number
        : null;
}
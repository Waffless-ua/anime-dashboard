export function isRecord(
    value: unknown
): value is Record<string, unknown> {
    return (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
    );
}

export function getNullableText(
    value: unknown
): string | null {
    if (typeof value !== 'string') {
        return null;
    }

    const text = value.trim();

    if (!text) {
        return null;
    }

    return text;
}

export function getPositiveNumber(
    value: unknown
): number | null {
    if (typeof value !== 'number' && typeof value !== 'string') {
        return null;
    }

    const number = Number(value);

    if (!Number.isFinite(number) || number <= 0) {
        return null;
    }

    return number;
}
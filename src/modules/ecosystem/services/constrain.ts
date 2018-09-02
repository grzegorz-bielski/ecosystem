export const constrain = (value: number, range: number[] | number): number => {
    const [min, max] = getRange(range);

    if (value < min) {
        return min;
    }

    if (value > max) {
        return max;
    }

    return value;
};

export function getRange(range: number[] | number) {
    if (Array.isArray(range)) {
        return range;
    }

    const rangeValue = Math.abs(range);

    return [-rangeValue, rangeValue];
}

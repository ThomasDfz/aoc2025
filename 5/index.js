const { input, example } = require('../utils/parser');

const DEBUG = false;

const [rangesRaw, idsRaw] = (DEBUG ? example : input).split('\n\n');

const ranges = rangesRaw
    .split('\n')
    .map(line => line
        .split('-')
        .map(Number))
    .map(([min, max]) => ({ min, max }));

const ids = idsRaw
    .split('\n')
    .map(Number);

const part1 = () => {
    return ids.sum(id => ranges.some(({ min, max }) => id >= min && id <= max));
};

const part2 = () => {
    const cardinality = window => window.max - window.min + 1;
    const sortedRanges = ranges.sort((a, b) => a.min < b.min ? -1 : 1);

    let window = sortedRanges[0];

    return sortedRanges.reduce((sum, currentRange, i) => {
        if (currentRange.min > window.max) {
            sum += cardinality(window);
            window = currentRange;
        }

        if (currentRange.max > window.max) {
            window.max = currentRange.max;
        }

        if (i === sortedRanges.length - 1) {
            sum += cardinality(window);
        }

        return sum;
    }, 0);
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);

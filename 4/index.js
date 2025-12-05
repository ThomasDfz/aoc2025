const { input, example } = require('../utils/parser');
const { neighborhood } = require('../utils/tools');

const DEBUG = false;

const data = (DEBUG ? example : input)
    .split('\n')
    .map(line => line
        .split('')
        .map(cell => cell === '@' ? 1 : 0));

const isAccessible = (x, y) => neighborhood(x, y, true).sum(({ x: nx, y: ny }) => data[nx]?.[ny] === 1) < 4;

const part1 = () => {
    return data.sum((line, x) => line.sum((cell, y) => cell && isAccessible(x, y)));
};

const part2 = () => {
    const toRemove = [];
    let sum = 0;

    do {
        toRemove.length = 0;

        data.forEach((line, x) => {
            line.forEach((cell, y) => {
                if (cell && isAccessible(x, y)) {
                    toRemove.push({ x, y });
                }
            });
        });

        sum += toRemove.length;
        toRemove.forEach(({ x, y }) => data[x][y] = 0);
    } while (toRemove.length);

    return sum;
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);

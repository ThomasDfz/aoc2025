const { input, example } = require('../utils/parser');
const { range } = require('../utils/tools')

const DEBUG = false;

const batteries = (DEBUG ? example : input)
    .split('\n')
    .map(line => line
        .split('')
        .map(Number));

const part1 = () => {
    return batteries.sum(battery => {
        const tensIndex = battery.findIndex(el => el === Math.max(...battery.slice(0, -1)));

        return battery[tensIndex] * 10 + Math.max(...battery.slice(tensIndex + 1));
    });
};

const part2 = () => {
    return batteries.sum(battery => {
        let temp = [...battery];

        return range(0, 11).sum(i => {
            let max = (i === 11)
                ? Math.max(...temp)
                : Math.max(...temp.slice(0, i - 11));

            temp = temp.slice(temp.findIndex(el => el === max) + 1);

            return max * Math.pow(10, 11 - i);
        });
    });
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);

const { input, example } = require('../utils/parser');

const DEBUG = false;

const ranges = (DEBUG ? example : input)
    .split(',')
    .map(range => range.split('-').map(Number));

const part1 = () => {
    return countInvalids((id) => {
        return id.substring(0, id.length / 2) === id.substring(id.length / 2);
    });
};

const part2 = () => {
    return countInvalids((id) => {
        for (let patternSize = 1; patternSize <= id.length / 2; patternSize += 1) {
            const chunks = id.chunk(patternSize);

            if (chunks.allEqual()) {
                return true;
            }
        }

        return false;
    });
};

const countInvalids = (isInvalid) => {
    return ranges.reduce((sum, [min, max]) => {
        for (let i = min; i <= max; i += 1) {
            if (isInvalid(String(i))) {
                sum += i;
            }
        }

        return sum;
    }, 0);
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);

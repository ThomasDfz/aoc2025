const { input, example } = require('../utils/parser');
const { mod } = require('../utils/tools');

const DEBUG = false;

const data = (DEBUG ? example : input)
    .split('\n')
    .map(rotations => (rotations[0] === 'R' ? 1 : -1) * rotations.slice(1));

const part1 = () => {
    let position = 50;

    return data.sum(rotation => mod(position += rotation, 100) === 0);
};

const part2 = () => {
    let position = 50;

    return data.reduce((sum, rotation) => {
        position += rotation;

        sum += Math.abs(Math.floor(position / 100));

        // cursor was on 0 before backwards rotation
        if (rotation < 0 && position === rotation) {
            sum--;
        }

        // cursor ends up on 0 after backwards rotation
        if (rotation < 0 && mod(position, 100) === 0) {
            sum++;
        }

        position = mod(position, 100);

        return sum;
  }, 0);
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);

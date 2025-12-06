const { input, example } = require('../utils/parser');
const { transpose } = require('../utils/tools');

const DEBUG = false;

const data = (DEBUG ? example : input).split('\n');

const part1 = () => {
    const worksheet = transpose(data.map(line => line.trim().split(/\s+/)));

    return worksheet.sum(line => {
        const operator = line.pop();

        return line.reduce((acc, curr) => {
            return eval(`${acc}${operator}${curr}`);
        }, operator === '+' ? 0 : 1);
    });
};

const pad = (array, size) => array.map(line => line.length < size ? (Array.from({ ...line, length: size })) : line);
const fill = array => array.map(line => line.map(e => e === undefined ? ' ' : e));

const part2 = () => {
    let worksheet = data.map(line => line.split(''));
    let maxSize = Math.max(...worksheet.map(line => line.length));

    worksheet = pad(worksheet, maxSize);
    worksheet = fill(worksheet);
    worksheet = transpose(worksheet);

    let problems = [];
    worksheet.reduce((acc, curr, i) => {
        if (curr.every(el => el === ' ')) {
            problems.push([...acc]);
            acc.length = 0;
        } else {
            acc.push(curr);

            if (i === worksheet.length - 1) {
                problems.push([...acc]);
            }
        }

        return acc;
    }, []);

    return problems.map(transpose).sum(problem => {
        const operator = problem.pop().find(cell => cell && cell !== ' ');

        return transpose(problem).reduce((acc, curr) => {
           return eval(`${acc}${operator}${curr.join('')}`);
       }, operator === '+' ? 0 : 1);
    });
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);

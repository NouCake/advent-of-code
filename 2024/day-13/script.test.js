import fs from 'fs'
import { findMinTokens, findMinTokens2, parseInput } from './script';
import { lusolve, matrix, usolve } from 'mathjs';
import exp from 'constants';

const path = './2024/day-13';

const example = fs.readFileSync(path + '/example.txt', 'utf8');
const input = fs.readFileSync(path + '/input.txt', 'utf8');


describe("Day 13 Script", () => {

    it("star1 example", () => {
        const configs = parseInput(example)
        const tokens = configs.map(c => findMinTokens(c))
        const result = tokens.reduce((acc, cur) => acc + (cur || 0), 0);
        expect(result).toBe(480);
    })

    it("star1", () => {
        const configs = parseInput(input)
        const tokens = configs.map(c => findMinTokens(c))
        const result = tokens.reduce((acc, cur) => acc + (cur || 0), 0);
        console.log(result)
    })

    it("star2 example", () => {
        const configs = parseInput(example);
        const tokens = configs.map(config => {
            const matrix = [
                [config.a.x, config.b.x],
                [config.a.y, config.b.y]
            ];
            const result = lusolve(matrix, [config.prize.x, config.prize.y]);
            const a = Math.round(result[0][0]);
            const b = Math.round(result[1][0]);

            if(a * config.a.x + b * config.b.x === config.prize.x && a * config.a.y + b * config.b.y === config.prize.y) {
                return a * 3 + b;
            }
            return 0;
        }) 
        const result = tokens.reduce((acc, cur) => acc + (cur || 0), 0);
        expect(result).toBe(480);
    })

    it("star2 real", () => {
        const configs = parseInput(input);
        const tokens = configs.map(config => {
            const matrix = [
                [config.a.x, config.b.x],
                [config.a.y, config.b.y]
            ];
            const result = lusolve(matrix, [10000000000000+config.prize.x, 10000000000000+config.prize.y]);
            const a = Math.round(result[0][0]);
            const b = Math.round(result[1][0]);

            if(a * config.a.x + b * config.b.x === 10000000000000+config.prize.x && a * config.a.y + b * config.b.y === 10000000000000+config.prize.y) {
                return a * 3 + b;
            }
            return 0;
        }) 
        const result = tokens.reduce((acc, cur) => acc + (cur || 0), 0);
        console.log(result)
    })

})
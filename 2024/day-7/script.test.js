import fs from 'fs'
import { isAlsoSolvable, isSolveable, parseEquations } from './script';

const path = './2024/day-7';

const example = fs.readFileSync(path + '/example.txt', 'utf8');
const input = fs.readFileSync(path + '/input.txt', 'utf8');


describe("Day 7 Script", () => {

    it("star1 example", () => {
        const equations = parseEquations(example);
        expect(isSolveable(equations[0])).toBe(true)
        const result = equations
                            .map(e => isSolveable(e) ? e.result : 0)
                            .reduce((a, b) => a + b, 0);
        expect(result).toBe(3749);
    })

    it("star1", () => {
        const equations = parseEquations(input);
        const result = equations
                            .map(e => isSolveable(e) ? e.result : 0)
                            .reduce((a, b) => a + b, 0);
        console.log(result)
    })

    it("star2 example", () => {
        const equations = parseEquations(example);
        const result = equations
                            .map(e => isAlsoSolvable(e) ? e.result : 0)
                            .reduce((a, b) => a + b, 0);
        expect(result).toBe(11387);
    })

    it("star2", () => {
        const equations = parseEquations(input);
        const result = equations
                            .map(e => isAlsoSolvable(e) ? e.result : 0)
                            .reduce((a, b) => a + b, 0);
        console.log(result)
    })

})
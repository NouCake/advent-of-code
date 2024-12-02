import fs from 'fs'
import { checkBetterInput, checkInput } from './script';

const dayNum = 2;
const path = './2024/day-' + dayNum;

const example = fs.readFileSync(path + '/example.txt', 'utf8');
const input = fs.readFileSync(path + '/input.txt', 'utf8');


describe("Day 2 Script", () => {

    it("star1 example", () => {
        const result = checkInput(example);
        expect(result).toBe(2);
    })

    it("star1", () => {
        const result = checkInput(input);
        console.log(result)
    })

    it("star2 example", () => {
        const result = checkBetterInput(example, 1);
        expect(result).toBe(4);
    })

    it("star2", () => {
        const result = checkBetterInput(input, 1);
        console.log(result)
    })

})
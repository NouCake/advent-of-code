import fs from 'fs'
import { getResult, removeDonts } from './script';

const path = './2024/day-3';

const example = fs.readFileSync(path + '/example.txt', 'utf8');
const input = fs.readFileSync(path + '/input.txt', 'utf8');


describe("Day 3 Script", () => {

    it("star1 example", () => {
        const result = getResult(example);
        expect(result).toBe(161);
    })

    it("star1", () => {
        const result = getResult(input);
        console.log(result)
    })

    it("star2 example", () => {
        const result = getResult(removeDonts(example));
        expect(result).toBe(48);
    })

    it("star2", () => {
        const result = getResult(removeDonts(input));
        console.log(result)
    })

})
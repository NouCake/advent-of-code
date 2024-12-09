import fs from 'fs'
import { calculateChecksum, calculateChecksum2, findBlockThatFits } from './script';

const path = './2024/day-9';

const example = fs.readFileSync(path + '/example.txt', 'utf8');
const input = fs.readFileSync(path + '/input.txt', 'utf8');


describe("Day 9 Script", () => {

    it("star1 example", () => {
        
        // 001
        expect(calculateChecksum("201")).toBe(2);
        expect(calculateChecksum("2010")).toBe(2);
        
        // 00221
        expect(calculateChecksum("22102")).toBe(14);
        
        const result = calculateChecksum(example);
        expect(result).toBe(1928);
    })

    it("star1", () => {
        const result = calculateChecksum(input);
        console.log(result)
    })

    it("star2 example", () => {
        //const memory = "20423020".split("").map(e => Number.parseInt(e));
        //expect(findBlockThatFits(memory, 2)).toBe(6)
        const result = calculateChecksum2(example, true);
        expect(result).toBe(2858);
    })

    it("star2", () => {
        const result = calculateChecksum2(input);
        console.log(result)
    })

})